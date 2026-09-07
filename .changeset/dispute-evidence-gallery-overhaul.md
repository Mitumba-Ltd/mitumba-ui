---
"@mitumba/ui": minor
---

feat(dispute-evidence-gallery): comprehensive overhaul — click-to-expand image/video lightbox (built on MitumbaModal with prev/next), responsive thumbnail grid, "no dead ends" empty state, uploader-role color + avatar cues, per-group item counts and friendly timestamp formatting, and widened evidence types to support `file` (downloadable link) and `video` (inline player) alongside `image` and `text`.

New optional API is additive and backward compatible: added optional `emptyText?` (gallery) and `fileName?` (item); the `DisputeEvidenceItem['type']` union is widened to `'image' | 'text' | 'file' | 'video'`. No required prop added, none removed; existing `image`/`text` usage is unaffected.

Rationale for minor (not patch): adds new optional props and widens a public type union — additive, backward compatible.
