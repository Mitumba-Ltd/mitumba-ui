---
"@mitumba/ui": minor
---

feat(vazi): add VAZIShowcase — depth-perspective model queue with glassmorphism outfit panel

New component for the VAZI AI stylist feed experience:
- Depth-perspective model queue — models recede into the background with scale,
  opacity, and blur based on their depth position
- Supports .webm (alpha channel) video for living transparent models, with image fallback
- Glassmorphism outfit panel showing items that make up the focused model's outfit
- Scroll-wheel and arrow-driven navigation between outfits
- "Shop this look" CTA with total price
- VAZI branding pill overlay
- Dark full-viewport layout

Also updates COMPONENT_SPEC.md with specs for VAZIModelSpotlight, VAZIOutfitPanel,
and VAZIShowcase (sections 7.6, 7.7, 7.8).
