/**
 * Represents an uploaded image in the uploader.
 */
export interface UploadedImage {
  /** Unique identifier */
  id: string;
  /** Preview URL (local blob) or CDN URL after upload */
  url: string;
  /** Upload status */
  status: 'uploading' | 'done' | 'error';
  /** Whether this is the cover/primary photo (first slot) */
  isPrimary: boolean;
}

export interface ImageUploaderProps {
  /** Current images — managed externally */
  images: UploadedImage[];
  /** Called when user selects files to upload */
  onAdd: (files: File[]) => void;
  /** Called when an image is removed */
  onRemove: (imageId: string) => void;
  /** Called when images are reordered (returns new ID order) */
  onReorder: (newOrder: string[]) => void;
  /** Max images allowed — defaults to 6 */
  maxImages?: number;
  /** Layout variant — 'grid' for listings (default), 'single' for profile/logo */
  variant?: 'grid' | 'single';
  /** Aspect ratio for image slots — defaults to '1 / 1' */
  aspectRatio?: string;
  /** Hint text shown on empty slots */
  hint?: string;
}
