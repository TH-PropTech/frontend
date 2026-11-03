interface NamedPlace {
  name: string
}

// Administrative prefixes printed on cards and used by the province API ("Tỉnh", "Phường", "TP."...).
const PLACE_PREFIX =
  /^(?:thanh pho|tinh|phuong|xa|dac khu|thi tran|tp|p|x|t)\b\.?\s*/

/** Lower-case, accent-free, prefix-free form used to match OCR text against official names. */
export function normalizePlaceName(name: string): string {
  const plain = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
  return plain.replace(PLACE_PREFIX, '').trim()
}

function segments(text: string): string[] {
  return text
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
}

/**
 * Splits OCR address text into a recognised province and the remaining detail.
 * Only the last comma segment is tried as the province; unknown (for example an old
 * pre-2025 province name) leaves the whole text as detail for the user to correct.
 */
export function splitAddress<T extends NamedPlace>(
  text: string,
  provinces: readonly T[]
): { province: T | null; rest: string } {
  const parts = segments(text)
  const last = parts[parts.length - 1]
  if (!last) return { province: null, rest: text.trim() }

  const wanted = normalizePlaceName(last)
  const province = provinces.find(
    candidate => normalizePlaceName(candidate.name) === wanted
  )
  return province
    ? { province, rest: parts.slice(0, -1).join(', ') }
    : { province: null, rest: parts.join(', ') }
}

/** Takes the trailing segment off `text` when it names one of `wards`. */
export function splitWard<T extends NamedPlace>(
  text: string,
  wards: readonly T[]
): { ward: T | null; rest: string } {
  const parts = segments(text)
  const last = parts[parts.length - 1]
  if (!last) return { ward: null, rest: text.trim() }

  const wanted = normalizePlaceName(last)
  const ward = wards.find(
    candidate => normalizePlaceName(candidate.name) === wanted
  )
  return ward
    ? { ward, rest: parts.slice(0, -1).join(', ') }
    : { ward: null, rest: parts.join(', ') }
}
