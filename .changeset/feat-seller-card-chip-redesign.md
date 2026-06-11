---
"@mitumba/ui": patch
---

feat(seller): redesign STIScoreChip and SellerCard

**STIScoreChip:**
- Replaced cluttered label|score divider with clean dot + number + label layout
- Removed "★" from Trusted label
- Thresholds aligned: 80+ Trusted, 60+ Good, 40+ At Risk, 20+ Flagged, <20 Suspended
- Subtle tinted background, no border

**SellerCard:**
- Removed uppercase 10px metadata — now uses natural sentence: "Nairobi · 48 listings"
- VAZI badge as a subtle earth-toned pill instead of importing full VAZIBadge
- STI chip moved to right side for visual balance
- Removed box-shadow, kept only border (consistent with ListingCard)
- Green border on hover, not elevated shadow
