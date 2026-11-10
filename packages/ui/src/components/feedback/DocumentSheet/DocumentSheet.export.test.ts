import { describe, expect, it } from 'vitest'
import * as ui from '../../../index'

// The package entry lists its exports by name, so a component exported only from its folder never
// reaches consumers. This guards DocumentSheet's place in the public API.
describe('DocumentSheet public export', () => {
  it('is exported from the @mitumba/ui entry point', () => {
    expect(typeof ui.DocumentSheet).toBe('function')
  })
})
