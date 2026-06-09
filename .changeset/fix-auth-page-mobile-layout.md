---
"@mitumba/ui": patch
---

fix(auth-page): fixed viewport frame on mobile — no more vertical scrolling

All form panels are now `position: absolute` on all breakpoints. The card uses
`height: 100vh` on mobile instead of `height: auto`, making it a fixed
full-viewport frame. Views fade in/out within the fixed frame — nothing scrolls.
Matches the stanlink-ui reference implementation.

Closes #130
