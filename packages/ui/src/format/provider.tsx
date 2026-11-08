import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_FORMAT } from './defaults'
import type { MitumbaFormat, MoneyFormat, PhoneFormat, RegionFormat } from './types'

const MitumbaFormatContext = createContext<MitumbaFormat>(DEFAULT_FORMAT)

export interface MitumbaFormatProviderProps {
  /** Currency and locale for every money component and date. Defaults to KES / en-KE. */
  money?: MoneyFormat
  /** Calling code, national length and example for every phone field. Defaults to +254, 9 digits. */
  phone?: PhoneFormat
  /** Label and options for every region picker. Defaults to County and the built-in list. */
  region?: RegionFormat
  /** Content that should format with these settings. */
  children: ReactNode
}

/**
 * Sets how money, phone numbers and regions are formatted for everything inside it. Each field is
 * optional: an omitted one keeps the enclosing provider's value, or the documented default.
 */
export function MitumbaFormatProvider({ money, phone, region, children }: MitumbaFormatProviderProps) {
  const parent = useContext(MitumbaFormatContext)
  const value = useMemo<MitumbaFormat>(
    () => ({
      money: money ?? parent.money,
      phone: phone ?? parent.phone,
      region: region ?? parent.region,
    }),
    [money, phone, region, parent],
  )
  return <MitumbaFormatContext.Provider value={value}>{children}</MitumbaFormatContext.Provider>
}

/** The formatting in effect here: the nearest provider's, or the documented defaults. */
export function useMitumbaFormat(): MitumbaFormat {
  return useContext(MitumbaFormatContext)
}
