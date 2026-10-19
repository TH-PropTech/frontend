'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useLinkWallet, type WalletBrand } from '@/entities/wallet'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { describeWalletError } from './wallet-error'

const MOCBANK_ACCOUNT_PATTERN = /^\d{12}$/

const BRAND_OPTIONS: ReadonlyArray<{ brand: WalletBrand; label: string }> = [
  { brand: 'mocbank', label: 'Ví Mộc (chính)' },
  { brand: 'momo', label: 'Momo (mô phỏng)' },
  { brand: 'zalopay', label: 'ZaloPay (mô phỏng)' },
]

const BRAND_NAMES: Record<WalletBrand, string> = {
  mocbank: 'Ví Mộc',
  momo: 'Momo',
  zalopay: 'ZaloPay',
}

export function WalletLinkForm({
  onLinked,
  defaultBrand = 'mocbank',
}: {
  onLinked?: () => void
  defaultBrand?: WalletBrand
}): React.ReactElement {
  const link = useLinkWallet()
  const [accountNumber, setAccountNumber] = useState('')
  const [brand, setBrand] = useState<WalletBrand>(defaultBrand)
  const brandName = BRAND_NAMES[brand]

  const digits = accountNumber.replace(/\s+/g, '')
  const numberError =
    digits.length > 0 && !MOCBANK_ACCOUNT_PATTERN.test(digits)
      ? `Số tài khoản ${brandName} gồm đúng 12 chữ số.`
      : undefined
  const canSubmit = MOCBANK_ACCOUNT_PATTERN.test(digits) && !link.isPending

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!canSubmit) return
    link.mutate(
      brand === 'mocbank'
        ? { accountNumber: digits }
        : { accountNumber: digits, brand },
      { onSuccess: () => onLinked?.() }
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Liên kết ví Ví Mộc"
    >
      <p className="text-sm text-muted">
        Nhập số tài khoản ví Ví Mộc của bạn. Hệ thống tự tra tên chủ ví và xác
        nhận trùng khớp với hồ sơ — không cần chọn ngân hàng hay tự gõ tên.
      </p>
      <RadioGroup
        value={brand}
        onValueChange={next => setBrand(next as WalletBrand)}
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        aria-label="Loại ví"
      >
        {BRAND_OPTIONS.map(option => {
          const id = `wallet-link-brand-${option.brand}`
          return (
            <label
              key={option.brand}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm has-[[data-state=checked]]:border-primary"
            >
              <RadioGroupItem id={id} value={option.brand} />
              {option.label}
            </label>
          )
        })}
      </RadioGroup>
      <Input
        label={`Số tài khoản ${brandName}`}
        inputMode="numeric"
        autoComplete="off"
        placeholder="812345678901"
        value={accountNumber}
        onChange={event => setAccountNumber(event.target.value)}
        {...(numberError ? { error: numberError } : {})}
      />
      {link.isError ? (
        <p role="alert" className="text-sm text-danger">
          {describeWalletError(link.error)}
        </p>
      ) : null}
      <Button type="submit" disabled={!canSubmit}>
        {link.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Liên kết ví
      </Button>
    </form>
  )
}
