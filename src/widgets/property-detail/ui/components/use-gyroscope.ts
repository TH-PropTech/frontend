'use client'

import * as React from 'react'

interface UseGyroscopeProps {
  lonRef: React.MutableRefObject<number>
  latRef: React.MutableRefObject<number>
  isUserInteractingRef: React.MutableRefObject<boolean>
  isEnabled: boolean
}

interface UseGyroscopeResult {
  isSupported: boolean
  isActive: boolean
  requestPermission: () => Promise<void>
}

const GYRO_SENSITIVITY = 0.4

export function useGyroscope({
  lonRef,
  latRef,
  isUserInteractingRef,
  isEnabled,
}: UseGyroscopeProps): UseGyroscopeResult {
  const [isSupported] = React.useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      typeof DeviceOrientationEvent !== 'undefined'
  )
  const [isActive, setIsActive] = React.useState(false)

  const lastBetaRef = React.useRef<number | null>(null)
  const lastGammaRef = React.useRef<number | null>(null)

  const handleOrientation = React.useCallback(
    (event: DeviceOrientationEvent): void => {
      const beta = event.beta
      const gamma = event.gamma

      if (beta === null || gamma === null) return

      if (lastBetaRef.current === null || lastGammaRef.current === null) {
        lastBetaRef.current = beta
        lastGammaRef.current = gamma
        return
      }

      const deltaBeta = beta - lastBetaRef.current
      const deltaGamma = gamma - lastGammaRef.current

      lastBetaRef.current = beta
      lastGammaRef.current = gamma

      latRef.current = Math.max(
        -85,
        Math.min(85, latRef.current + deltaBeta * GYRO_SENSITIVITY)
      )
      lonRef.current = lonRef.current - deltaGamma * GYRO_SENSITIVITY
      isUserInteractingRef.current = true
    },
    [lonRef, latRef, isUserInteractingRef]
  )

  React.useEffect(() => {
    if (!isEnabled || !isActive) {
      isUserInteractingRef.current = false
      lastBetaRef.current = null
      lastGammaRef.current = null
      return
    }

    window.addEventListener('deviceorientation', handleOrientation, true)
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
      isUserInteractingRef.current = false
      lastBetaRef.current = null
      lastGammaRef.current = null
    }
  }, [isEnabled, isActive, handleOrientation, isUserInteractingRef])

  const requestPermission = React.useCallback(async (): Promise<void> => {
    if (!isSupported) return

    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied' | 'default'>
    }

    if (typeof DOE.requestPermission === 'function') {
      try {
        const permission = await DOE.requestPermission()
        if (permission === 'granted') {
          setIsActive(prev => !prev)
        } else {
          console.warn('Gyroscope permission denied by user.')
        }
      } catch (err) {
        console.error('DeviceOrientationEvent.requestPermission failed:', err)
      }
    } else {
      setIsActive(prev => !prev)
    }
  }, [isSupported])

  return { isSupported, isActive, requestPermission }
}
