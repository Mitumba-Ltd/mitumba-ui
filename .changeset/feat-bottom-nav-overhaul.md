---
"@mitumba/ui": patch
---

feat(bottom-nav): redesign all 6 variants — clean, professional, reference-aligned

Complete rewrite of MobileBottomNav:
- **indicator** — line below active icon (Material 3 reference #5)
- **m3** — pill-shaped bg behind icon, label below
- **expansive** — large rounded bg fills the active tab
- **bubble** — circular bg + label chip below active
- **pill** — tall rounded rect with icon+label
- **pill-horizontal** — inline icon+label pill (compact)

All variants: filled icon for active, outlined for inactive, smooth transitions,
scale-on-tap feedback. Default changed from 'm3' to 'indicator'.
Renamed 'standalone' → 'bubble'. Added 'pill-horizontal'.
