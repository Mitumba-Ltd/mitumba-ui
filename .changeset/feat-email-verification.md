---
"@mitumba/ui": minor
---

feat(layout): add EmailVerificationPage — post-signup email verification

Split-layout page (hero left, form right on desktop, form-only on mobile).
Features:
- Green-tinted email icon
- Large 6-digit code input (MitumbaTextField, monospace, centered)
- "Verify" button disabled until 6 digits
- Resend link with 60s countdown timer after tap
- "Wrong email? Go back" link
- Inline error via MitumbaTextField error prop
- Resend success Alert
- heroImageUrl support (same as AuthPage)
