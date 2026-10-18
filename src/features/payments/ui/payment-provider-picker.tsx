'use client'

import * as React from 'react'
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Landmark,
  QrCode,
  ScanLine,
  WalletCards,
  type LucideIcon,
} from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import {
  getPaymentProviders,
  isMomoMethodAvailable,
  type MomoMethodOption,
  type MomoPaymentMethod,
  type PaymentChoice,
  type PaymentProviderName,
  type PaymentProviderOption,
  type PaymentProviderPurpose,
} from '../api/payments-api'

const FALLBACK_PROVIDERS: PaymentProviderOption[] = [
  { provider: 'mock-bank', label: 'Mock Bank (sandbox)', simulation: true },
]

const vnd = (amount: number): string => `${amount.toLocaleString('vi-VN')} đ`

interface ProviderVisualConfig {
  icon: LucideIcon
  className: string
}

const PROVIDER_VISUALS: Readonly<
  Record<PaymentProviderName, ProviderVisualConfig>
> = {
  'mock-bank': {
    icon: Landmark,
    className: 'bg-[var(--primary-soft)] text-[var(--primary)]',
  },
  vnpay: {
    icon: ScanLine,
    className: 'bg-[var(--info-soft)] text-[var(--info)]',
  },
  momo: {
    icon: WalletCards,
    className: 'bg-[var(--accent-soft)] text-[var(--primary-hover)]',
  },
  zalopay: {
    icon: QrCode,
    className: 'bg-[var(--primary-soft)] text-[var(--primary-hover)]',
  },
  mocbank: {
    icon: Landmark,
    className: 'bg-[var(--info-soft)] text-[var(--info)]',
  },
  sepay: {
    icon: Banknote,
    className: 'bg-[var(--success-soft)] text-[var(--success)]',
  },
  techcombank: {
    icon: CreditCard,
    className: 'bg-[var(--danger-soft)] text-[var(--danger)]',
  },
}

/** Logo thật của cổng đang tích hợp (file trong public/payments); cổng không có logo dùng icon. */
const PROVIDER_LOGOS: Readonly<Partial<Record<PaymentProviderName, string>>> = {
  vnpay: '/payments/vnpay.png',
  momo: '/payments/momo.png',
  zalopay: '/payments/zalopay.png',
}

function ProviderVisual({
  provider,
}: {
  provider: PaymentProviderName
}): React.ReactElement {
  const visual = PROVIDER_VISUALS[provider]
  const Icon = visual.icon
  const logo = PROVIDER_LOGOS[provider]

  if (logo) {
    return (
      <span
        data-testid={`payment-provider-visual-${provider}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--border)] bg-white"
        aria-hidden="true"
      >
        <img
          src={logo}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </span>
    )
  }

  return (
    <span
      data-testid={`payment-provider-visual-${provider}`}
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${visual.className}`}
      aria-hidden="true"
    >
      <Icon className="h-6 w-6" />
    </span>
  )
}

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
export function usePaymentProviders(
  purpose?: PaymentProviderPurpose
): PaymentProvidersState {
  const [providers, setProviders] =
    React.useState<PaymentProviderOption[]>(FALLBACK_PROVIDERS)
  const [selected, setSelected] =
    React.useState<PaymentProviderName>('mock-bank')
  const [momoMethod, setMomoMethod] =
    React.useState<MomoPaymentMethod>('wallet')

  React.useEffect(() => {
    let active = true
    getPaymentProviders(purpose)
      .then(list => {
        if (!active || list.length === 0) return
        setProviders(list)
        setSelected(list[0]?.provider ?? 'mock-bank')
      })
      .catch(() => undefined)
    return () => {
      active = false
    }
  }, [purpose])

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
  const handleProviderChange = (next: string): void => {
    onChange(next as PaymentProviderName)
  }
  const handleMomoMethodChange = (next: string): void => {
    onMomoMethodChange?.(next as MomoPaymentMethod)
  }

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
        onValueChange={handleProviderChange}
        className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-2.5"
        aria-label="Cổng thanh toán"
      >
        {providers.map(option => {
          const id = `payment-provider-${option.provider}`
          const isSelected = option.provider === value
          return (
            <label
              key={option.provider}
              htmlFor={id}
              data-testid={`payment-provider-card-${option.provider}`}
              className={`flex min-h-16 items-center gap-3 rounded-md border px-3.5 py-3 text-sm font-semibold text-[var(--fg)] shadow-sm transition-colors focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--surface)] ${
                isSelected
                  ? 'border-[var(--primary)] bg-[var(--primary-soft)]'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]'
              } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
            >
              <RadioGroupItem id={id} value={option.provider} />
              <ProviderVisual provider={option.provider} />
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
                <span className="leading-snug">{option.label}</span>
                {option.simulation ? (
                  <span
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[11px] font-medium text-[var(--warning)]"
                    aria-hidden="true"
                  >
                    Mô phỏng
                  </span>
                ) : null}
              </span>
              {isSelected ? (
                <CheckCircle2
                  data-testid={`payment-provider-selected-${option.provider}`}
                  className="h-4 w-4 shrink-0 text-[var(--primary)]"
                  aria-hidden="true"
                />
              ) : null}
            </label>
          )
        })}
      </RadioGroup>
      {momoMethods && momoMethods.length > 0 ? (
        <RadioGroup
          value={momoMethod}
          onValueChange={handleMomoMethodChange}
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
                className={`flex items-start gap-2 rounded-sm border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs has-[[data-state=checked]]:border-[var(--primary)] ${available ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
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
