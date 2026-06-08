---
"@mitumba/ui": minor
---

feat(auth-page): add AuthPage unified authentication component + heroImageUrl variant

Adds the AuthPage component — a unified sign-in, sign-up, forgot-password, and
reset-password screen with animated trapezoid panel, social auth support, dark
mode, illustration slot, and footer actions. Includes AuthSubmitButton, a
type=submit button primitive used internally by auth forms.

Also adds the `heroImageUrl` prop — layers a full-bleed hero photo under the
gradient panel (desktop only), matching the Mitumba marketing site visual language.
