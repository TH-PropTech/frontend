'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useLinkWallet } from '@/entities/wallet'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { describeWalletError } from './wallet-error'

const MOCBANK_ACCOUNT_PATTERN = /^\d{12}$/

export function WalletLinkForm({
  onLinked,
}: {
  onLinked?: () => void
}): React.ReactElement {
  const link = useLinkWallet()
  const [accountNumber, setAccountNumber] = useState('')

  const digits = accountNumber.replace(/\s+/g, '')
  const numberError =
    digits.length > 0 && !MOCBANK_ACCOUNT_PATTERN.test(digits)
      ? 'Số tài khoản Ví Mộc gồm đúng 12 chữ số.'
      : undefined
  const canSubmit = MOCBANK_ACCOUNT_PATTERN.test(digits) && !link.isPending

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!canSubmit) return
    link.mutate({ accountNumber: digits }, { onSuccess: () => onLinked?.() })
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
      <Input
        label="Số tài khoản Ví Mộc"
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
