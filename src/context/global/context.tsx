import { Map } from 'leaflet'
import { createContext, useCallback, useMemo, useState } from 'react'

import { BusStop } from '@/types/bus.ts'
import { ChildrenProps } from '@/types/common.ts'
import { Line } from '@/types/global.ts'

export interface GlobalContextStaticValues {
  selectedLine?: Line
  selectedStop?: BusStop
  map?: Map
}

export type SetValueFn<
  K extends keyof GlobalContextStaticValues = keyof GlobalContextStaticValues,
> = (key: K, value: GlobalContextStaticValues[K]) => void

export interface GlobalContextValue<
  K extends keyof GlobalContextStaticValues = keyof GlobalContextStaticValues,
> extends GlobalContextStaticValues {
  setValue: SetValueFn<K>
}

export const GlobalContext = createContext<GlobalContextValue | undefined>(
  undefined,
)

export function GlobalContextProvider({ children }: ChildrenProps) {
  const [state, setState] = useState<GlobalContextStaticValues | undefined>(
    undefined,
  )

  const setValue = useCallback(
    <K extends keyof GlobalContextStaticValues>(
      key: K,
      value: GlobalContextStaticValues[K],
    ) => {
      setState(prev => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

  const value: GlobalContextValue = useMemo(
    () => ({
      ...state,
      setValue,
    }),
    [state, setValue],
  )

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
