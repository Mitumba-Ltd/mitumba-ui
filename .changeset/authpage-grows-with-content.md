---
"@mitumba/ui": patch
---

`AuthPage`: the card now grows with its content instead of scrolling inside. The fixed `height` (600px on desktop, `100vh` on mobile) is now a `min-height`, and each form panel is in normal flow rather than absolutely positioned with `overflow-y: auto`. A view taller than the card (for example one with a long `footerActions` block) no longer shows an inner scrollbar. Short views stay vertically centred in the same 600px card, each view keeps its side, and the gradient panel and its transition are unchanged. Props, copy and accessibility semantics are unchanged.
