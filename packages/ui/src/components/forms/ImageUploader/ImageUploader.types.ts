/**
 * Represents an uploaded image in the uploader.
 */
export interface UploadedImage {
  /** Unique identifier for the image. */
  id: string
  /** Preview URL or R2 URL after upload. */
  url: string
  /** Current upload status. */
  status: 'uploading' | 'done' | 'error'
  /** Whether this image is the primary/cover photo. */
  isPrimary: boolean
}

/**
 * Props for the ImageUploader component.
 */
export interface ImageUploaderProps {
  /** List of currently uploaded images. */
  images: UploadedImage[]
  /** Called when files are selected for upload. */
  onAdd: (files: File[]) => void
  /** Called when an image is removed. */
  onRemove: (imageId: string) => void
  /** Called when images are reordered. */
  onReorder: (newOrder: string[]) => void
  /** Maximum number of images allowed. */
  maxImages?: number
  /** Whether images are currently being uploaded. */
  uploading?: boolean
}
