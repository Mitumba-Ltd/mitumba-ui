---
"@mitumba/ui": patch
---

fix(auth-page): export AuthPage and AuthPageProps from package index

AuthPage and AuthPageProps were missing from the top-level barrel export,
making them inaccessible to consumers of @mitumba/ui.
