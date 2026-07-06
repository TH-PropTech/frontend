'use client'

import * as React from 'react'

type Platform = 'desktop' | 'mobile-web' | 'mobile-app'

interface WebViewFeatureFlags {
  platform: Platform
  enableMouseTracking: boolean
  enableTTS: boolean
  enableVoiceCommand: boolean
}

/**
 * Platform detection hook — identifies desktop, mobile-web, or mobile-app (WebView).
 * Returns feature flags for disabling incompatible features in each environment.
 */
export function usePlatform(): WebViewFeatureFlags {
  const [platform, setPlatform] = React.useState<Platform>('desktop')

  React.useEffect(() => {
    // Check React Native WebView
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).ReactNativeWebView) {
      setPlatform('mobile-app')
      return
    }
    const mq = window.matchMedia('(max-width: 767px)')
    const update = (): void => setPlatform(mq.matches ? 'mobile-web' : 'desktop')
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const isWebView = platform === 'mobile-app'
  const isSpeechSupported = typeof window !== 'undefined'
    && Boolean((window as unknown as Record<string, unknown>).SpeechRecognition
      || (window as unknown as Record<string, unknown>).webkitSpeechRecognition)

  return {
    platform,
    enableMouseTracking: !isWebView,
    enableTTS: !isWebView,
    enableVoiceCommand: !isWebView && isSpeechSupported,
  }
}
