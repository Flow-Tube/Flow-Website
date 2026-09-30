#!/usr/bin/env bash
set -euo pipefail

OUT="${1:-public/contributors.json}"
OWNER="A-EDev"
EXCLUDE='["actions-user", "weblate", "github-actions", "dependabot"]'
REPOS='[
  {"id": "android", "label": "Android app", "repo": "A-EDev/Flow"},
  {"id": "desktop", "label": "Desktop app", "repo": "Flow-Tube/Flow-Desktop"},
  {"id": "website", "label": "Website", "repo": "Flow-Tube/Flow-Website"},
  {"id": "extension", "label": "Extension", "repo": "Flow-Tube/Flow-Extension"}
]'

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

jq -c '.[]' <<<"$REPOS" | while read -r row; do
  id="$(jq -r .id <<<"$row")"
  repo="$(jq -r .repo <<<"$row")"
  gh api "repos/$repo/contributors?per_page=100" --paginate \
    --jq '.[] | select(.type == "User") | {login, avatar_url, html_url, contributions}' \
    | jq -s --arg id "$id" 'map(. + {repo: $id})' > "$tmp/$id.json"
done

gh api "users/$OWNER" --jq '{login, name, bio, avatar_url, html_url, followers, public_repos}' > "$tmp/owner.json"

jq -s \
  --argjson repos "$REPOS" \
  --slurpfile owner "$tmp/owner.json" \
  --arg ownerLogin "$OWNER" \
  --argjson exclude "$EXCLUDE" '
  add
  | map(select(
      (.login | ascii_downcase) as $l
      | $l != ($ownerLogin | ascii_downcase)
        and ($exclude | index($l) | not)
        and ($l | endswith("[bot]") | not)
    ))
  | group_by(.login | ascii_downcase)
  | map({
      login: .[0].login,
      avatar_url: .[0].avatar_url,
      html_url: .[0].html_url,
      contributions: (map(.contributions) | add),
      repos: (map(.repo) | unique)
    })
  | sort_by(-.contributions, (.login | ascii_downcase))
  | {
      owner: $owner[0],
      repos: ($repos | map(. + {url: ("https://github.com/" + .repo)})),
      contributors: .
    }
' "$tmp/android.json" "$tmp/desktop.json" "$tmp/website.json" "$tmp/extension.json" > "$OUT"
