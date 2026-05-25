export const shadows = {
  // Physicality (Benchmark alignment)
  card: '0px 1px 3px rgba(0,0,0,0.06), 0px 1px 2px rgba(0,0,0,0.12)', // Subtle
  elevated: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)', // Medium
  deep: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)', // Authoritative
  bottomSheet: '0px -4px 24px rgba(0,0,0,0.08)',
  
  // Interaction
  focus: '0 0 0 3px rgba(61,154,82,0.25)',
  green: '0 8px 20px rgba(61, 154, 82, 0.2)', // Tinted shadow for green elements
  earth: '0 8px 20px rgba(160, 98, 53, 0.2)', // Tinted shadow for earth elements
} as const
