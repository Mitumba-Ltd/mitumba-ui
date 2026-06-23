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
}
