'use client'

import * as React from 'react'
import { apiClient } from '@/shared/api'
import type { ApartmentItem } from '@/entities/properties'

interface HomeApartmentsState {
  apartments: ApartmentItem[]
  isLoading: boolean
}

export function useHomeApartments(): HomeApartmentsState {
  const [state, setState] = React.useState<HomeApartmentsState>({
    apartments: [],
    isLoading: true,
  })

  React.useEffect(() => {
    let isMounted = true

    const load = async (): Promise<void> => {
      try {
        const data = await apiClient.get<ApartmentItem[]>(
          '/apartments?format=web'
        )
        if (isMounted) {
          setState({
            apartments: Array.isArray(data) ? data : [],
            isLoading: false,
          })
        }
      } catch (error: unknown) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Failed to load home apartments', error)
        }
        if (isMounted) setState({ apartments: [], isLoading: false })
      }
    }

    void load()
    return (): void => {
      isMounted = false
    }
  }, [])

  return state
}
