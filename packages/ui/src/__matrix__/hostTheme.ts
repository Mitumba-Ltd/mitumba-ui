import { createTheme } from '@mui/material/styles';
import { mitumbaTheme } from '../theme';

/**
 * Shared test host theme with deliberately DIFFERENT heading and body font
 * families. Consumers of the matrix/contract tests import this to prove that:
 *  - ordinary body text inherits `typography.fontFamily` (the body family), and
 *  - semantic headings (h1-h6 emitted via `titleLevel`) can pick up a distinct
 *    heading family independently.
 *
 * Because no @mitumba/ui component sets a local `fontFamily` on ordinary text
 * anymore, rendering under this theme yields the host families with no inline
 * override (the rendered element's inline `style.fontFamily` stays empty and
 * the family is resolved from the theme).
 */
export const HOST_BODY_FONT = '"Comic Sans MS", cursive';
export const HOST_HEADING_FONT = '"Times New Roman", serif';

/**
 * A host theme whose heading family differs from its body family. Heading
 * variants (h1-h6) get {@link HOST_HEADING_FONT}; everything else inherits
 * {@link HOST_BODY_FONT}.
 */
export const hostThemeWithDistinctFamilies = createTheme(mitumbaTheme, {
  typography: {
    fontFamily: HOST_BODY_FONT,
    h1: { fontFamily: HOST_HEADING_FONT },
    h2: { fontFamily: HOST_HEADING_FONT },
    h3: { fontFamily: HOST_HEADING_FONT },
    h4: { fontFamily: HOST_HEADING_FONT },
    h5: { fontFamily: HOST_HEADING_FONT },
    h6: { fontFamily: HOST_HEADING_FONT },
  },
});
