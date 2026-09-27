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

jq -s . "$tmp/entries.jsonl" > "$OUT"
