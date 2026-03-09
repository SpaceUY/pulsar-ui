# Versioning Strategy

This project follows [Semantic Versioning 2.0.0](https://semver.org/).

## Version Format

```
MAJOR.MINOR.PATCH
```

- **MAJOR** version — Incompatible API changes (breaking changes)
- **MINOR** version — New functionality added in a backward-compatible manner
- **PATCH** version — Backward-compatible bug fixes

> While the library is in `0.x.x` (pre-1.0), minor versions may include breaking changes. Once we release `1.0.0`, the full semver contract applies.

## How Versions Are Determined

We use [Conventional Commits](https://www.conventionalcommits.org/en) to automatically determine the version bump:

| Commit Prefix | Version Bump | Example |
|--------------|-------------|---------|
| `fix:` | PATCH | `fix(button): resolve alignment issue` |
| `feat:` | MINOR | `feat(chip): add new variant prop` |
| `feat!:` or `BREAKING CHANGE:` | MAJOR | `feat!: redesign theme API` |
| `docs:`, `chore:`, `test:`, `refactor:` | No bump | `docs: update README` |

## Release Process

1. Ensure all changes are merged to `main`.
2. Run `yarn release` from the root directory.
3. `release-it` will:
   - Determine the next version based on conventional commits.
   - Update `package.json` version.
   - Generate/update the changelog.
   - Create a git tag (`vX.Y.Z`).
   - Publish to npm (`@space-uy/pulsar-ui`).
   - Create a GitHub release with release notes.

## Pre-release Versions

For testing before a stable release, use:

```sh
yarn release --preRelease=beta
```

This produces versions like `0.12.0-beta.0`.

## Version History

See [CHANGELOG.md](./CHANGELOG.md) for a detailed version history.
