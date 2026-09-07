import type { HeadingLevel } from '../../../types/semantic'

/** Role of the person who uploaded a piece of dispute evidence. */
export type DisputeUploaderRole = 'buyer' | 'seller' | 'admin'

/**
 * Kind of evidence content. `image`/`text` are the original types; `file` and
 * `video` were added additively so a gallery can also represent downloadable
 * documents and playable clips.
 */
export type DisputeEvidenceType = 'image' | 'text' | 'file' | 'video'

export interface DisputeEvidenceItem {
  /** Role of the person who uploaded this evidence. */
  uploader_role: DisputeUploaderRole
  /**
   * Type of evidence content. `image` renders a thumbnail, `text` a quoted
   * blockquote, `file` a downloadable link affordance, `video` a playable clip.
   */
  type: DisputeEvidenceType
  /**
   * The evidence payload: an image/video/file URL for media types, or the raw
   * message for `text`.
   */
  content: string
  /** ISO timestamp (or already-formatted string) of when this evidence was submitted. */
  created_at: string
  /**
   * Optional human-friendly label for `file` evidence (shown as the link text)
   * and used as the accessible caption for `video`. Defaults are derived from
   * the content URL when omitted.
   */
  fileName?: string
}

export interface DisputeEvidenceGalleryProps {
  /** Array of evidence items. Grouped by uploader role for display. */
  evidence: DisputeEvidenceItem[]
  /**
   * Emits h1-h6 for each uploader-role group title when provided; omitting it
   * preserves the current default h3 group headings. Visual size/weight are
   * unaffected.
   */
  titleLevel?: HeadingLevel
  /**
   * Message shown when `evidence` is empty. Defaults to a friendly
   * "No evidence has been submitted for this dispute yet." string.
   */
  emptyText?: string
}
