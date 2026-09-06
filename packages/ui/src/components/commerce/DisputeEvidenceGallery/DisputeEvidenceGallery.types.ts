import type { HeadingLevel } from '../../../types/semantic'

export interface DisputeEvidenceItem {
  /** Role of the person who uploaded this evidence */
  uploader_role: 'buyer' | 'seller' | 'admin'
  /** Type of evidence content */
  type: 'image' | 'text'
  /** Image URL or text content */
  content: string
  /** ISO timestamp of when this evidence was submitted */
  created_at: string
}

export interface DisputeEvidenceGalleryProps {
  /** Array of evidence items */
  evidence: DisputeEvidenceItem[]
  /**
   * Emits h1-h6 for each uploader-role group title when provided; omitting it
   * preserves the current default h3 group headings. Visual size/weight are
   * unaffected.
   */
  titleLevel?: HeadingLevel
}
