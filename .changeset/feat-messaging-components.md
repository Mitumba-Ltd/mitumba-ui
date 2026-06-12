---
"@mitumba/ui": minor
---

feat(messaging): add ConversationList, MessageBubble, ChatThread, InboxLayout

Full messaging component suite for buyer-seller communication:

- **ConversationList** — left panel with search, compose button, conversation
  rows (avatar, name, last message, timestamp, unread dot, listing chip)
- **MessageBubble** — individual message (sent=green right, received=grey left)
  with file/image attachment support
- **ChatThread** — scrollable message thread with header (name, status) and
  input bar (attach + send buttons)
- **InboxLayout** — responsive split-panel shell (340px list | flex thread on
  desktop, single panel with back button on mobile)

Closes #168, closes #169, closes #170, closes #171
