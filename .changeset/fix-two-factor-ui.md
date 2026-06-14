---
"@mitumba/ui": patch
---

fix(two-factor): redesign both 2FA components — proper spacing, MitumbaTextField, polished UX

TwoFactorLoginStep:
- Green-tinted icon circle (not grey)
- Generous padding (huge on desktop)
- MitumbaTextField for code input with large monospace styling
- Proper visual hierarchy matching AuthPage language

TwoFactorSetupModal:
- Centered step indicators with checkmarks for completed
- QR code on subtle background card for prominence
- MitumbaTextField for code input
- Backup codes in properly spaced grid with monospace + background
- "Done" button to close after saving codes
- Consistent token usage throughout
