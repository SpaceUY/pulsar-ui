<style>
h1, h2, h3 { border-bottom: none !important; }

details { margin: 0 0 2em; }
details > summary { cursor: pointer; color: #5b6b7a; }

table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0 1.75em;
  font-size: 0.95em;
}
th, td {
  border: 1px solid #d6dde3;
  padding: 0.55em 1em;
  text-align: left;
  vertical-align: top;
}
th {
  background: #eef1f4;
  font-weight: 600;
}
tr:nth-child(even) td {
  background: #f8f9fb;
}
td code, th code {
  white-space: nowrap;
}

@media (prefers-color-scheme: dark) {
  details > summary { color: #8b97a3; }
  th, td { border-color: #3a4552; }
  th { background: #1a2129; color: #e8edf2; }
  tr:nth-child(even) td { background: #161c22; }
}
</style>

# Collaboration & Release Process

How branching, pull requests, and releases work in `@space-uy/pulsar-ui`.
This ties together the rules in [CONTRIBUTING.md](./CONTRIBUTING.md) and
[VERSIONING.md](./VERSIONING.md) with what actually runs in CI
(`.github/workflows/`) and in the `pull-request` / `release-pr` skills.

## 1. Branch model

Two long-lived branches:

- **`main`** — production. Always what's published on npm under the
  `latest` dist-tag. Only moves via the release PR in section 4.
- **`dev`** — integration branch. Every push publishes a beta version to npm
  (section 3), so `dev` is always installable, just not "stable".

Everything else is a **short-lived, type-prefixed branch** cut from `dev`.

<div style="overflow-x: auto;">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/diagrams/01-branch-model-dark.svg">
  <img src="./assets/diagrams/01-branch-model-light.svg" alt="Branch model: feature branches merge into dev, dev auto-publishes beta releases, dev merges into main via a release PR, main publishes stable releases" height="210">
</picture>
</div>

<details>
<summary>Diagram source</summary>

```mermaid
flowchart LR
    subgraph FEAT["short-lived branches"]
        direction TB
        A["feat/add-date-picker"]
        B["fix/button-alignment"]
        C["ci/fix-beta-release-npm-engine"]
    end

    A --> D
    B --> D
    C --> D

    D["dev"] -->|push / merge| BETA["beta-release.yml"]
    BETA -->|publishes| BETAOUT(["vX.Y.Z-beta.N"])
    D -->|release-pr skill| M["main"]
    M -->|push| REL["release.yml"]
    REL -->|publishes| RELOUT(["vX.Y.Z"])

    classDef branch fill:#1a2129,stroke:#3a4552,color:#e8edf2
    classDef devline fill:#35d68e,stroke:#35d68e,color:#0b1510
    classDef mainline fill:#e8a14c,stroke:#e8a14c,color:#1c1206
    classDef automation fill:#6f93d6,stroke:#6f93d6,color:#0b1220

    class A,B,C branch
    class D,BETAOUT devline
    class M,RELOUT mainline
    class BETA,REL automation
```

</details>

### Branch naming

`<type>/<short-description>`, enforced by a lefthook `pre-push` hook (`main`
and `dev` are exempt):

| Prefix | Use for |
|---|---|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation-only changes |
| `chore/` | Tooling, dependency bumps, misc maintenance |
| `refactor/` | Code refactors with no behavior change |
| `test/` | Adding/updating tests |
| `perf/` | Performance improvements |
| `ci/` | CI/CD or workflow changes |
| `build/` | Build system changes |
| `style/` | Formatting-only changes |
| `revert/` | Reverting a previous change |

Examples: `feat/add-date-picker`, `fix/button-alignment`,
`ci/fix-beta-release-npm-engine`.

## 2. Making a change and opening a PR

<div style="overflow-x: auto;">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/diagrams/02-pr-flow-dark.svg">
  <img src="./assets/diagrams/02-pr-flow-light.svg" alt="PR flow: contributor commits on a type-prefixed branch, opens a PR into dev, the title check runs, CODEOWNERS requests review, then the PR is merged" height="620">
</picture>
</div>

<details>
<summary>Diagram source</summary>

```mermaid
sequenceDiagram
    participant Dev as Contributor
    participant Branch as type/branch
    participant GH as GitHub
    participant CI as pr-title.yml

    Dev->>Branch: git checkout -b feat/x dev
    Dev->>Branch: commit (conventional commits,\nchecked by commitlint)
    Dev->>GH: open PR — branch → dev\n(pull-request skill)
    GH->>CI: on open / edit / synchronize
    CI-->>GH: title matches\n<type>(scope)!: lowercase subject
    Note over GH: CODEOWNERS requests review\nfrom @chacaa @pvicensSpacedev
    GH-->>Dev: review & approve
    Dev->>GH: merge to dev
```

</details>

What's actually enforced:

- **Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/en)
  (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
  `chore`, `revert`) — checked locally by the `commitlint` lefthook
  `commit-msg` hook.
- **PR titles** follow the same format (`<type>(scope)!: lowercase
  subject`) — checked remotely by
  [`pr-title.yml`](./.github/workflows/pr-title.yml) on every PR, regardless
  of base branch. Matters even more on squash-merge, since the PR title
  becomes the commit message.
- **Lint/typecheck** run locally on staged files via the lefthook
  `pre-commit` hook.
- **Full CI (lint, typecheck, test, build-library, build-web) only runs on
  PRs targeting `main`** — [`ci.yml`](./.github/workflows/ci.yml) scopes its
  `pull_request` trigger to `branches: [main]`. PRs into `dev` aren't gated
  by the test suite in CI; they rely on the local lefthook hooks above plus
  human review. The full suite runs later, as a gate on the release PR
  itself (section 4).
- Open PRs with the **`pull-request`** skill (`/pull-request` or
  `/pull-request --branch:"<name>"`) — it generates a compliant title and
  fills in `.github/pull_request_template.md` from the actual diff.

## 3. Beta releases — automatic, on every push to `dev`

Every push to `dev`, including a merged PR, triggers
[`beta-release.yml`](./.github/workflows/beta-release.yml). No manual step —
this is how `dev` stays continuously installable for testing.

<div style="overflow-x: auto;">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/diagrams/03-beta-release-dark.svg">
  <img src="./assets/diagrams/03-beta-release-light.svg" alt="Beta release flow: push to dev checks for new commits, builds the package, computes a beta version, updates Node, then publishes to npm under the beta tag unless it's a dry run" height="290">
</picture>
</div>

<details>
<summary>Diagram source</summary>

```mermaid
flowchart LR
    A["push to dev"] --> B{commits since last tag?}
    B -- no --> Z["skip"]
    B -- yes --> C["yarn prepare"]
    C --> D["compute beta version\nbase + '-beta.<run_number>'"]
    D --> E["bump package.json\n(local only, never pushed)"]
    E --> F["Node 22 (floating)\nfor OIDC publish"]
    F --> G["npm install -g npm@latest"]
    G --> H{dry_run?}
    H -- true --> I["stop — build verified,\nnothing published"]
    H -- false --> J["npm publish --tag beta"]
    J --> K(["@space-uy/pulsar-ui@beta"])

    classDef automation fill:#6f93d6,stroke:#6f93d6,color:#0b1220
    classDef devline fill:#35d68e,stroke:#35d68e,color:#0b1510
    classDef dim fill:#151c22,stroke:#2c3742,color:#5c6773

    class A,F,G,J automation
    class K devline
    class Z,I dim
```

</details>

The version is `<base-version>-beta.<github.run_number>` (e.g.
`0.12.0-beta.42`) — bumped only in the ephemeral runner's `package.json`,
never committed, so it can't collide with the real `release-pr` version
diffing. The same workflow also takes a manual `workflow_dispatch` with a
`dry_run` input, which runs the full build and version computation without
publishing — the mechanism used to validate pipeline fixes safely.

To try unreleased `dev` work:

```sh
yarn add @space-uy/pulsar-ui@beta
```

## 4. Stable releases — `dev` → `main`, reviewed

Stable releases are not automatic. They go through a reviewed PR from `dev`
into `main`, prepared with the **`release-pr`** skill.

<div style="overflow-x: auto;">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/diagrams/04-stable-release-dark.svg">
  <img src="./assets/diagrams/04-stable-release-light.svg" alt="Stable release flow: the release-pr skill computes the version and changelog, opens a chore(release) PR, full CI runs, merging to main triggers release.yml which publishes to npm and tags the release" height="960">
</picture>
</div>

<details>
<summary>Diagram source</summary>

```mermaid
sequenceDiagram
    participant Skill as release-pr skill
    participant Repo as dev
    participant GH as PR (dev → main)
    participant CI as ci.yml + pr-title.yml
    participant Main as main
    participant Rel as release.yml
    participant NPM as npm registry

    Skill->>Repo: yarn release --dry-run --ci\n(version + changelog)
    Skill->>Repo: bump package.json
    Skill->>Repo: update CHANGELOG.md
    Skill->>Repo: sync docs + example app
    Skill->>Repo: typecheck / lint / test
    Skill->>GH: open "chore(release): vX.Y.Z"
    GH->>CI: full suite + title check
    CI-->>GH: must pass before merge
    Note over GH: human review & approval
    GH->>Main: merge
    Main->>Rel: push triggers release.yml
    Rel->>Rel: Node 22 (floating) for OIDC,\nnpm install -g npm@latest
    Rel->>NPM: yarn release --ci --no-increment
    Rel->>Main: commit "chore: release vX.Y.Z",\ntag vX.Y.Z, push back
    Rel->>GH: publish GitHub Release
```

</details>

What the skill does, in order:

1. Verifies you're on `dev` — refuses to run anywhere else.
2. Computes the real version bump from conventional commits since the last
   tag via `yarn release --dry-run --ci` (same `release-it` +
   `@release-it/conventional-changelog` pipeline CI uses — never
   hand-guessed).
3. Bumps `package.json`'s `"version"` to that value. This is load-bearing:
   `release.yml` runs `yarn release --ci --no-increment`, which publishes
   whatever version is already committed — if this doesn't match step 2, CI
   ships the wrong version.
4. Prepends a new section to `CHANGELOG.md`, grouped by commit type.
5. Syncs the docs site (`docs/src/content/docs/...`) and the example app
   (`example/app/ui-kit/...`) for any changed component or util.
6. Runs `yarn typecheck && yarn lint && yarn test` as a safety gate — stops
   on any failure.
7. Opens the PR titled `chore(release): vX.Y.Z`, marking "🚀 Release of new
   version" in the PR template.

**Merging that PR to `main` is what actually publishes to npm.** From there,
[`release.yml`](./.github/workflows/release.yml):

- Skips itself if the triggering commit message contains `chore: release` —
  this is what stops `release-it`'s own commit-and-push-back from
  re-triggering the workflow in a loop.
- Floats to `node-version: '22'` rather than a pinned patch for the publish
  step, and deliberately omits `registry-url` — passing it makes
  `actions/setup-node` write a placeholder npm auth token, which breaks the
  OIDC trusted-publishing exchange (`package.json`'s `publishConfig` already
  points npm at the right registry).
- Runs `yarn release --ci --no-increment`, which publishes the exact version
  in `package.json`, tags `vX.Y.Z`, generates the GitHub Release, and pushes
  a `chore: release vX.Y.Z` commit back to `main`.

## 5. Full picture

<div style="overflow-x: auto;">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/diagrams/05-full-picture-dark.svg">
  <img src="./assets/diagrams/05-full-picture-light.svg" alt="Full picture: a type-prefixed branch PRs into dev, dev auto-publishes beta versions on every push, and dev periodically PRs into main via the release-pr skill, which publishes a stable version and tags the release" height="345">
</picture>
</div>

<details>
<summary>Diagram source</summary>

```mermaid
flowchart LR
    FB["type/branch"] -->|PR + review\npr-title.yml gate| DEV["dev"]
    DEV -->|every push| BETA(("beta-release.yml"))
    BETA -->|npm publish --tag beta| NPMB(["@space-uy/pulsar-ui@beta\nvX.Y.Z-beta.N"])

    DEV -->|release-pr skill| RPR["chore(release): vX.Y.Z\n(dev → main)"]
    RPR -->|full CI + review + merge| MAIN["main"]
    MAIN -->|push| REL(("release.yml"))
    REL -->|npm publish| NPML(["@space-uy/pulsar-ui@latest\nvX.Y.Z"])
    REL -->|tag + GitHub Release| MAIN

    classDef branch fill:#1a2129,stroke:#3a4552,color:#e8edf2
    classDef devline fill:#35d68e,stroke:#35d68e,color:#0b1510
    classDef mainline fill:#e8a14c,stroke:#e8a14c,color:#1c1206
    classDef automation fill:#6f93d6,stroke:#6f93d6,color:#0b1220

    class FB,RPR branch
    class DEV,NPMB devline
    class MAIN,NPML mainline
    class BETA,REL automation
```

</details>

| Workflow | Trigger | Publishes? | Purpose |
|---|---|---|---|
| [`pr-title.yml`](./.github/workflows/pr-title.yml) | Any PR opened/edited/synced/reopened | No | Enforces Conventional Commits PR titles |
| [`ci.yml`](./.github/workflows/ci.yml) | Push to `main`, PR into `main`, merge queue | No | Lint, typecheck, test, build library, build web example |
| [`beta-release.yml`](./.github/workflows/beta-release.yml) | Push to `dev`, or manual `workflow_dispatch` (with `dry_run`) | Yes — `beta` tag | Automatic pre-release on every `dev` change |
| [`release.yml`](./.github/workflows/release.yml) | Push to `main` (self-guarded against its own release commit) | Yes — `latest` tag | Stable release, tag, GitHub Release |
| [`deploy-docs.yml`](./.github/workflows/deploy-docs.yml) | (see file) | No | Publishes the docs site |
| [`stale.yml`](./.github/workflows/stale.yml) | Weekly schedule | No | Labels/closes stale issues & PRs |

## 6. Quick reference

- **Starting new work**: `git checkout -b <type>/<short-description> dev`
- **Opening a PR into `dev`**: use the `/pull-request` skill
- **Trying unreleased `dev` work**: `yarn add @space-uy/pulsar-ui@beta`
- **Cutting a stable release**: use the `/release-pr` skill from `dev` — it
  opens the `dev → main` PR; merging it publishes to npm
- **Dry-running the beta pipeline** (e.g. to validate a CI change without
  publishing): `gh workflow run beta-release.yml --ref <branch> -f dry_run=true`
