const DMY = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/

/** Parses `DD/MM/YYYY` into a real calendar date (rejects 31/02/2000 and the like), else null. */
export function parseDmy(value: string): Date | null {
  const match = DMY.exec(value.trim())
  if (!match) return null
  const [day, month, year] = [
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
  ]
  const date = new Date(year, month - 1, day)
  const isReal =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  return isReal ? date : null
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/** `DD/MM/YYYY` to the `yyyy-MM-dd` string the shared DatePicker uses; '' when invalid. */
export function dmyToIso(value: string): string {
  const date = parseDmy(value)
  return date
    ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
    : ''
}

/** `yyyy-MM-dd` back to the `DD/MM/YYYY` the KYC form and backend use; '' when invalid. */
export function isoToDmy(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return ''
  const value = `${Number(match[3])}/${Number(match[2])}/${match[1]}`
  const date = parseDmy(value)
  return date
    ? `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`
    : ''
}
