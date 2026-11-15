---
"@mitumba/ui": minor
---

Add `NotificationItem` and `NotificationBell`:
- `NotificationItem` is one row of a notification feed. It shows:
  - a category icon, the title (one line), the body, and the time ("5 min ago", with the full time as the element's title);
  - an unread marker, and "×N" when several events were collapsed into the row;
  - up to two action buttons, at least 44 px tall.
  - The whole row can be a link (`link`). The row link and the actions call `onNavigate`, and an action never also triggers the row.
- `NotificationBell` is the bell icon with the unread badge:
  - the badge is hidden at 0 and shows "99+" above 99;
  - it has a polite live region for count changes;
  - it renders as a button (`onClick`) or a link (`href`, optionally through a router `linkComponent`).
- Exports `NotificationLink`, `NotificationAction` and `NotificationCategory`.
