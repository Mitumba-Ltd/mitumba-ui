---
"@mitumba/ui": patch
---

fix(auth-page): set explicit white background on TextField inputs

All form panels are in the DOM simultaneously (opacity/pointerEvents approach).
Without an explicit background, inactive panels bleed through the transparent
input backgrounds causing a grey tint on the sign-in inputs. Fixed by setting
`bgcolor: tokens.colors.surface` on all TextField MuiInputBase-root elements.

Closes #127
