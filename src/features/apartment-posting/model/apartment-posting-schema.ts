import { z } from 'zod'

export const rentalPackagePostingSchema = z.object({
  packageId: z.string().min(1),
  version: z.number().int().min(1).default(1),
  durationMonths: z.union([
    z.literal(3),
    z.literal(6),
    z.literal(12),
    z.literal(24),
  ]),
  monthlyRent: z.number().gt(0, 'Giá thuê gói phải lớn hơn 0'),
  depositPolicy: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('MONTHS_OF_RENT'),
      months: z.number().int().min(1, 'Số tháng cọc tối thiểu là 1'),
    }),
    z.object({
      type: z.literal('FIXED_AMOUNT'),
      amount: z.number().gt(0, 'Số tiền cọc cố định phải lớn hơn 0'),
    }),
  ]),
  status: z.enum(['active', 'inactive']).default('active'),
})

export type RentalPackagePostingSchemaType = z.infer<
  typeof rentalPackagePostingSchema
>

export const apartmentPostingSchema = z.object({
  title: z
    .string()
    .min(10, 'Tiêu đề phải dài tối thiểu 10 ký tự')
    .max(200, 'Tiêu đề không được vượt quá 200 ký tự'),
  category: z.string().min(1, 'Vui lòng chọn loại căn hộ'),
  description: z
    .string()
    .min(50, 'Mô tả phải dài tối thiểu 50 ký tự')
    .max(5000, 'Mô tả không được vượt quá 5000 ký tự'),
  location: z.string().optional().default(''),
  city: z.string().min(1, 'Vui lòng chọn Tỉnh/Thành phố'),
  district: z.string().min(1, 'Vui lòng chọn Quận/Huyện'),
  ward: z.string().min(1, 'Vui lòng chọn Phường/Xã'),
  street: z.string().min(1, 'Vui lòng nhập Tên đường/phố'),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ hiển thị'),
  priceMonthly: z.number().gt(0, 'Giá thuê phải lớn hơn 0'),
  rentalPackages: z.array(rentalPackagePostingSchema).optional().default([]),
  area: z.number().gt(0, 'Diện tích phải lớn hơn 0'),
  bedrooms: z.number().nonnegative('Số phòng ngủ phải từ 0 trở lên'),
  bathrooms: z.number().nonnegative('Số phòng vệ sinh phải từ 0 trở lên'),
  direction: z.string().optional().default(''),
  balconyDirection: z.string().optional().default(''),
  furniture: z.string().optional().default(''),
  moveInTime: z.string().optional().default(''),
  electricity: z.string().optional().default(''),
  water: z.string().optional().default(''),
  internet: z.string().optional().default(''),
  gallery: z.array(z.string()).default([]),
  images360: z.array(z.string()).default([]),
  vrUrl: z.string().optional().default(''),
  amenities: z.array(z.string()).default([]),
  projectName: z.string().optional().default(''),
  projectId: z.string().nullable().default(null),
  buildingName: z.string().optional().default(''),
  buildingId: z.string().nullable().default(null),
})

export type ApartmentPostingSchemaType = z.infer<typeof apartmentPostingSchema>

export function ensureRentalPackagesFallback(
  priceMonthlyMillion: number,
  existingPackages?: RentalPackagePostingSchemaType[]
): RentalPackagePostingSchemaType[] {
  const activePackages = (existingPackages || []).filter(
    p => p.status === 'active'
  )
  if (activePackages.length > 0) {
    return existingPackages!
  }
  const rentVnd = Math.round(priceMonthlyMillion * 1_000_000)
  return [
    {
      packageId: 'pkg-default-12m',
      version: 1,
      durationMonths: 12,
      monthlyRent: rentVnd > 0 ? rentVnd : 10_000_000,
      depositPolicy: {
        type: 'MONTHS_OF_RENT',
        months: 1,
      },
      status: 'active',
    },
  ]
}
