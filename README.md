# braird-tokens

One platform-neutral source of Braird's design tokens (colour · type · space · radii ·
shadows · font intent), generated into per-platform bindings so every client reads
**generated output** — never a hand-copy. Stands up SUR-642.

```
tokens/**            DTCG/JSON — the ONLY source of truth (edit here)
platforms/css/       web-only.css — CSS-emitter-local tokens (not neutral)
scripts/build.mjs    Style Dictionary build + custom emitters
build/               GENERATED, committed, drift-guarded — DO NOT EDIT
  css/tokens.css       :root + [data-theme="dark"] + @media prefers-color-scheme
  compose/BrairdTokens.kt   object BrairdTokens { ColorLight, ColorDark, Space, Radius, Typography, Font }
  swift/BrairdTokens.swift  enum BrairdTokens  { ColorLight, ColorDark, Space, Radius, Typography, Font }
```

## Commands

```bash
npm install
npm run build     # regenerate build/ from tokens/**
npm run check     # build + assert-based selfcheck (scripts/selfcheck.mjs)
npm run drift     # build + `git diff --exit-code build/` (what CI enforces)
```

Style Dictionary is used purely as the DTCG parser + reference resolver + file emitter;
values are kept raw and rendered per platform in `scripts/build.mjs` (the built-in
compose/ios-swift size transforms assume rem inputs and would mangle px-authored tokens).

## Consumers (pin by tag + SHA)

Each consumer pins this repo as an npm git dependency — the SHA recorded in
`package-lock.json` **is** the checksum pin:

```jsonc
// surfc / surfc-web package.json
"@braird/tokens": "github:pentoaswordfight/braird-tokens#<tag>"
```

then imports the generated CSS (`@braird/tokens/css`). Native consumers vendor the
generated `BrairdTokens.kt` / `BrairdTokens.swift` from a pinned tag. `braird-android`
wiring is **SUR-763**; `braird-ios` when its UI starts.

## Dark mode + stat font — provisional

`tokens/dark/color.json` and `--font-stat` currently hold **placeholder** values so the
machinery builds end-to-end. The real values come from the `braird/Braird Screens.html`
Claude Design import (`/design-login`, run interactively) — a data-only follow-up. See
`CHANGELOG.md`.

## Editing

Edit `tokens/**`, run `npm run check`, commit the regenerated `build/`. Never hand-edit
`build/` — the drift CI regenerates and fails on any divergence. `DESIGN.md` is the shared,
platform-neutral design-intent doc (relocated from `surfc`).
