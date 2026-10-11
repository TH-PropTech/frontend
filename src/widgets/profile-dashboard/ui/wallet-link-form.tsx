'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useLinkWallet, useWalletBanks } from '@/entities/wallet'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { describeWalletError } from './wallet-error'

const ACCOUNT_NUMBER_PATTERN = /^\d{6,19}$/

export function WalletLinkForm({
  onLinked,
}: {
  onLinked?: () => void
}): React.ReactElement {
  const banks = useWalletBanks()
  const link = useLinkWallet()
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountHolder, setAccountHolder] = useState('')

  const digits = accountNumber.replace(/\s+/g, '')
  const numberError =
    digits.length > 0 && !ACCOUNT_NUMBER_PATTERN.test(digits)
      ? 'Số tài khoản gồm 6–19 chữ số.'
      : undefined
  const canSubmit =
    bankCode !== '' &&
    ACCOUNT_NUMBER_PATTERN.test(digits) &&
    accountHolder.trim().length >= 2 &&
    !link.isPending

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!canSubmit) return
    link.mutate(
      { bankCode, accountNumber: digits, accountHolder: accountHolder.trim() },
      { onSuccess: () => onLinked?.() }
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Liên kết ngân hàng"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="wallet-bank" className="text-sm font-medium text-fg">
          Ngân hàng
        </label>
        <select
          id="wallet-bank"
          value={bankCode}
          onChange={event => setBankCode(event.target.value)}
          className="h-10 rounded-xl border border-border bg-surface px-3 text-sm text-fg"
        >
          <option value="">Chọn ngân hàng</option>
          {banks.data?.map(bank => (
            <option key={bank.code} value={bank.code}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Số tài khoản"
        inputMode="numeric"
        autoComplete="off"
        value={accountNumber}
        onChange={event => setAccountNumber(event.target.value)}
        {...(numberError ? { error: numberError } : {})}
      />
      <Input
        label="Tên chủ tài khoản"
        autoComplete="off"
        placeholder="Trùng với họ tên trên hồ sơ"
        value={accountHolder}
        onChange={event => setAccountHolder(event.target.value)}
      />
      {link.isError ? (
        <p role="alert" className="text-sm text-danger">
          {describeWalletError(link.error)}
        </p>
      ) : null}
      <Button type="submit" disabled={!canSubmit}>
        {link.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Liên kết ngân hàng
      </Button>
    </form>
  )
}
