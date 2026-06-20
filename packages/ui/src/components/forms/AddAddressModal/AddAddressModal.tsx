import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { tokens } from '@mitumba/tokens'
import { MitumbaModal } from '../../feedback/MitumbaModal'
import { MitumbaTextField } from '../../foundation/MitumbaTextField'
import { MitumbaSelect } from '../../foundation/MitumbaSelect'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type { AddAddressModalProps, AddressFormData } from './AddAddressModal.types'

const KENYA_COUNTIES = [
  'Baringo','Bomet','Bungoma','Busia','Elgeyo-Marakwet','Embu','Garissa',
  'Homa Bay','Isiolo','Kajiado','Kakamega','Kericho','Kiambu','Kilifi',
  'Kirinyaga','Kisii','Kisumu','Kitui','Kwale','Laikipia','Lamu','Machakos',
  'Makueni','Mandera','Marsabit','Meru','Migori','Mombasa',"Murang'a",
  'Nairobi','Nakuru','Nandi','Narok','Nyamira','Nyandarua','Nyeri',
  'Samburu','Siaya','Taita-Taveta','Tana River','Tharaka-Nithi','Trans Nzoia',
  'Turkana','Uasin Gishu','Vihiga','Wajir','West Pokot',
]

const COUNTY_OPTIONS = KENYA_COUNTIES.map((c) => ({ label: c, value: c }))

/**
 * AddAddressModal — inline delivery address form built on MitumbaModal.
 * Used during checkout so users don't leave the page to add an address.
 */
export function AddAddressModal({
  open,
  onClose,
  onSave,
  saving = false,
  error,
  isFirstAddress = false,
}: AddAddressModalProps) {
  const [form, setForm] = React.useState<AddressFormData>({
    label: '',
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    county: '',
    isDefault: isFirstAddress,
  })
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})

  const set = (field: keyof AddressFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const errors: Record<string, string> = {}
  if (!form.label.trim()) errors.label = 'Label is required'
  if (!form.fullName.trim()) errors.fullName = 'Full name is required'
  if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 9) errors.phone = 'Enter a valid phone number'
  if (!form.line1.trim()) errors.line1 = 'Address line 1 is required'
  if (!form.city.trim()) errors.city = 'City is required'
  if (!form.county) errors.county = 'Please select a county'

  const isValid = Object.keys(errors).length === 0

  const handleSave = () => {
    if (!isValid) {
      setTouched({ label: true, fullName: true, phone: true, line1: true, city: true, county: true })
      return
    }
    onSave(form)
  }

  return (
    <MitumbaModal
      open={open}
      onClose={onClose}
      title="Add Delivery Address"
      subtitle="Where should we deliver your items?"
      loading={saving}
      maxWidth={500}
      actions={
        <MitumbaPrimaryButton
          label="Save Address"
          onClick={handleSave}
          loading={saving}
          disabled={saving}
          fullWidth
        />
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.base}px` }}>
        {error && (
          <Typography
            sx={{
              color: tokens.colors.error,
              fontSize: tokens.typography.fontSizes.sm,
              fontFamily: tokens.typography.fontFamily,
              bgcolor: tokens.colors.errorLight,
              px: `${tokens.spacing.base}px`,
              py: `${tokens.spacing.sm}px`,
              borderRadius: `${tokens.radius.md}px`,
            }}
          >
            {error}
          </Typography>
        )}

        <MitumbaTextField
          label="Label"
          hint='e.g. "Home", "Office"'
          value={form.label}
          onChange={set('label')}
          error={touched.label ? errors.label : undefined}
        />

        <MitumbaTextField
          label="Full name"
          hint="Recipient name"
          value={form.fullName}
          onChange={set('fullName')}
          error={touched.fullName ? errors.fullName : undefined}
        />

        <MitumbaTextField
          label="Phone number"
          hint="0712 345 678"
          value={form.phone}
          onChange={set('phone')}
          error={touched.phone ? errors.phone : undefined}
        />

        <MitumbaTextField
          label="Address line 1"
          hint="Street, building"
          value={form.line1}
          onChange={set('line1')}
          error={touched.line1 ? errors.line1 : undefined}
        />

        <MitumbaTextField
          label="Address line 2"
          hint="Apartment, suite (optional)"
          value={form.line2}
          onChange={set('line2')}
        />

        <MitumbaTextField
          label="City / Town"
          hint="e.g. Westlands, Kisumu CBD"
          value={form.city}
          onChange={set('city')}
          error={touched.city ? errors.city : undefined}
        />

        <MitumbaSelect
          label="County"
          value={form.county}
          onChange={(val) => { set('county')(val as string); setTouched((p) => ({ ...p, county: true })) }}
          options={COUNTY_OPTIONS}
          placeholder="Select county"
          error={touched.county ? errors.county : undefined}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={form.isDefault}
              onChange={(e) => setForm((prev) => ({ ...prev, isDefault: e.target.checked }))}
              sx={{ color: tokens.colors.green, '&.Mui-checked': { color: tokens.colors.green } }}
            />
          }
          label={
            <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textSecondary, fontFamily: tokens.typography.fontFamily }}>
              Set as default delivery address
            </Typography>
          }
        />
      </Box>
    </MitumbaModal>
  )
}

export default AddAddressModal
