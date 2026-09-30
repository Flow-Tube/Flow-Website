#!/usr/bin/env bash
set -euo pipefail

OUT="${1:-public/changelogs.json}"
SOURCES='[
  {"platform": "android", "repo": "A-EDev/Flow", "path": "app/src/main/assets/changelog"},
  {"platform": "desktop", "repo": "Flow-Tube/Flow-Desktop", "path": "changelog"}
]'

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
: > "$tmp/entries.jsonl"

field() {
  awk -v key="$1" -F': *' 'toupper($1) == key { sub(/\r$/, "", $2); print $2; exit }'
}

jq -c '.[]' <<<"$SOURCES" | while read -r src; do
  platform="$(jq -r .platform <<<"$src")"
  repo="$(jq -r .repo <<<"$src")"
  path="$(jq -r .path <<<"$src")"

  gh api "repos/$repo/releases?per_page=100" --paginate \
    --jq '.[] | select((.draft | not) and (.prerelease | not)) | {tag: .tag_name, url: .html_url}' \
    | jq -s . > "$tmp/releases.json" || echo '[]' > "$tmp/releases.json"

  urls="$(gh api "repos/$repo/contents/$path" --jq '.[] | select(.type == "file") | .download_url' || true)"

  while read -r url; do
    [ -z "$url" ] && continue
    content="$(curl -fsSL --retry 3 "$url")" || continue
    version="$(field VERSION <<<"$content")"
    status="$(field STATUS <<<"$content")"
    jq -n \
      --arg content "$content" \
      --arg status "$status" \
      --arg platform "$platform" \
      --arg tag "v$version" \
      --slurpfile releases "$tmp/releases.json" \
      '{
        content: $content,
        status: $status,
        platform: $platform,
        release_url: ($releases[0] | map(select(.tag == $tag)) | .[0].url // null)
      }' >> "$tmp/entries.jsonl"
  done <<<"$urls"
done

EXTENSION_REPO="Flow-Tube/Flow-Extension"
gh api "repos/$EXTENSION_REPO/releases?per_page=100" --paginate \
  --jq '.[] | select((.draft | not) and (.prerelease | not)) | {tag: .tag_name, url: .html_url, date: .published_at[0:10]}' \
  | jq -s . > "$tmp/extension-releases.json" || echo '[]' > "$tmp/extension-releases.json"

if gh api "repos/$EXTENSION_REPO/contents/CHANGELOG.md" --jq .content | base64 -d > "$tmp/extension-changelog.md"; then
  jq -Rs -c --slurpfile releases "$tmp/extension-releases.json" '
    def clean: gsub("\\*\\*"; "") | gsub("`"; "");
    def merged:
      reduce .[] as $l ([];
        if ($l | test("^\\s+\\S")) and length > 0 and (.[-1] | startswith("- "))
        then .[:-1] + [.[-1] + " " + ($l | sub("^\\s+"; ""))]
        else . + [$l] end);
    split("\n## [")[1:][]
    | (split("]")[0]) as $version
    | select($version | test("^[0-9]"))
    | ($releases[0] | map(select(.tag == ("v" + $version))) | .[0]) as $release
    | (sub("^[^\n]*\n"; "") | split("\n") | merged
        | map(if test("^### ") then "\n" + (sub("^### "; "") | ascii_upcase)
              elif test("^- ") then clean
              else empty end)
        | join("\n")) as $body
    | {
        content: ("FLOW EXTENSION CHANGE LOG\nVERSION: " + $version + "\nDATE: " + ($release.date // "") + "\nSTATUS: " + (if $release then "RELEASE" else "" end) + "\n" + $body),
        status: (if $release then "RELEASE" else "" end),
        platform: "extension",
        release_url: ($release.url // null)
      }
  ' "$tmp/extension-changelog.md" >> "$tmp/entries.jsonl" || true
fi

jq -s . "$tmp/entries.jsonl" > "$OUT"
