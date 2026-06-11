---
"@mitumba/ui": minor
---

feat(image-uploader): complete overhaul — Depop/Vinted-style

Rebuilt ImageUploader from scratch:
- Grid variant: 3-column layout with cover photo badge on first slot,
  drag-to-reorder, circular progress on uploading, error overlay,
  remove button on hover, dashed empty slots with camera icon
- Single variant: one large drop zone for profile photos/logos/banners
  with configurable aspect ratio
- Clean counter: "2/6 photos · Drag to reorder · First photo is the cover"
- Uses motion tokens for transitions
- 8 stories: Default (interactive), Empty, WithUploading, WithError,
  SingleVariant, SingleWithImage, Mobile
- 5 unit tests
