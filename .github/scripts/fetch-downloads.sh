#!/usr/bin/env bash
set -euo pipefail

OUT="${1:-public/downloads.json}"
ANDROID_REPO="A-EDev/Flow"
DESKTOP_REPO="Flow-Tube/Flow-Desktop"
IZZY_PACKAGE="io.github.aedev.flow"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

gh api "repos/$ANDROID_REPO/releases/latest" --jq '{
  version: (.tag_name | ltrimstr("v")),
  tag: .tag_name,
  published: .published_at,
  release_url: .html_url,
  checksums_url: ([.assets[] | select(.name == "checksums.txt") | .browser_download_url][0] // null),
  assets: [.assets[] | select(.name | endswith(".apk")) | {
    name,
    url: .browser_download_url,
    size,
    flavor: (if (.name | test("foss")) then "foss" else "github" end),
    abi: (if (.name | test("arm64")) then "arm64-v8a" elif (.name | test("armeabi")) then "armeabi-v7a" else "universal" end)
  }]
}' > "$tmp/android.json" || echo 'null' > "$tmp/android.json"

gh api "repos/$DESKTOP_REPO/releases/latest" --jq '{
  version: (.tag_name | ltrimstr("v")),
  tag: .tag_name,
  published: .published_at,
  release_url: .html_url,
  assets: [.assets[] | select(.name | test("\\.(dmg|exe|AppImage|deb|rpm)$")) | {
    name,
    url: .browser_download_url,
    size,
    os: (if (.name | test("darwin")) then "macos" elif (.name | test("windows")) then "windows" else "linux" end),
    arch: (if (.name | test("aarch64|arm64")) then "arm64" else "x64" end),
    format: (.name | capture("\\.(?<f>dmg|exe|AppImage|deb|rpm)$").f)
  }]
}' > "$tmp/desktop.json" || echo 'null' > "$tmp/desktop.json"

if curl -fsSL --retry 3 "https://apt.izzysoft.de/fdroid/api/v1/packages/$IZZY_PACKAGE" -o "$tmp/izzy-raw.json"; then
  jq --arg pkg "$IZZY_PACKAGE" '
    .suggestedVersionCode as $code
    | {
        version: ([.packages[] | select(.versionCode == $code) | .versionName][0] // .packages[0].versionName),
        version_code: $code,
        apk_url: ("https://apt.izzysoft.de/fdroid/repo/" + $pkg + "_" + $code + ".apk"),
        page_url: ("https://apt.izzysoft.de/packages/" + $pkg)
      }' "$tmp/izzy-raw.json" > "$tmp/izzy.json"
else
  echo 'null' > "$tmp/izzy.json"
fi

nightly() {
  local repo="$1" out="$2"
  echo 'null' > "$out"
  local runs
  runs="$(gh api "repos/$repo/actions/workflows/build.yml/runs?branch=main&status=success&per_page=10" \
    --jq '.workflow_runs | sort_by(.created_at) | reverse | .[] | {id, created: .created_at, url: .html_url, commit: .head_sha[0:7]} | @json' || true)"
  while read -r run; do
    [ -z "$run" ] && continue
    local id
    id="$(jq -r .id <<<"$run")"
    gh api "repos/$repo/actions/runs/$id/artifacts?per_page=100" --jq '[.artifacts[] | select(.expired | not) | {name, size: .size_in_bytes}]' > "$out.artifacts" || continue
    if [ "$(jq length "$out.artifacts")" -gt 0 ]; then
      jq --argjson run "$run" --arg repo "$repo" '{
          created: $run.created,
          run_url: $run.url,
          commit: $run.commit,
          artifacts: map(. + {url: ("https://nightly.link/" + $repo + "/actions/runs/" + ($run.id | tostring) + "/" + .name + ".zip")})
        }' "$out.artifacts" > "$out"
      rm -f "$out.artifacts"
      return
    fi
  done <<<"$runs"
  rm -f "$out.artifacts"
}

gh api "repos/$ANDROID_REPO/releases/tags/nightly" --jq '
  [.assets[] | select(.name | test("^flow-nightly-[0-9]+\\.apk$"))][0] as $apk
  | if $apk == null then null else {
      run: ($apk.name | capture("flow-nightly-(?<r>[0-9]+)").r | tonumber),
      created: $apk.updated_at,
      commit: (try ((.body // "") | capture("Built from (?<c>[0-9a-f]{7,40})").c) catch null),
      release_url: .html_url,
      apk: {name: $apk.name, url: $apk.browser_download_url, size: $apk.size},
      checksums_url: ([.assets[] | select(.name == "checksums.txt") | .browser_download_url][0] // null)
    } end' > "$tmp/nightly-android.json" || echo 'null' > "$tmp/nightly-android.json"
nightly "$DESKTOP_REPO" "$tmp/nightly-desktop.json"

jq -n \
  --slurpfile android "$tmp/android.json" \
  --slurpfile desktop "$tmp/desktop.json" \
  --slurpfile izzy "$tmp/izzy.json" \
  --slurpfile nightlyAndroid "$tmp/nightly-android.json" \
  --slurpfile nightlyDesktop "$tmp/nightly-desktop.json" \
  '{
    android: $android[0],
    desktop: $desktop[0],
    izzy: $izzy[0],
    nightly: { android: $nightlyAndroid[0], desktop: $nightlyDesktop[0] }
  }' > "$OUT"
