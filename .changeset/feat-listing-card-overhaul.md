---
"@mitumba/ui": minor
---

feat(listing-card): complete overhaul — Pinterest/Depop-style card

Breaking change to ListingCard props interface. The previous version had an
over-engineered multi-image carousel with "Buy Now" CTA. The new version is
minimal and masonry-friendly:

- No fixed height — image takes natural aspect ratio
- Single imageUrl instead of images array
- Rounded corners, subtle border, no box-shadow elevation
- Title truncated to 2 lines via -webkit-line-clamp
- Price bold below title in KES format
- Store name as optional caption
- Wishlist heart icon top-right overlay (toggleable via onSaveToggle)
- Condition chip bottom-left overlay (only if passed)
- Works in CSS grid/masonry without breaking
- Uses motion tokens for transitions
