# GATING.md — braird-tokens

This repo follows the **Gated / Conducted Engineering** pattern. It is **all spine**: the
token source is the cross-repo, cross-platform design contract — a change here fans out to
`surfc`, `surfc-web`, `braird-android`, and `braird-ios`. Treat every change as
founder-gated.

## The gate

Before merging any change:

1. **Drift green** — `npm run check` passes and `build/` is in sync with `tokens/**`
   (`.github/workflows/drift.yml`).
2. **Changelog** — a `[Unreleased]` entry in `CHANGELOG.md` (`.github/workflows/changelog-check.yml`).
3. **Naming review** for any **new public token name** — names are a four-consumer contract.
   (Confirm the current owning persona; the `naming-reviewer` scope changed under SUR-777.)
4. **Founder sign-off.** `tokens.css` has always been a spine path (the front-door-font
   contract, SUR-508); standing the source up here does not lower that bar.

You are an **agent under the gate**, not autonomous: write the plan, name the gate, propose
the change. **Do not merge.**

## Spine paths (the whole repo, notably)

- `tokens/**` — the source of truth. Value or name changes are spine.
- `scripts/build.mjs` — the emitter; changes the shape every consumer reads.
- `platforms/css/web-only.css` — the web CSS contract.
- `build/**` — generated; never hand-edited (see CLAUDE.md), regenerate instead.

## Cross-repo / cross-platform contracts

- **`--font-front-door` (Sometype Mono, SUR-508)** — must stay in lockstep across the CSS
  emit consumed by surfc + surfc-web.
- **Token names** — must match `surfc/src/design/tokens.css` so aliased components recolour
  unchanged; a rename is a coordinated four-repo change.
- **Consumer pins** — surfc / surfc-web / native pin this repo by tag + SHA; a token change
  is not "live" until each consumer re-pins.
