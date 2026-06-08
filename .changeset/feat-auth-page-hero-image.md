---
"@mitumba/ui": minor
---

feat(auth-page): add heroImageUrl prop + fix Chromatic CI

Adds `heroImageUrl` to `AuthPageProps` — when provided, layers a full-bleed hero
photo under the gradient panel (desktop only) using a brand gradient overlay,
matching the Mitumba marketing site visual language.

Also fixes the Visual Regression (Chromatic) workflow which was failing due to
`storybookBuildDir` pointing to a non-existent pre-built directory.
