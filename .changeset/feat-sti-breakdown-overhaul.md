---
"@mitumba/ui": patch
---

feat(sti-breakdown): redesign with circular score ring, color-coded status, trending event icons

- Large circular progress ring showing score/100 with dynamic color (green/blue/orange/red)
- Score label below ring: Trusted / Good / At Risk / Flagged
- Clean factor bars with token-based colors
- Recent events with circular icon badges (trending up/down), timestamps, point changes
- Separated sections with divider
- Removed STIScoreChip dependency — self-contained
