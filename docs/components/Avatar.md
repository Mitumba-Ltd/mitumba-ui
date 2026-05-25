# Avatar — Mitumba UI Component Specification

The Mitumba UI Avatar is a high-end, "living" primitive designed to provide rich visual feedback and versatile identity representation. It moves beyond standard flat images by incorporating 3D physicality, tactile interactivity, and a comprehensive set of state indicators.

## 1. Types of Avatars
The component supports three primary visual modes:
*   **Blank (Placeholder):** Renders a standardized, professional placeholder icon (MUI Person icon) inside the avatar when no identity data is available.
*   **Initials:** Automatically extracts and renders initials from a display name. 
    *   *Logic:* Isaac Stanley becomes "IS".
*   **Image:** Uses a photo from a provided URL.

## 2. Action To Call
Involves having icons on the side of the avatar (preferably bottom right) to show which action will take place when the avatar/icon is clicked.
*   **Examples:** A camera icon, a "+" icon, a pencil icon, etc.

## 3. Notification Labels
Numeric or colored badges positioned at the top right of the avatar.
*   **Examples:** "1", "2", "3", etc. Can be of different colors.

## 4. Online or Offline Status
Presence indicators displayed as medium-sized dots, usually at the bottom right.
*   **Online:** Green color to show the user is online.
*   **Offline:** Gray color for offline.

## 5. Text on the Side of Avatar
Used for additional info displayed to the right of the avatar.
*   **Structure:** Name (e.g., Isaac Stanley) on top, lighter text below showing "Online" (green) or "10 mins ago"/"Offline" (grey).
*   **Integration:** The avatar on the left also maintains its individual indicators.

## 6. Text at the Bottom
Similar to side text, but positioned directly beneath the avatar.
*   **Note:** In this mode, online/offline indicators on the avatar itself are typically omitted.

## 7. Indicate the New Event
Visual cues for new events.
*   **Animated Border:** A colored border added around the avatar that spins once in an animation of dots that become a continuous line.
*   **Counter Badge:** A numeric badge indicating the event count.
*   **Requirement:** We need both variants.

## 8. To Show Progress
A stroke added to the avatar to visualize metrics like profile completeness.
*   **Example:** An avatar with an image, name below, and lighter colored text saying "90% complete".

## 9. Selected State
Visual confirmation of a selected state using a combination of a tick icon and a stroke.

## 10. Stacked Avatars
A layout that shows multiple avatars in less space by stacking/overlapping them.

## 11. Stacked Avatars with Button
A circular CTA button at the end of a stack, sized identically to the avatars and integrated into the stack.
*   **Usage:** Lets users know about a certain action available from the group.

## 12. Stacked Avatars with Badge
A numeric badge at the end of a stack (e.g., "+5") to indicate the number of users remaining in a queue.

---

## Interactive Physics
*   **3D Perspective:** The entire avatar (including all badges and indicators) exists in a 3D container.
*   **Hover Behavior:** Rotates on the Y and X axes while scaling up.
*   **Spring Transition:** Uses a premium spring-like transition for a non-robotic feel.
*   **Active State:** Physically compresses on click for tactile confirmation.
