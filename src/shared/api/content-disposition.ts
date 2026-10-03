/**
 * Reads the download filename from a `Content-Disposition` header. The value comes from the
 * network, so path segments are stripped and an undecodable value yields `null` (callers then
 * use their own deterministic fallback name).
 */
export function parseContentDispositionFilename(
  header: string | null | undefined
): string | null {
  if (!header) return null

  const extended = /filename\*\s*=\s*([^;]+)/i.exec(header)?.[1]?.trim()
  if (extended) {
    const decoded = decodeExtendedValue(extended)
    if (decoded) return decoded
  }

  const plain = /filename\s*=\s*("([^"]*)"|[^;]+)/i.exec(header)
  const raw = (plain?.[2] ?? plain?.[1])?.trim()
  return raw ? sanitizeFilename(raw) : null
}

function decodeExtendedValue(value: string): string | null {
  // RFC 5987: charset'language'percent-encoded-value
  const encoded = /^[^']*'[^']*'(.*)$/.exec(value)?.[1]
  if (!encoded) return null
  try {
    return sanitizeFilename(decodeURIComponent(encoded))
  } catch {
    return null
  }
}

function sanitizeFilename(value: string): string | null {
  const name = value.split(/[\\/]/).pop()?.trim() ?? ''
  return name.length > 0 && name !== '.' && name !== '..' ? name : null
}
