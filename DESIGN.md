# Surfc Design System: Analogue/Warm

## 1. Core Vision
Surfc is a digital companion for physical reading. The UI should feel like a high-end stationery set or a well-organized library archive. It is tactile, calm, and focused.

## 2. Visual Rules (Mapping to tokens.css)
- **Backgrounds:** Use `--color-bg-primary` for the main app background. Use `--color-bg-card` for individual note cards to create a subtle "layered paper" effect.
- **Borders:** Use `--color-border` for standard dividers. Use `--radius-card` (14px) for all note containers.
- **Typography:** Use the 'IBM Plex Sans' stack from tokens (via `--font-base`). Body text should use `--text-body-size` and `--color-text-primary` for maximum readability.

## 3. Layout & Hierarchy
- **The "Focus" Rule:** During the "New Note" capture process, the Library Grid must be hidden. Only the active book and the current note editor should be visible.
- **Spacing:** All margins and paddings must use multiples of `--space-1` (8px). Default screen padding is `--space-2` (16px).
- **Index Card Aesthetic:** Notes should look like physical cards. Use `--shadow-card` to provide depth against the warm background.
- **Bottom Navigation:** Four button ('Home', 'New Note', 'Index', 'Profile') navigation bar at the bottom of the screen, consistent across the application. Profile uses the phosphor `UserIcon`. The bottom nav is **hidden** on the `capture` and `note` views — those screens manage their own navigation via the capture header X button and the `CaptureFabMenu` speed-dial.
- **Profile Avatar Disc:** 36px circular button in the top-right corner on every authenticated screen. Initials derived from `user_profiles.name` (fallback: first letter of the email). Background `--color-accent-light`, text `--color-accent-text`. Tapping opens the Profile screen. **Settings is no longer a first-class entry** — it is reached only via the "Settings" row inside Profile.

## 4. Iconography (phosphor-react)
- **Library:** Use the `phosphor-react` library.
- **Weight:** Always use `weight="light"` or `weight="regular"` to maintain a clean, "pen-drawn" look.
- **Color:** Icons should use `--color-text-secondary` by default, or `--color-accent` for active actions.
- **Size:** Default action icons to `size={24}`.
- 

## 5. Component Specifics
- **AI Idea Chips:** Use `--radius-chip` (999px). The background should be `--color-accent-light` with text in `--color-accent-text`.
- **Primary Buttons:** Use `--color-accent` as the background. Since the contrast is low (2.9:1), ensure the text inside is bold and clear.
- **Add-Idea Sheet:** `AddIdeaSheet` renders inside `BottomSheet` with an autofocused search input, section labels ("The Canon" / "Your Ideas"), result rows, and a "Create" CTA. Result rows use plain `<button>` elements (not `role="option"`) because section labels break the strict ARIA listbox contract. Disabled/added rows carry `aria-disabled="true"` and an "Added" pill. Custom ideas are distinguished by a `custom-dot` span, not just label text. Always call `useFocusRestore(open)` at the top of any bottom sheet or modal to restore keyboard focus to the triggering element on close.
- **AddIdeaBanner:** Uses `attribution-banner` shared styles for consistency with the source-attribution banner. Dismiss uses `@phosphor-icons/react X` at `size={16} weight="light"`. `role="status"` keeps assistive tech informed without interrupting the user.

## 6. Immersive Layout (Edge-to-Edge)
- **Principle:** Content must bleed behind the system status bar and navigation bar.
- **Implementation:** Use `viewport-fit=cover` in the HTML meta tag.
- **Safe Areas:** Use the CSS variables `--safe-top` and `--safe-bottom` from `tokens.css` to ensure interactive elements (buttons, text) are not cut off by the "notch" or home indicator.
- **Non-negotiable rule:** Every top-level mobile screen container **must** apply `padding-top: max(var(--space-2), env(safe-area-inset-top))` (or equivalent via `calc()`) even when its background extends edge-to-edge. Interactive chrome (titles, avatar, close buttons) must never sit underneath the status bar. Bleed backgrounds; protect content.
- **Token wiring:** `--safe-top` is aliased to `var(--safe-area-top)` which resolves to `env(safe-area-inset-top, 0px)`. Never hardcode `0px` or a pixel fallback — let the environment report.

## 7. The Camera Viewfinder
- **Vibe:** Minimalist "Field Notes" style.
- **Visuals:** Use corner brackets rather than a full box. 
- **Style:** Brackets should use `2px dashed` strokes with `--color-border-strong`.
- **Overlay:** Apply a subtle dimming effect (`--color-bg-overlay`) outside the capture area to focus the user’s eye.
- **Feedback:** When text is detected, highlight the area with a soft glow using `--color-accent` at 20% opacity.

## 8. Visual Textures & Effects
- **Film Grain:** Apply a subtle, animated grain texture as an overlay.
- **Implementation Constraint:** The grain must be a separate CSS layer (`::after` or absolute div) and NOT a filter applied to the raw video stream.
- **OCR Integrity:** Ensure the data buffer sent to the AI/OCR engine remains raw and unfiltered to maintain high extraction accuracy.

## 9. Focus Mode Logic (The "Zen" State)
- **Trigger:** Entering the "Start Capturing" or "New Note" flow.
- **Layout Shift:** - **Hide:** The `.ideas-sidebar` and `.library-panel` (the grid of 50+ books).
  - **Expand:** The `.main-col` must take 100% of the available width.
  - **Header:** Transition to a "Minimal Header." Hide `.header-stats` and `.settings-btn`. Show a single `phosphor-react` `X` icon (weight="light") to cancel.
- **Background Tasking:** - The AI "Consulting" state should start immediately after OCR. 
  - Do not block the UI; allow the user to type the "Page Number" while tags are being generated in the background.
- **Exit Strategy:** Upon "Save" or "Cancel," perform a `transition-base` fade-out and return the user to their previous scroll position in the Index or Library.

## 10. Animation Principles
- **Motion:** Use "Slide & Fade" for transitions. Avoid "Bounce" or "Elastic" effects.
- **Timing:** All UI feedback should stay within `--transition-base` (200ms) to support the <30s capture goal.
- **Micro-interactions:** Use staggered entrance animations (delay: 0.05s) for AI-generated tags to make the "Discovery" feel organic.

## 11. Public Landing & Waitlist (Marketing Surface)
- **Ethos:** The "Front Hall." High-trust, academic, and calm. Avoid aggressive "Growth-Hacking" visuals.
- **Visual Metaphor:** Use the "Horizon" or "Emergent Spark" metaphor. Content should appear to "surface" from a clean, ivory-toned background (`--color-bg-primary`).
- **Layout (The Scroll):** - Use generous vertical breathing room (multiples of `--space-6`). 
  - Sections should be contained in "Card-like" structures only when highlighting features, otherwise, let the typography lead on the background.

## 12. Typography for Persuasion
- **Hero Headers:** Use 'EB Garamond' (or a similar premium serif) for the main value proposition to establish the "Reading & Wisdom" context.
- **Sub-headers:** Use 'IBM Plex Sans' (`--text-label-weight`) in all-caps with letter-spacing (`0.12em`) to provide a technical, organized contrast. Plex Sans's slightly more open default tracking may make `0.12em` feel loose — audit at real chrome sizes and tighten to `0.08–0.10em` if needed.
- **Hierarchy:** Maintain the 1.6 line-height for body copy to keep the reading experience effortless.
- **Front-door base face — Sometype Mono (SUR-508).** The unauthenticated entry surfaces (public Landing, Waitlist, and the Login/sign-up screen) use **Sometype Mono** as the sans-base *chrome* face, applied via the `.front-door-surface` wrapper (`font-family: var(--font-front-door)`). This deepens the "Front Hall" register — a contemplative, monospaced calm outside the login boundary, precise IBM Plex Sans inside it; the typeface flip *is* the gesture. **Scope guardrail — do not globalize.** `--font-front-door` is applied *only* through `.front-door-surface` and must never replace `--font-base`. The authenticated interior, the EB Garamond hero/wordmark + reading content, and the Lora screen titles all keep their existing tokens — Sometype Mono replaces only the sans-base chrome on the front door (e.g. `.home-tagline` is pinned back to `--font-base`; `.home-logo` is already `--font-serif`). On front-door surfaces mono is already wide by grid, so keep all-caps tracking at `0`–`0.02em` rather than the `0.12em` used elsewhere. Self-hosted with `font-display: optional` + a preload of the 400 face (PWA `index.html`) / `@fontsource` (surfc-web) so there is no FOUT. The mono *role* swap (Fira Mono → Sometype Mono) is the separate sibling SUR-509.

## 13. Waitlist & Lead Capture (The Commitment)
- **Form Design:** Use a single, centered input field (`--color-bg-input`) with a `--radius-input` (10px).
- **CTA Contrast:** The "Join Waitlist" button must use `--color-accent` with Deep Walnut (`--color-text-primary`) text for maximum readability and a "Hand-stamped" leather feel.
- **Micro-Copy:** Use `--color-text-secondary` for "Privacy/No-spam" hints to keep them understated and metadata-like.

## 14. Marketing Micro-Animations
- **The "Ink Bleed" Reveal:** Apply the staggered span animation from §5.2 to the main landing page headline. The vision of "compounding insights" should appear to dry on the page as the user scrolls.
- **The "Idea Spark":** As users scroll past feature cards, use a 200ms ease-in for the Amber idea-dot to "surface" or glow.

## 15. Screen Chrome (Authenticated Surfaces)
- **Avatar Disc:** 36px circle, `--color-accent-light` fill, `--color-accent-text` initials (uppercase, 12px, weight 600), 1px `--color-border` ring. Hover adds `--shadow-card`. Active (on Profile screen) adds `--shadow-focus` and `cursor: default`. Replaces the Settings gear on every screen.
- **Screen Header Row:** `.screen-header` — flex space-between. Left: optional back chevron (icon-btn variant) + title block (display size) + optional subtitle (caption, muted). Right: avatar disc.
- **Link Row Pattern:** `.link-row` — card surface (`--color-bg-card`, `--radius-card`, 1px `--color-border`), 20px phosphor icon (light weight, `--color-text-secondary`), label (subtitle), `CaretRight` chevron (`--color-text-muted`). Hover lifts border to `--color-accent`. Min-height 48px.

## 16. Bottom Sheet Pattern
- **Trigger:** FAB or contextual button (e.g. Custom Ideas "+").
- **Form Factor:** Full-width sheet on mobile, centred 440px card on tablet/desktop.
- **Visuals:** `.bottom-sheet-handle` pill (36×4px, `--color-border-strong`) at the top. Title uses display size. Body uses `--space-2` gaps.
- **Motion:** `sheetSlideUp` 300ms ease on mobile (no bounce). Tablet/desktop fades in.
- **Dismissal:** Backdrop click, Escape key, explicit Cancel. Scrim: `--color-bg-overlay`.
- **Safe Areas:** Bottom padding is `calc(var(--space-3) + env(safe-area-inset-bottom, 0px))`.

## 17. Profile / Canon / Custom Ideas Screens
- **Identity Block:** Name (title weight) + tier badge chip (**FREE** = accent-light/accent-text, **PRO** = custom-bg/custom-text). Email below in subtitle muted. The tier label renders as a single word (`FREE`, `PRO`) — never "FREE TIER" or "PRO TIER". Badge sits inline with the name.
- **Upgrade CTA:** Only rendered when `user_tier === 'free'`. Full-width `.btn-accent`, 48px min-height, fires PostHog `upgrade_cta_clicked` + toast "Pro tier coming soon".
- **Usage Bar:** 8px rounded bar (`--color-accent-light` track, `--color-accent` fill, switches to `--color-warning` at ≥80%). Paired with Fira Mono percentage value.
- **Stat Grid:** `.profile-stats-grid` — 2×2 on mobile/tablet, 4×1 on desktop (≥1024px). Reuses existing `.stat-card` styling.
- **Danger Zone:** `.danger-zone` — Sign out (ghost) + Delete account (destructive) side-by-side below a divider at the bottom of Profile. Both 44px min-height.
- **FAB:** `.fab` — 56px amber disc, bottom-right. Bottom offset accounts for bottom nav height + safe-area-inset-bottom on mobile; drops to just safe-area on tablet/desktop.
- **Canon list:** Single column on mobile/tablet, two columns on desktop. Zero-count rows show an em-dash badge muted; notes-bearing rows show a pill with note count. Taps filter notes to that idea via the existing IdeaDetail flow.

## 18. Data Reads for Chrome
- `user_profiles` is fetched once per auth change via `useUserProfile(session)` → `fetchUserProfile(userId)`. Returns `{ name, email, user_tier, member_since (unix seconds), percent_use, role }`.
- Avatar initials derive from `userProfile?.name || session.user.email`.
- `member_since` is stored as `int4` unix seconds; format as `Mmm 'YY` for display.
- `percent_use` is a generated column (0–1); clamp + round for display.

## 19. Mobile Refresh (2026-04)

A "little-bit-more-fun" pass on the mobile experience. Keeps the existing navigation, routing, and data shape intact; layers on notebook-paper textures, serif hero typography, and expressive capture-flow animations. Scope: mobile viewports only. Tablet/desktop layouts unchanged.

### 19.1 Typography
- **Serif stack:** `--font-serif: 'EB Garamond', Georgia, 'Times New Roman', serif;` (added to `tokens.css`). Weights loaded: 400, 500, 600, 700 + italic 400, 600.
- **Where to use serif:** Home wordmark (56px / 500), stat-card values (28px / 700 in `--color-accent-text`), `.note-text` quote body in Index cards, `.recently-surfaced-quote`, `.ink-bleed-display` reveal, **book-source titles in the Sources/Library list (`.sources-row-btn .source-row-title`, SUR-198)** and the missing-cover initial tile (`.source-row-cover-initial`). Everything else stays IBM Plex Sans (the `--font-base` sans) — the serif is for reading-facing content only.
- **Screen titles stay Lora — do not change (SUR-440).** `.screen-header` titles (`.screen-title`) use `var(--font-display)` = Lora Bold Italic. This is the editorial screen-title treatment and is intentionally distinct from the EB Garamond used for reading-facing *content*. When adding serif to reading content (e.g. SUR-198 book titles), never let it bleed into the `.screen-title` / screen-header chrome — those remain Lora.

### 19.2 Home
- **Kicker + subtitle:** `.home-kicker` ("Today in Surfc", uppercase, 11px .14em, accent-text) above `.home-subtitle` (13px muted). The subtitle renders "`<weekday>` · N new notes this week" derived from in-memory `notes`. If no notes this week, fall back to the weekday alone.
- **Hero block:** Centered `.home-logo` in EB Garamond + italic tagline + SVG flourish underline (`.home-hero-flourish`). No dashed border around the hero.
- **Stat cards:** Centered value + uppercase label, amber serif value, soft card shadow. Carets removed (`.stat-caret { display: none }`). Same behaviour — tapping navigates to Index / Active Ideas / Sources respectively.
- **Recently surfaced card:** `.recently-surfaced-*` block between stats and the "Start Capturing" CTA. Picks one random note from the last 7 days (filter `createdAt >= now - 7d`, exclude decrypt-errors and empty text). Renders up to 2 tag chips + serif quote + source/page + `timeAgo()`. Card hides entirely when the user has no qualifying notes. The random pick re-rolls on notes-array change so a fresh capture can "surface".

### 19.3 Index note cards (`.index-note-card` + `.note-card`)
- **Dot-grid paper:** amber radial-dot gradient at 16px pitch, 14% alpha, layered over the white card surface. Applied to both `.index-note-card` (the main Index list) and `.note-card` (Library/IdeaDetail/RelatedNotes).
- **Dog-ear:** 22px `::after` pseudo-element in the **top-right** corner using a 225deg two-stop gradient + left/bottom 1px borders + 6px border-bottom-left radius. `z-index: 0` so the (hover-revealed) `.note-overflow-btn` sits on top cleanly.
- **No inline photo thumbnail.** Previously `IndexNoteCard` rendered an `.index-note-thumb` on the right side that opened the lightbox. That's removed. The original photo is reachable via **long-press → "View original photo"** in the `NoteActionSheet` — only rendered when the note has an `imageDataUrl`.
- **Body type:** `.index-note-text` and `.note-text` stay in EB Garamond (pre-existing). No change.

### 19.4 Profile
- **Unified identity panel (`.profile-identity-panel`):** one card holds the big 64px amber avatar, name + tier badge, `email · Member since Mmm 'YY` subtitle, and the usage bar. Card uses a subtle dot-grid `::before` layer (not a full dotgrid surface) so the content stays the focus. Centered layout.
- **Upgrade CTA** lives **below** the identity panel (only when `tier === 'free'`).
- **Stats grid** follows the CTA.
- **Tier label:** the badge text is the single word `FREE` or `PRO` — never "FREE TIER". See §17.
- **Legacy classes:** `.identity-block`, `.profile-meta`, `.profile-dotgrid` are retired. `.identity-name` / `.identity-email` / `.identity-member` remain as type helpers inside the new panel.

### 19.5 Bottom nav (`.bottom-nav` / `.nav-btn`)
- Active tab shows an amber underline pill (28px × 3px) at the top of the button via `.nav-btn.active::before`. Active-tab text color moves to `--color-accent-text`. Items unchanged (Home / Capture / Index / Profile). Structure unchanged.

### 19.6 Idea chips (base `.idea-chip`)
- Base style promoted to amber pill: `--color-accent-light` fill, `--color-accent-text` label, `--radius-chip`, 12px weight 500, 5px/10px padding.
- `.idea-chip.custom` variant swaps to the forest-green custom palette.
- `.idea-dot` defaults to `--color-accent` and 7px square (inside an `.idea-chip`). Custom variant sets its dot background inline to `--color-custom`.
- `.detected-tags .idea-chip` inside NoteForm inherits the base style and just adds `cursor: pointer` + 13px font-size.

### 19.7 New Note form layout
- **Photo banner (`.note-form-photo-banner`):** when a `capturedImage` exists, the first element after the header is a full-width 140px dark banner showing the source photo at 0.78 opacity over `#2b2218`. Top-left carries a "SOURCE PHOTO" amber label; tapping the banner opens the lightbox.
- **Transcription overlays ride on the banner:** scanline sweep + OCR dot-fly particles + top-right "READING INK" pulse label, all only while `transcribeLoading` is true.
- **Retake / Re-run transcription** links sit in a thin row directly under the banner (`.note-form-photo-actions`) — no longer buried in a bottom footer.
- **Attribution banner + transcribe-error banner** are inlined into the main body flow (next to the Source field and under the textarea respectively). The old `.note-form-footer` block is gone.
- **Schema-faithful:** Page/Section is a single field. Chapter is in the mock but not in our data model; intentionally not surfaced here.

### 19.8 Capture-flow animations

All capture-flow motion is opt-out via `@media (prefers-reduced-motion: reduce)` — the reduced-motion block at the end of `styles.css` kills every new animation plus the legacy `captureCardSlide` and ink-bleed reveal.

| Moment | Animation | Class / keyframe | Duration / easing |
|--------|-----------|------------------|-------------------|
| Shutter press | White flash overlay | `.shutter-flash` / `shutterFlash` | 600ms ease-out, forwards. Rendered as a sibling of the screen, keyed so a re-tap re-mounts the element. |
| Photo captured → note form | Card slide (pre-existing) | `.capture-card-preview.capture-card-slide` / `captureCardSlide` | 400ms cubic-bezier. Unchanged. |
| Transcribing (on photo thumb) | Amber scanline sweep | `.capture-scanline` / `captureScanline` | 2s ease-in-out infinite. Thin accent rail at the scan edge. |
| Transcribing (on photo thumb) | OCR dots peel off | `.ocr-dot` / `ocrDotFly` | 1.2s ease-out infinite. 6 dots with staggered `animation-delay` + CSS custom-property `--dx`/`--dy` for travel. |
| Transcribing (label) | Pulse dot + "Reading ink" caption | `.capture-pulse-dot` / `capturePulse` | 1.2s ease-in-out infinite. Sits inside `.capture-reading-label`. |
| Transcription complete | Ink-bleed word reveal (pre-existing) | `.ink-bleed-group` / `inkBleedReveal` | 1300ms per group, 250ms stagger. Restyled to EB Garamond serif at 16px. |
| AI discovering ideas | Triple spark-ring + bulb | `.discovery-banner` + `.spark-ring` / `sparkRing` | 1.4s ease-out infinite × 3 (delays 0 / 0.35s / 0.7s). Banner copy: "Searching the canon for resonances…". |
| Idea chip entrance | Pop + stagger | `.detected-tags .idea-chip` / `chipPop` | 420ms cubic-bezier(.22,1.2,.4,1) backwards. Existing per-chip `animation-delay` stagger preserved. |

### 19.9 Safe-area correction on `.capture-screen`
- Padding now reads `calc(env(safe-area-inset-top, 0px) + var(--space-4))` top and `calc(env(safe-area-inset-bottom, 0px) + var(--space-4))` bottom — was previously `calc(var(--safe-top) + var(--space-4))` where `--safe-top` fell back to `0px`, causing the Capture header to sit under the iOS status bar.

### 19.10 Behavioural guardrails
- **No navigation changes.** The four bottom-nav items, the `ui.mobileView` state machine, `src/router.js`, `PolicyLink`, and all `onGoTo*` handlers are untouched. Only presentational markup and CSS changed.
- **No data-shape changes.** `user_profiles.user_tier` still returns `'free'`/`'pro'`; the display layer continues to uppercase. No new tables, no new API calls.
- **Reuse existing utilities.** `timeAgo()` is duplicated from `IndexScreen.jsx` into `RecentlySurfaced.jsx` as a small local helper — both versions stay in sync informally; extract to `src/lib/relativeTime.js` if a third consumer appears.

### 19.11 Capture screen header & FAB speed-dial [SUR-238]
- **Header simplified:** The verbose h1 + avatar block is replaced by a compact row: an X close button (`.capture-close-btn`, `X` phosphor icon, `weight="light"`, navigates to Home) on the left, and a centred `.capture-kicker` label ("CAPTURE MODE"). No avatar on this screen.
- **Bottom nav hidden:** `showBottomNav` in `App.jsx` now excludes `'capture'` and `'note'` (`!['home','capture','note'].includes(ui.mobileView)`), letting the viewfinder fill the full height above the controls.
- **FAB speed-dial (`.capture-fab-wrap`):** The photo-library button on the right of the shutter row is replaced by a gold FAB. Tapping it reveals a vertical speed-dial menu (`.capture-fab-menu`, `role="menu"`) with four items: Home, Index, Profile, and Select Photo. Backdrop click or Escape closes the menu. The FAB itself uses `DotsThreeVertical` (`weight="light"`); each item uses `House`, `ListDashes`, an initials disc, and `ImagesSquare` icons respectively.
- **No `AvatarButton` on `CaptureScreen`:** Removed; profile access is delegated to the FAB menu.

## 20. Reader-Voice & Margin Notes (SUR-523)

The "Margin" is the home for **all reader-voice** content — the reader's own words on a page, as distinct from a printed/typed book quotation. Handwritten margin notes ship first (SUR-84); typed reactions and voice memos will join this family later. The treatment is therefore designed as a source-agnostic **base** plus a per-source **layer**, replacing the SUR-84 first-pass `✍ Margin note` badge + left rule.

### 20.1 Base — the reader-voice mark is an *attribution*, not a texture
- A book note carries author/source in its source slot; a Margin note is a note whose author is **you**. The base mark is a quiet **`— You`** rendered in the same source slot (`.note-source-byline` on `NoteCard`, `.index-note-byline` on `IndexNoteCard`).
- The byline does the semantic work. This encodes the "Margin = home for all reader-voice" IA decision **structurally**: typed/voice reader-content inherits the byline for free and simply skips the handwritten layer.
- The `§` quote-mark ornament (`.note-source-badge::before`) is **suppressed** for the byline — a reader-voice note is not a quotation.
- The byline itself renders in **upright (non-italic)** type. Italic is reserved for the handwritten body (§20.4); do not italicise the byline.

### 20.2 v1 layer — handwritten margins
On top of the base, a note with `source === 'handwritten'` adds:
- **Italic body text** — the reader's hand reads as voice, not print.
- A Phosphor **`Scribble`** icon (`weight="light"`, inline with the byline; ~14px on `NoteCard`, ~12px in the compact `IndexNoteCard`). Consistent with §4 (light/regular weight, pen-drawn look); the smaller inline size is intentional for a label glyph, not an action icon.
- The **cropped handwriting image** displayed alongside the transcription (`.note-ink-crop`).
- Attribution reads **`— You · in the margin`**.

Italic is **flavor, never the sole differentiator** — on a short fragment it is too subtle and overloads the emphasis/quote connotation. If a line is ever dropped to save space, **keep the attribution, drop the italic** — never the reverse.

### 20.3 The ink crop
- Crop retention is **required** for the handwritten layer (resolves SUR-84 open Q3): the ink crop is core to the treatment, not optional decoration. It is stored in the E2EE blob with the child note (reuses SUR-84's note-content encryption path). Capture-side plumbing ships in **SUR-524** (blocked by this ticket).
- The decrypted, in-memory field the card reads is **`note.inkCropDataUrl`** (parallels the existing `imageDataUrl` source-photo field). SUR-524 must populate this name.
- **Nil-crop state (pre-SUR-524 / SUR-84 notes):** existing margin notes have **no stored crop**. The crop slot is **omitted entirely** when `inkCropDataUrl` is absent — never a broken/empty image box. The byline + italic body carry the card on their own until crops are backfilled.
- On `NoteCard` the crop opens the lightbox (reuses `onLightbox`); in the compact `IndexNoteCard` it is a static preview (no lightbox prop is plumbed there).
- **Empty-transcription edge:** if OCR yields no body text, the text node is omitted (not rendered as an italic empty line) so the card never visually collapses — the byline and crop remain.

### 20.4 Reserved / out of scope
- **Left-rule / tinted-edge / full-surface tint are NOT the general reader-voice mark.** The SUR-84 first pass took the left-rule idiom for handwriting; reusing it as the generic mark collides. Held in reserve pending testing.
- **Italic is reserved for reader-voice body content.** Do not introduce italic body text for emphasis or quotation elsewhere in the rendered app — it would dilute the reader-voice signal. (The decrypt-error placeholder "Note currently unavailable" is a system state, not content, and is exempt.)

### 20.5 Parent→child tie-back ("In the margins")
- A printed/typed parent surfaces its reader's margin notes inline under an **"In the margins"** label (`.note-annotations`), derived onto the parent at `user_metadata.user_annotation` (SUR-84). This idiom is kept and the visual link is **strengthened** with the same `Scribble` glyph on the label, tying it to the child cards' mark.
- The **plural** "In the margins" (parent, collective section) is deliberately distinct from the **singular** "in the margin" in the child byline (§20.2): the byline marks one note's provenance, the label gathers a parent's whole collection. The number difference is intentional, not an inconsistency — keep them in their respective registers.
- The section renders **only** when the parent has live annotations — a parent with zero margin notes is unchanged (no regression).

### 20.6 Parity & tokens
- Mobile + desktop parity; existing tokens and motion only — no new colours, radii, or animations. The byline, italic, and crop reuse the established source-slot, body-type, and thumbnail patterns.