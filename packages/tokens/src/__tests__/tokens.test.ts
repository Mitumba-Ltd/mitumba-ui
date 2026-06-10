import { describe, expect, it } from 'vitest'
import { tokens } from '../index'

describe('tokens', () => {
  it('defines every color as a valid hex string', () => {
    const hexColor = /^#[0-9A-F]{6}$/i
    Object.entries(tokens.colors).forEach(([key, color]) => {
      expect(color, `colors.${key} should be a hex string`).toMatch(hexColor)
    })
  })

  it('includes dark mode surface tokens', () => {
    expect(tokens.colors.backgroundDark).toBeDefined()
    expect(tokens.colors.surfaceDark).toBeDefined()
  })

  it('defines spacing values as positive numbers', () => {
    Object.entries(tokens.spacing).forEach(([key, val]) => {
      expect(typeof val, `spacing.${key}`).toBe('number')
      expect(val, `spacing.${key}`).toBeGreaterThan(0)
    })
  })

  it('defines radius values as non-negative numbers', () => {
    Object.entries(tokens.radius).forEach(([key, val]) => {
      expect(typeof val, `radius.${key}`).toBe('number')
      expect(val, `radius.${key}`).toBeGreaterThanOrEqual(0)
    })
  })

  it('defines breakpoints in ascending order', () => {
    const vals = Object.values(tokens.breakpoints)
    for (let i = 1; i < vals.length; i += 1) {
      expect(vals[i], `breakpoints[${i}]`).toBeGreaterThan(vals[i - 1])
    }
  })

  it('defines font sizes in ascending order', () => {
    const vals = Object.values(tokens.typography.fontSizes)
    for (let i = 1; i < vals.length; i += 1) {
      expect(vals[i], `fontSizes[${i}]`).toBeGreaterThanOrEqual(vals[i - 1])
    }
  })

  it('defines shadows as valid CSS box-shadow strings', () => {
    Object.entries(tokens.shadows).forEach(([key, val]) => {
      expect(typeof val, `shadows.${key}`).toBe('string')
      expect(val.length, `shadows.${key} should not be empty`).toBeGreaterThan(0)
    })
  })

  it('defines z-index as ascending scale', () => {
    expect(tokens.zIndex.base).toBe(0)
    expect(tokens.zIndex.sticky).toBeLessThan(tokens.zIndex.fixed)
    expect(tokens.zIndex.fixed).toBeLessThan(tokens.zIndex.modal)
    expect(tokens.zIndex.modal).toBeLessThan(tokens.zIndex.max)
  })

  it('defines motion duration and easing tokens', () => {
    expect(tokens.motion.durations.normal).toBe('250ms')
    expect(tokens.motion.easings.standard).toContain('cubic-bezier')
    expect(tokens.motion.transitions.fade).toContain('opacity')
  })
})
