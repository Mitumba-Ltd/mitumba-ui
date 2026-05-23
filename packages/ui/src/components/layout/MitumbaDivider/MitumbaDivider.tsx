import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'

export function MitumbaDivider() {
  return (
    <Box
      component="hr"
      sx={{
        backgroundColor: tokens.colors.divider,
        border: 'none',
        height: '1px',
        marginBlock: 0,
        width: '100%',
      }}
    />
  )
}

export default MitumbaDivider
