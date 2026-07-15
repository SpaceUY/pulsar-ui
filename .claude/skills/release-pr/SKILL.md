---
name: release-pr
description: Prepares a release pull request targeting main (the branch that triggers the automated npm publish workflow). Computes the next version and changelog from conventional commits, updates CHANGELOG.md, syncs the docs site and the example app (mobile + web) with any component/util changes, and opens the PR for review.
---

Create a release pull request by following these steps exactly. This is a higher-stakes PR than a regular feature PR: **merging it to `main` triggers a real npm publish** via `.github/workflows/release.yml`. Never skip the safety checks below.

## Argument parsing

Check whether the invocation included a `--branch:"<name>"` argument. If present, use that as the **base branch**. If absent, default to `main`.

Call this value `$BASE`.

Check for a `--dry-run` argument (see Arguments section below).

## Step 1 — Gather what's shipping

Run in parallel:

```bash
git branch --show-current
```

```bash
git describe --tags --abbrev=0
```

```bash
git log --no-merges --format="%H %s" $(git describe --tags --abbrev=0)..HEAD
```

```bash
git diff --stat $(git describe --tags --abbrev=0)...HEAD
```

```bash
git diff --no-merges $(git describe --tags --abbrev=0)...HEAD
```

If `git describe --tags --abbrev=0` fails (no tags yet), fall back to diffing against `$BASE`'s merge-base instead, same as the `pull-request` skill does.

If there are no commits beyond the last tag, stop and inform the user — there is nothing to release.

## Step 2 — Compute the real version bump and changelog

Run:

```bash
yarn release --dry-run --ci
```

This is the same `release-it` + `@release-it/conventional-changelog` pipeline that the CI release workflow uses, so its output is the source of truth for what CI will actually publish — never hand-guess the version bump. Extract from its output:

- the next version number
- the bump type it represents (see table below)
- the generated changelog entries, grouped by conventional-commit type (feat, fix, etc.)

Do not run this without `--dry-run`. It must never publish, tag, or push anything itself.

The `angular` preset (configured in `package.json`'s `release-it.plugins` block) maps conventional-commit types to semver like this — this is informational only, never compute the bump yourself, always read the actual number out of the Step 2 output:

| Commits since last tag include... | Bump type | Version change |
|---|---|---|
| only `fix:` (and other non-breaking types) | patch | `x.y.(Z+1)` |
| at least one `feat:` | minor | `x.(Y+1).0` |
| any commit with `BREAKING CHANGE:` in the footer or a `!` after the type (e.g. `feat!:`) | major | `(X+1).0.0` |

## Step 3 — Bump `package.json`

Set the `"version"` field in `package.json` to the next version number from Step 2.

This is required, not optional: the release workflow (`.github/workflows/release.yml`) runs `yarn release --ci --no-increment`, which tells `release-it` to publish whatever version is already committed in `package.json` instead of recomputing one itself. If this step is skipped, or the version doesn't match what Step 2 computed, CI will tag and publish the wrong version.

`yarn.lock`'s own workspace entry for this package pins to the placeholder `0.0.0-use.local`, not the real version, so it never needs updating here.

## Step 4 — Update CHANGELOG.md

`release-it` is configured with `infile: "CHANGELOG.md"`, so this file is the project's persistent history and must stay ahead of what's about to ship:

- If `CHANGELOG.md` doesn't exist, create it with a `# Changelog` header.
- Prepend a new `## [<next-version>] - <today's date>` section (do not invent a date — use the date the skill is run, e.g. `date +%Y-%m-%d`) built from the Step 2 output, grouped under sub-headings that match the conventional-commit types actually present (e.g. `### Features`, `### Bug Fixes`).
- Do not touch or reformat existing entries below the new section.
- Word each entry clearly and specifically (what changed and, if relevant, why) — not raw commit subjects verbatim if they're vague.

## Step 5 — Sync the docs site

For every file changed under `src/components/**` or `src/utils/**` in the Step 1 diff, compare its public props/exports against the matching doc page:

- **New component/util added** → create `docs/src/content/docs/components/<name>.mdx` (or `utils/<name>.md`), following the exact structure of an existing sibling page (frontmatter with `title`/`description`, `Playground` import for components, `Import`, `Basic usage`, `Properties` table, variant/example sections, `Implementation notes`, `Styling`, `Accessibility`). Then add a matching entry to the `sidebar` array in `docs/astro.config.mjs`, keeping the existing alphabetical ordering within its group.
- **Component/util removed** → delete its doc page and remove its sidebar entry from `docs/astro.config.mjs`.
- **Props/behavior changed** → update only the affected sections (usually the `Properties` table and/or the relevant example), preserving the rest of the page's existing wording and structure. Do not rewrite unrelated sections.

Never invent documentation for behavior that isn't in the diff.

## Step 6 — Sync the example app (mobile + web)

The example app (`example/`) is a single Expo Router source shared by mobile and web (web is just `expo export --platform web` of the same screens) — there's one place to update, not two:

- **New component added** → add a new screen at `example/app/ui-kit/<name>.tsx` demonstrating it (mirror the structure of an existing sibling screen under `example/app/ui-kit/`), and add a matching entry to `example/assets/data/components.json` (`name`, `route`, `iconName`) so it appears on the example app's home screen.
- **Component removed** → delete its screen under `example/app/ui-kit/` and remove its entry from `example/assets/data/components.json`.
- **Component behavior/props changed** → update the existing screen under `example/app/ui-kit/` to demonstrate the new behavior if the old usage no longer reflects it.

## Step 7 — Safety checks before opening the PR

Run and confirm all pass before proceeding:

```bash
yarn typecheck
yarn lint
yarn test --passWithNoTests
```

If any fail, stop and report the failure — do not open the PR with known-broken checks.

## Step 8 — Fill in the PR description

Read `.github/pull_request_template.md` and use it as the exact base structure, same conventions as the `pull-request` skill:

- **DESCRIPTION**: 2-4 sentences on what's being released and why, plus the computed next version and its bump type (e.g. "Releases v1.4.0 (minor — new features), which adds... and fixes...").
- **TYPE OF CHANGE**: mark `🚀 Release of new version` in addition to whichever other categories apply to the underlying changes.
- **CHANGELOG**: the same entries just added to `CHANGELOG.md`.
- **DEMO IOS / DEMO ANDROID / DEMO WEB**: `--` unless a new/changed component's example screen is worth calling out.
- **OBSERVATIONS**: explicitly state: "Merging this PR to `main` triggers an automated npm publish of v<next-version> via the Release workflow." Add any docs/example-app pages added or removed. Add `--` if there's nothing else.
- **RELATED TICKETS**: `--` (not available automatically).

## Step 9 — Create the pull request

```bash
gh pr create --base $BASE --title "Release v<next-version>" --body "$(cat <<'EOF'
<filled template content>
EOF
)"
```

Output the PR URL so it's visible in the conversation.

## Arguments

- `--dry-run` — Skip Step 9 (and do not stage/commit anything in Steps 3-6, including the `package.json` bump). Instead print: the computed version and bump type, the changelog entries, the list of docs/example files that would be added/removed/modified, and the full PR title/body as a markdown code block, so the user can review before anything is written to disk.

## Rules

- Never invent changes that are not in the diff.
- Never guess the version bump or bump type — always derive both from `yarn release --dry-run --ci`.
- Always set `package.json`'s `"version"` to that exact computed value — CI runs with `--no-increment` and trusts this file as-is.
- Never skip the docs or example-app sync for a component/util that changed — check both every time, even for small prop tweaks.
- Never skip checklist items from the PR template — always include the full list.
- Never run `yarn release` without `--dry-run` from within this skill — actual publishing only happens via the CI workflow after merge.
- Do not add AI attribution anywhere in the PR content, commits, or CHANGELOG.md.
- Do not add a "Co-authored-by" or "Generated by" line.
- If the branch has no commits beyond the last tag, stop and inform the user.
