---
"@mitumba/ui": minor
---

Add `DocumentSheet`, a document (PDF) viewer in a sheet that slides in from the right:
- full width on phones and 720px from `md` up, at full height, with the document scrolling inside;
- a header with the title and subtitle, plus Download (saved as `filename`), Open in new tab, and Close (also on Escape and backdrop click);
- `loading` shows a skeleton, and `error` shows the message with Retry;
- a labelled modal dialog, with focus kept inside while open and returned on close.
