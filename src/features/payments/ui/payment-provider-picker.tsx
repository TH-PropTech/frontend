'use client'

import * as React from 'react'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import {
  getPaymentProviders,
  type PaymentProviderName,
  type PaymentProviderOption,
} from '../api/payments-api'

const FALLBACK_PROVIDERS: PaymentProviderOption[] = [
  { provider: 'mock-bank', label: 'Mock Bank (sandbox)', simulation: true },
]

export interface PaymentProvidersState {
  providers: PaymentProviderOption[]
  selected: PaymentProviderName
  setSelected: (provider: PaymentProviderName) => void
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

  return { providers, selected, setSelected }
}

/** Picker is only meaningful when a real gateway is enabled. */
export function hasGatewayChoice(providers: PaymentProviderOption[]): boolean {
  return providers.some(option => !option.simulation)
}

export interface PaymentProviderPickerProps {
  providers: PaymentProviderOption[]
  value: PaymentProviderName
  onChange: (provider: PaymentProviderName) => void
  disabled?: boolean
}

export function PaymentProviderPicker({
  providers,
  value,
  onChange,
  disabled = false,
}: PaymentProviderPickerProps): React.ReactElement | null {
  if (!hasGatewayChoice(providers)) return null

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
    </fieldset>
  )
}
