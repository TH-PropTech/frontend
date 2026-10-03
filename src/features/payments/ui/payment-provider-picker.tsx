'use client'

import * as React from 'react'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import {
  getPaymentProviders,
  isMomoMethodAvailable,
  type MomoMethodOption,
  type MomoPaymentMethod,
  type PaymentChoice,
  type PaymentProviderName,
  type PaymentProviderOption,
} from '../api/payments-api'

const FALLBACK_PROVIDERS: PaymentProviderOption[] = [
  { provider: 'mock-bank', label: 'Mock Bank (sandbox)', simulation: true },
]

const vnd = (amount: number): string => `${amount.toLocaleString('vi-VN')} đ`

const limitRange = (option: MomoMethodOption): string =>
  `${vnd(option.minAmount)} – ${vnd(option.maxAmount)}`

export interface PaymentProvidersState {
  providers: PaymentProviderOption[]
  selected: PaymentProviderName
  setSelected: (provider: PaymentProviderName) => void
  momoMethod: MomoPaymentMethod
  setMomoMethod: (method: MomoPaymentMethod) => void
  /** Body fragment for the init calls. */
  choice: PaymentChoice
}

/**
 * Loads the server allow-list once. Falls back to Mock Bank when the list
 * cannot be loaded so the existing simulation flow keeps working.
 */
export function usePaymentProviders(): PaymentProvidersState {
  const [providers, setProviders] =
    React.useState<PaymentProviderOption[]>(FALLBACK_PROVIDERS)
  const [selected, setSelected] =
    React.useState<PaymentProviderName>('mock-bank')
  const [momoMethod, setMomoMethod] =
    React.useState<MomoPaymentMethod>('wallet')

  React.useEffect(() => {
    let active = true
    getPaymentProviders()
      .then(list => {
        if (!active || list.length === 0) return
        setProviders(list)
        setSelected(list[0]?.provider ?? 'mock-bank')
      })
      .catch(() => undefined)
    return () => {
      active = false
    }
  }, [])

  const choice: PaymentChoice =
    selected === 'momo'
      ? { provider: selected, momoMethod }
      : { provider: selected }

  return { providers, selected, setSelected, momoMethod, setMomoMethod, choice }
}

/** Picker is only meaningful when a real gateway is enabled. */
export function hasGatewayChoice(providers: PaymentProviderOption[]): boolean {
  return providers.some(option => !option.simulation)
}

function selectedMomoMethod(
  providers: PaymentProviderOption[],
  choice: PaymentChoice
): MomoMethodOption | undefined {
  if (choice.provider !== 'momo') return undefined
  return providers
    .find(option => option.provider === 'momo')
    ?.methods?.find(option => option.method === choice.momoMethod)
}

/**
 * Reason the current choice cannot pay `amount`, or null when it can. Only
 * MoMo methods carry limits; other gateways enforce theirs on their own page.
 */
export function choiceLimitNote(
  providers: PaymentProviderOption[],
  choice: PaymentChoice,
  amount: number
): string | null {
  const method = selectedMomoMethod(providers, choice)
  return method && !isMomoMethodAvailable(method, amount)
    ? `${method.label} chỉ nhận ${limitRange(method)}`
    : null
}

export interface PaymentProviderPickerProps {
  providers: PaymentProviderOption[]
  value: PaymentProviderName
  onChange: (provider: PaymentProviderName) => void
  momoMethod?: MomoPaymentMethod
  onMomoMethodChange?: (method: MomoPaymentMethod) => void
  /** Amount to pay; out-of-limit MoMo methods are dimmed. Omit when unknown. */
  amount?: number
  disabled?: boolean
}

export function PaymentProviderPicker({
  providers,
  value,
  onChange,
  momoMethod = 'wallet',
  onMomoMethodChange,
  amount,
  disabled = false,
}: PaymentProviderPickerProps): React.ReactElement | null {
  if (!hasGatewayChoice(providers)) return null
  const momoMethods =
    value === 'momo'
      ? providers.find(option => option.provider === 'momo')?.methods
      : undefined

  return (
    <fieldset
      data-testid="payment-provider-picker"
      className="space-y-2"
      disabled={disabled}
    >
      <legend className="text-[11px] font-semibold text-[var(--muted)]">
        Chọn cổng thanh toán
      </legend>
      <RadioGroup
        value={value}
        onValueChange={next => onChange(next as PaymentProviderName)}
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        aria-label="Cổng thanh toán"
      >
        {providers.map(option => {
          const id = `payment-provider-${option.provider}`
          return (
            <label
              key={option.provider}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--fg)] has-[[data-state=checked]]:border-[var(--primary)]"
            >
              <RadioGroupItem id={id} value={option.provider} />
              <span>{option.label}</span>
              {option.simulation ? (
                <span className="ml-auto rounded-full bg-[var(--surface-muted)] px-2 py-0.5 text-[10px] text-[var(--warning)]">
                  Mô phỏng
                </span>
              ) : null}
            </label>
          )
        })}
      </RadioGroup>
      {momoMethods && momoMethods.length > 0 ? (
        <RadioGroup
          value={momoMethod}
          onValueChange={next =>
            onMomoMethodChange?.(next as MomoPaymentMethod)
          }
          className="grid grid-cols-1 gap-2 sm:grid-cols-3"
          aria-label="Cách thanh toán MoMo"
        >
          {momoMethods.map(option => {
            const id = `momo-method-${option.method}`
            const available = isMomoMethodAvailable(option, amount)
            return (
              <label
                key={option.method}
                htmlFor={id}
                className={`flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs has-[[data-state=checked]]:border-[var(--primary)] ${available ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
              >
                <RadioGroupItem
                  id={id}
                  value={option.method}
                  disabled={!available}
                  className="mt-0.5"
                />
                <span className="flex flex-col gap-0.5">
                  <span className="font-semibold text-[var(--fg)]">
                    {option.label}
                  </span>
                  <span className="text-[10px] text-[var(--muted)]">
                    {available
                      ? `Hạn mức ${limitRange(option)}`
                      : `Vượt hạn mức (${limitRange(option)})`}
                  </span>
                </span>
              </label>
            )
          })}
        </RadioGroup>
      ) : null}
    </fieldset>
  )
}
