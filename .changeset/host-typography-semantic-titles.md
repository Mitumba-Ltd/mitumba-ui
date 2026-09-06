---
"@mitumba/ui": minor
---

feat(ui): host-controlled typography + package-wide semantic title/destination API (#251)

Host-controlled typography: components no longer hardcode a font family, so a host MUI theme can supply distinct heading vs body families. The default `mitumbaTheme` appearance is unchanged. Monospace is retained only for code-like data (OTP inputs, the TOTP secret and backup codes, and the destructive confirm phrase).

New optional semantic-title API: `titleLevel` on title-owning components emits `h1`–`h6` without changing the visual size, plus slot-specific `stepTitleLevel`, `sectionTitleLevel`, and `emptyTitleLevel` where a component owns more than one title.

New optional `SemanticDestinationProps` (`href`, `linkComponent`) for navigation items and interactive cards: renders a link with `href`, a button with a callback only, or a noninteractive surface with neither; interactive cards isolate nested actions.

A documented direct-to-transitive typography/semantics matrix (`docs/typography-semantic-matrix.md`).

Backward compatible: every new prop is optional, no required prop was added, none removed; existing consumers omitting the new props keep current rendering and callbacks. Upgrade is drop-in: the next minor after 0.33.1.
