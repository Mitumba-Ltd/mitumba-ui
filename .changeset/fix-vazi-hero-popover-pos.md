---
"@mitumba/ui": patch
---

fix(vazi-hero): popover appears at click position — like Gmail hover card

Uses a virtual anchor element positioned at the cursor's clientX/clientY
coordinates instead of anchoring to the model element. The popover now
appears exactly where the user clicked.
