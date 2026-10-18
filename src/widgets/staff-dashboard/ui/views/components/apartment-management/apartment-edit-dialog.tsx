'use client'

import { OptionSelect } from '@/shared/ui/option-select'
import * as React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import { apiClient } from '@/shared/api/api-client'
import {
  AMENITIES_LIST,
  APARTMENT_CATEGORIES,
  RentalPackagesConfigSection,
  apartmentPostingSchema,
  rentalPackagePostingSchema,
  type ApartmentFormValues,
} from '@/features/apartment-posting'
import type { StaffApartment, StaffRentalPackage } from './types'

const VND_PER_MILLION = 1_000_000

type EditableKey =
  | 'title'
  | 'category'
  | 'description'
  | 'city'
  | 'district'
  | 'ward'
  | 'street'
  | 'address'
  | 'priceMonthly'
  | 'area'
  | 'bedrooms'
  | 'bathrooms'
  | 'direction'
  | 'balconyDirection'
  | 'furniture'
  | 'moveInTime'
  | 'electricity'
  | 'water'
  | 'internet'

type FieldKind = 'text' | 'textarea' | 'number' | 'category'

interface FieldConfig {
  key: EditableKey
  label: string
  kind: FieldKind
  fullWidth?: boolean
}

const FIELDS: readonly FieldConfig[] = [
  { key: 'title', label: 'Tiêu đề', kind: 'text', fullWidth: true },
  { key: 'category', label: 'Loại hình', kind: 'category' },
  { key: 'priceMonthly', label: 'Giá thuê (triệu/tháng)', kind: 'number' },
  { key: 'description', label: 'Mô tả', kind: 'textarea', fullWidth: true },
  { key: 'city', label: 'Tỉnh/Thành phố', kind: 'text' },
  { key: 'district', label: 'Quận/Huyện', kind: 'text' },
  { key: 'ward', label: 'Phường/Xã', kind: 'text' },
  { key: 'street', label: 'Đường', kind: 'text' },
  { key: 'address', label: 'Địa chỉ hiển thị', kind: 'text', fullWidth: true },
  { key: 'area', label: 'Diện tích (m²)', kind: 'number' },
  { key: 'bedrooms', label: 'Số phòng ngủ', kind: 'number' },
  { key: 'bathrooms', label: 'Số phòng tắm', kind: 'number' },
  { key: 'direction', label: 'Hướng nhà', kind: 'text' },
  { key: 'balconyDirection', label: 'Hướng ban công', kind: 'text' },
  { key: 'furniture', label: 'Nội thất', kind: 'text' },
  { key: 'moveInTime', label: 'Thời gian dọn vào', kind: 'text' },
  { key: 'electricity', label: 'Tiền điện', kind: 'text' },
  { key: 'water', label: 'Tiền nước', kind: 'text' },
  { key: 'internet', label: 'Internet', kind: 'text' },
]

const INTEGER_KEYS: readonly EditableKey[] = ['bedrooms', 'bathrooms']
const ADDRESS_PART_KEYS = ['street', 'ward', 'district', 'city'] as const

// Dùng lại luật validate của form đăng tin để hai nơi không lệch nhau.
const EDIT_SCHEMA = apartmentPostingSchema.pick({
  title: true,
  category: true,
  description: true,
  city: true,
  district: true,
  ward: true,
  street: true,
  address: true,
  priceMonthly: true,
  area: true,
  bedrooms: true,
  bathrooms: true,
  direction: true,
  balconyDirection: true,
  furniture: true,
  moveInTime: true,
  electricity: true,
  water: true,
  internet: true,
})

const PACKAGES_SCHEMA = z.array(rentalPackagePostingSchema)

/**
 * Chỉ giữ các trường backend chấp nhận khi ghi (whitelist + forbidNonWhitelisted):
 * bỏ resolvedDepositAmount, currency, capturedAt… nhưng giữ chính sách thực thi.
 */
function stripPackage(pkg: StaffRentalPackage): StaffRentalPackage {
  return {
    packageId: pkg.packageId,
    version: pkg.version,
    durationMonths: pkg.durationMonths,
    monthlyRent: pkg.monthlyRent,
    depositPolicy: pkg.depositPolicy,
    status: pkg.status,
    ...(pkg.prepaidRent ? { prepaidRent: pkg.prepaidRent } : {}),
    ...(pkg.allowedExecutionPolicies
      ? { allowedExecutionPolicies: pkg.allowedExecutionPolicies }
      : {}),
    ...(pkg.defaultExecutionPolicy
      ? { defaultExecutionPolicy: pkg.defaultExecutionPolicy }
      : {}),
  }
}

type FormValues = Record<EditableKey, string>
type FormErrors = Partial<Record<EditableKey, string>>

function toFormValues(apartment: StaffApartment): FormValues {
  return {
    title: apartment.title ?? '',
    category: apartment.category ?? '',
    description: apartment.description ?? '',
    city: apartment.city ?? '',
    district: apartment.district ?? '',
    ward: apartment.ward ?? '',
    street: apartment.street ?? '',
    address: apartment.address ?? '',
    priceMonthly: String(apartment.priceMonthly / VND_PER_MILLION),
    area: String(apartment.area),
    bedrooms: String(apartment.bedrooms),
    bathrooms: String(apartment.bathrooms),
    direction: apartment.direction ?? '',
    balconyDirection: apartment.balconyDirection ?? '',
    furniture: apartment.furniture ?? '',
    moveInTime: apartment.moveInTime ?? '',
    electricity: apartment.electricity ?? '',
    water: apartment.water ?? '',
    internet: apartment.internet ?? '',
  }
}

function toCandidate(values: FormValues): Record<string, unknown> {
  const candidate: Record<string, unknown> = { ...values }
  for (const field of FIELDS) {
    if (field.kind === 'number') {
      candidate[field.key] =
        values[field.key].trim() === '' ? Number.NaN : Number(values[field.key])
    }
  }
  return candidate
}

function findNumberErrors(candidate: Record<string, unknown>): FormErrors {
  const errors: FormErrors = {}
  for (const field of FIELDS) {
    if (field.kind !== 'number') continue
    const value = candidate[field.key] as number
    if (Number.isNaN(value)) {
      errors[field.key] = 'Vui lòng nhập số hợp lệ'
    } else if (INTEGER_KEYS.includes(field.key) && !Number.isInteger(value)) {
      errors[field.key] = 'Vui lòng nhập số nguyên'
    }
  }
  return errors
}

interface ApartmentEditDialogProps {
  apartment: StaffApartment
  onClose: () => void
  onSaved: (updated: StaffApartment) => void
}

export function ApartmentEditDialog({
  apartment,
  onClose,
  onSaved,
}: ApartmentEditDialogProps): React.ReactElement {
  const [values, setValues] = React.useState<FormValues>(() =>
    toFormValues(apartment)
  )
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [isSaving, setIsSaving] = React.useState(false)
  const [amenities, setAmenities] = React.useState<string[]>(
    () => apartment.amenities ?? []
  )
  const [packagesError, setPackagesError] = React.useState<string | null>(null)

  const originalPackages = React.useMemo(
    () => (apartment.rentalPackages ?? []).map(stripPackage),
    [apartment.rentalPackages]
  )
  // Form riêng cho mục gói thuê để tái dùng RentalPackagesConfigSection của form đăng tin.
  const packagesForm = useForm<
    ApartmentFormValues,
    unknown,
    ApartmentFormValues
  >({
    defaultValues: {
      priceMonthly: apartment.priceMonthly / VND_PER_MILLION,
      rentalPackages: originalPackages,
    } as Partial<ApartmentFormValues> as ApartmentFormValues,
  })
  const currentPackages = (useWatch({
    control: packagesForm.control,
    name: 'rentalPackages',
  }) ?? []) as StaffRentalPackage[]
  const hasActivePackages = currentPackages.some(pkg => pkg.status === 'active')

  // Giá gốc (triệu) là mức mặc định khi bật một gói mới.
  React.useEffect(() => {
    const price = Number(values.priceMonthly)
    packagesForm.setValue('priceMonthly', Number.isFinite(price) ? price : 0)
  }, [values.priceMonthly, packagesForm])

  const handleChange = (key: EditableKey, value: string): void => {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  const handleToggleAmenity = (id: string, checked: boolean): void => {
    setAmenities(prev =>
      checked ? [...prev, id] : prev.filter(item => item !== id)
    )
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const candidate = toCandidate(values)
    const numberErrors = findNumberErrors(candidate)
    const parsed = EDIT_SCHEMA.safeParse(candidate)

    const nextErrors: FormErrors = { ...numberErrors }
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as EditableKey
        if (!(key in nextErrors)) nextErrors[key] = issue.message
      }
    }
    setErrors(nextErrors)

    const strippedPackages = currentPackages.map(stripPackage)
    const packagesResult = PACKAGES_SCHEMA.safeParse(strippedPackages)
    setPackagesError(
      packagesResult.success ? null : 'Cấu hình gói thuê chưa hợp lệ'
    )
    if (
      !parsed.success ||
      Object.keys(numberErrors).length > 0 ||
      !packagesResult.success
    ) {
      return
    }

    const original = toFormValues(apartment)
    const addressChanged = ADDRESS_PART_KEYS.some(
      key => values[key] !== original[key]
    )
    const packagesChanged =
      JSON.stringify(strippedPackages) !== JSON.stringify(originalPackages)
    const { priceMonthly, ...otherFields } = parsed.data
    const payload: Record<string, unknown> = {
      ...otherFields,
      amenities,
      // Khi có gói đang bật, giá đại diện do backend suy ra từ các gói nên không gửi giá gốc.
      ...(hasActivePackages
        ? {}
        : { priceMonthly: Math.round(priceMonthly * VND_PER_MILLION) }),
      ...(packagesChanged ? { rentalPackages: strippedPackages } : {}),
    }
    // Chỉ ghép lại địa chỉ đầy đủ khi đường/phường/quận/thành phố đổi, để không ghi đè địa chỉ đầy đủ tuỳ chỉnh.
    if (addressChanged) {
      payload.location = ADDRESS_PART_KEYS.map(key => values[key]).join(', ')
    }

    setIsSaving(true)
    try {
      const updated = await apiClient.patch<StaffApartment>(
        `/apartments/${apartment.id}`,
        payload
      )
      toast.success('Đã cập nhật thông tin căn hộ')
      onSaved(updated)
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Không thể cập nhật căn hộ'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-[color:var(--fg)]/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow-lg)]"
      >
        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-5 py-4">
          <h3 className="text-sm font-bold text-[color:var(--fg)]">
            Chỉnh sửa thông tin căn hộ
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-lg p-1.5 text-[color:var(--muted)] hover:bg-[color:var(--fg)]/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-5 sm:grid-cols-2">
          {FIELDS.map(field => (
            <div
              key={field.key}
              className={field.fullWidth ? 'sm:col-span-2' : undefined}
            >
              <label
                htmlFor={`edit-${field.key}`}
                className="mb-1 block text-[11px] font-semibold text-[color:var(--muted)]"
              >
                {field.label}
              </label>
              {field.kind === 'textarea' ? (
                <textarea
                  id={`edit-${field.key}`}
                  rows={4}
                  value={values[field.key]}
                  onChange={e => handleChange(field.key, e.target.value)}
                  className="w-full resize-none rounded-lg border border-[color:var(--border)] bg-[color:var(--bg)] p-2.5 text-xs focus:border-[color:var(--primary)] focus:outline-none"
                />
              ) : field.kind === 'category' ? (
                <OptionSelect
                  id={`edit-${field.key}`}
                  value={values[field.key]}
                  onChange={value => handleChange(field.key, value)}
                  placeholder="Chọn loại hình"
                  className="text-xs"
                  options={APARTMENT_CATEGORIES.map(category => ({
                    value: category,
                    label: category,
                  }))}
                />
              ) : (
                <input
                  id={`edit-${field.key}`}
                  type="text"
                  inputMode={field.kind === 'number' ? 'decimal' : 'text'}
                  value={values[field.key]}
                  disabled={field.key === 'priceMonthly' && hasActivePackages}
                  onChange={e => handleChange(field.key, e.target.value)}
                  className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--bg)] p-2.5 text-xs focus:border-[color:var(--primary)] focus:outline-none disabled:opacity-60"
                />
              )}
              {field.key === 'priceMonthly' && hasActivePackages && (
                <p className="mt-1 text-[10px] text-[color:var(--muted)]">
                  Giá tính theo các gói thuê bên dưới.
                </p>
              )}
              {errors[field.key] && (
                <p
                  role="alert"
                  className="mt-1 text-[10px] text-[color:var(--danger)]"
                >
                  {errors[field.key]}
                </p>
              )}
            </div>
          ))}

          <fieldset className="sm:col-span-2">
            <legend className="mb-2 text-[11px] font-semibold text-[color:var(--muted)]">
              Tiện ích
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {AMENITIES_LIST.map(amenity => (
                <label
                  key={amenity.id}
                  htmlFor={`edit-amenity-${amenity.id}`}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-[color:var(--border)] px-3 py-2 text-xs text-[color:var(--fg)]"
                >
                  <input
                    id={`edit-amenity-${amenity.id}`}
                    type="checkbox"
                    checked={amenities.includes(amenity.id)}
                    onChange={e =>
                      handleToggleAmenity(amenity.id, e.target.checked)
                    }
                  />
                  {amenity.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="sm:col-span-2">
            <RentalPackagesConfigSection form={packagesForm} />
            {packagesError && (
              <p
                role="alert"
                className="mt-1 text-[10px] text-[color:var(--danger)]"
              >
                {packagesError}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[color:var(--border)] bg-[color:var(--surface-muted)]/20 p-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-xl border border-[color:var(--border)] px-4 py-2.5 text-xs font-semibold text-[color:var(--muted)] hover:text-[color:var(--fg)] disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-[color:var(--primary)] px-4 py-2.5 text-xs font-semibold text-[color:var(--on-control)] hover:opacity-90 disabled:opacity-50"
          >
            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  )
}
