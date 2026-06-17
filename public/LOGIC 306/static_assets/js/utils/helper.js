export function getPointerXY(e) {
  if (e.touches && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }
  return {
    x: e.clientX || 0,
    y: e.clientY || 0,
  }
}

export function dataContentHashId(data) {
  if (!data) return new Date().getTime().toString()

  if (typeof data === 'string') {
    data = { content: data }
  }

  let hash = 0
  const str = JSON.stringify(data)
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

export function normalizeAndValidatePluginUrl(
  url,
  ALLOWED_DOMAIN_FOR_PLUGINS = []
) {
  let urlObj

  // Normalize URL
  try {
    urlObj = new URL(url, window.location.origin)
  } catch {
    ttbl_logger.error(`[PluginListener] Invalid URL: ${url}`)
    return null
  }

  // Block unsafe protocols
  const blockedProtocols = new Set(['javascript:', 'data:', 'file:'])
  if (blockedProtocols.has(urlObj.protocol)) {
    ttbl_logger.error(`[PluginListener] Blocked protocol: ${urlObj.protocol}`)
    return null
  }

  // Domain check
  const allowed = new Set([
    ...ALLOWED_DOMAIN_FOR_PLUGINS,
    window.location.hostname,
  ])

  if (!allowed.has(urlObj.hostname)) {
    ttbl_logger.error(
      `[PluginListener] Load plugin failed: ${urlObj.href} (hostname ${urlObj.hostname}) not allowed.`
    )
    return null
  }

  return urlObj
}

window.dataContentHashId = dataContentHashId
