import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { tokens } from '@mitumba/tokens'
import { MitumbaModal } from '../../feedback/MitumbaModal'
import { MitumbaSelect } from '../../foundation/MitumbaSelect'
import { MitumbaTextField } from '../../foundation/MitumbaTextField'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type {
  RaiseDisputeModalProps,
  DisputeReason,
  DesiredResolution,
} from './RaiseDisputeModal.types'

const REASON_OPTIONS = [
  { value: 'not_received', label: 'Item not received' },
  { value: 'not_as_described', label: 'Not as described' },
  { value: 'damaged', label: 'Item arrived damaged' },
  { value: 'counterfeit', label: 'Counterfeit item' },
  { value: 'wrong_item', label: 'Wrong item sent' },
]

const RESOLUTION_OPTIONS: { value: DesiredResolution; label: string }[] = [
  { value: 'refund', label: 'Refund' },
  { value: 'replacement', label: 'Replacement' },
  { value: 'partial_refund', label: 'Partial Refund' },
]

const MAX_FILES = 6
const MIN_DESC = 10
const MAX_DESC = 2000

/**
 * Modal for buyers to raise a dispute on an order.
 */
export function RaiseDisputeModal({
  open,
  onClose,
  orderShortId,
  onSubmit,
  submitting = false,
}: RaiseDisputeModalProps) {
  const [reason, setReason] = useState<DisputeReason | ''>('')
  const [description, setDescription] = useState('')
  const [resolution, setResolution] = useState<DesiredResolution | ''>('')
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const descLength = description.length
  const isValid =
    reason !== '' &&
    descLength >= MIN_DESC &&
    descLength <= MAX_DESC &&
    resolution !== ''

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files
    if (!selected) return
    const newFiles = Array.from(selected).slice(0, MAX_FILES - files.length)
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f))
    setFiles((prev) => [...prev, ...newFiles])
    setPreviews((prev) => [...prev, ...newPreviews])
    e.target.value = ''
  }

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index])
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!isValid) return
    onSubmit({
      reason: reason as DisputeReason,
      description,
      desired_resolution: resolution as DesiredResolution,
      evidence_files: files,
    })
  }

  return (
    <MitumbaModal
      open={open}
      onClose={onClose}
      title="Raise a Dispute"
      subtitle={`Order #${orderShortId}`}
      loading={submitting}
      actions={
        <MitumbaPrimaryButton
          label="Submit Dispute"
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          loading={submitting}
          fullWidth
        />
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
        {/* Reason */}
        <MitumbaSelect
          label="Reason"
          placeholder="Select a reason"
          value={reason}
          options={REASON_OPTIONS}
          onChange={(v) => setReason(v as DisputeReason)}
        />

        {/* Description */}
        <Box>
          <MitumbaTextField
            label="Description"
            hint="Describe the issue in detail"
            value={description}
            onChange={setDescription}
            multiline
            rows={4}
            error={
              // eslint-disable-next-line no-nested-ternary
              descLength > 0 && descLength < MIN_DESC
                ? `Minimum ${MIN_DESC} characters`
                : descLength > MAX_DESC
                  ? `Maximum ${MAX_DESC} characters`
                  : undefined
            }
          />
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xs,
              color: tokens.colors.textSecondary,
              textAlign: 'right',
              mt: '4px',
            }}
          >
            {descLength}/{MAX_DESC}
          </Typography>
        </Box>

        {/* Desired Resolution */}
        <Box>
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              fontWeight: tokens.typography.fontWeights.medium,
              color: tokens.colors.textPrimary,
              mb: `${tokens.spacing.xs}px`,
            }}
          >
            Desired Resolution
          </Typography>
          <Box sx={{ display: 'flex', gap: `${tokens.spacing.xs}px` }}>
            {RESOLUTION_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                onClick={() => setResolution(opt.value)}
                sx={{
                  flex: 1,
                  textTransform: 'none',
                  borderRadius: `${tokens.radius.md}px`,
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.fontSizes.sm,
                  fontWeight: tokens.typography.fontWeights.medium,
                  py: 1,
                  border: `1.5px solid ${resolution === opt.value ? tokens.colors.green : tokens.colors.divider}`,
                  bgcolor: resolution === opt.value ? tokens.colors.greenLight : 'transparent',
                  color: resolution === opt.value ? tokens.colors.green : tokens.colors.textPrimary,
                  '&:hover': {
                    bgcolor: tokens.colors.greenLight,
                    borderColor: tokens.colors.green,
                  },
                }}
              >
                {opt.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Evidence Upload */}
        <Box>
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              fontWeight: tokens.typography.fontWeights.medium,
              color: tokens.colors.textPrimary,
              mb: `${tokens.spacing.xs}px`,
            }}
          >
            Evidence (optional)
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: `${tokens.spacing.sm}px` }}>
            {previews.map((src, i) => (
              <Box
                key={src}
                sx={{
                  position: 'relative',
                  width: 64,
                  height: 64,
                  borderRadius: `${tokens.radius.sm}px`,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`Evidence ${i + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <IconButton
                  aria-label={`Remove image ${i + 1}`}
                  onClick={() => removeFile(i)}
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    p: 0.25,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: '#fff',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            ))}
            {files.length < MAX_FILES && (
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: `${tokens.radius.sm}px`,
                  border: `1.5px dashed ${tokens.colors.divider}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover': { borderColor: tokens.colors.green },
                }}
              >
                <AddPhotoAlternateIcon sx={{ color: tokens.colors.textSecondary, fontSize: 24 }} />
              </Box>
            )}
          </Box>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </Box>

        {/* Reassurance */}
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.xs,
            color: tokens.colors.textSecondary,
            textAlign: 'center',
            mt: `${tokens.spacing.sm}px`,
          }}
        >
          Your funds stay safely held until this is resolved.
        </Typography>
      </Box>
    </MitumbaModal>
  )
}

export default RaiseDisputeModal
