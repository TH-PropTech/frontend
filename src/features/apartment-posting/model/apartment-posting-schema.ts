import { z } from 'zod'
import { APARTMENT_CATEGORIES } from './apartment-categories'
import {
  fixedDepositError,
  MAX_DEPOSIT_MONTHS,
  MAX_MONTHLY_RENT_VND,
  rentError,
} from './rent-limits'

/** Khớp giới hạn của backend cho điều khoản riêng của chủ nhà. */
export const CUSTOM_CLAUSES_MAX_LENGTH = 2000

const rentalExecutionPolicyRefSchema = z.object({
  policyId: z.string().min(1),
  version: z.number().int().min(1),
  strategy: z.literal('SIGN_FIRST'),
  contentHash: z.string().min(1),
})

const rentalPackageShape = z.object({
  packageId: z.string().min(1),
  version: z.number().int().min(1).default(1),
  durationMonths: z.union([
    z.literal(3),
    z.literal(6),
    z.literal(12),
    z.literal(24),
  ]),
  monthlyRent: z
    .number()
    .gt(0, 'Giá thuê gói phải lớn hơn 0')
    .refine(rent => rentError(rent) === null, {
      message: rentError(MAX_MONTHLY_RENT_VND + 1) ?? 'Giá thuê quá cao',
    }),
  depositPolicy: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('MONTHS_OF_RENT'),
      months: z
        .number()
        .int()
        .min(1, 'Số tháng cọc tối thiểu là 1')
        .max(MAX_DEPOSIT_MONTHS, `Tiền cọc tối đa ${MAX_DEPOSIT_MONTHS} tháng`),
    }),
    z.object({
      type: z.literal('FIXED_AMOUNT'),
      amount: z.number().gt(0, 'Số tiền cọc cố định phải lớn hơn 0'),
    }),
  ]),
  settlementPolicy: z
    .object({
      holdingDeposit: z
        .discriminatedUnion('type', [
          z.object({
            type: z.literal('FIXED_AMOUNT'),
            amount: z.number().int().gt(0),
          }),
          z.object({
            type: z.literal('PERCENT_OF_SECURITY'),
            percent: z.number().gt(0).lte(100),
          }),
        ])
        .optional(),
      allowedPaymentCycles: z
        .array(z.union([z.literal(1), z.literal(3), z.literal(6)]))
        .min(1),
      defaultPaymentCycle: z.union([z.literal(1), z.literal(3), z.literal(6)]),
      firstPaymentDueOffsetDays: z.number().int().min(0).max(15),
    })
    .optional(),
  // số ngày khách có để phản hồi biên bản trả nhà và bảng khấu trừ; vắng mặt = backend dùng 3 ngày
  moveOutPolicy: z
    .object({
      responseDays: z.number().int().min(1).max(15),
    })
    .optional(),
  // tiền thuê trả trước ngoài tiền cọc; vắng mặt = giữ quy tắc cũ (thu kỳ thanh toán đầu khi nhận nhà)
  prepaidRent: z
    .discriminatedUnion('type', [
      z.object({ type: z.literal('NONE') }),
      z.object({
        type: z.literal('MONTHS'),
        months: z
          .number()
          .int()
          .min(1, 'Trả trước tối thiểu 1 tháng')
          .max(24, 'Trả trước tối đa 24 tháng'),
      }),
      z.object({ type: z.literal('FULL') }),
    ])
    .optional(),
  // điều khoản hợp đồng do chủ nhà đặt; vắng mặt = backend dùng 1 / 0 / 30 / không có điều khoản riêng
  paymentDay: z
    .number()
    .int()
    .min(1, 'Ngày thanh toán từ 1 đến 31')
    .max(31, 'Ngày thanh toán từ 1 đến 31')
    .optional(),
  latePenaltyRate: z
    .number()
    .min(0, 'Lãi phạt không âm')
    .max(20, 'Lãi phạt tối đa 20%/năm')
    .optional(),
  terminationNoticeDays: z
    .number()
    .int()
    .min(30, 'Báo trước tối thiểu 30 ngày')
    .max(365, 'Báo trước tối đa 365 ngày')
    .optional(),
  customClauses: z
    .string()
    .max(CUSTOM_CLAUSES_MAX_LENGTH, 'Điều khoản riêng tối đa 2000 ký tự')
    .optional(),
  // Đơn giá hai bên thỏa thuận, chốt vào hợp đồng; không phải giá nhà nước quy định.
  utilityRates: z
    .object({
      electricityPerKwh: z
        .number()
        .min(0, 'Đơn giá điện không được âm')
        .max(10_000_000, 'Đơn giá điện vượt mức cho phép'),
      waterPerM3: z
        .number()
        .min(0, 'Đơn giá nước không được âm')
        .max(10_000_000, 'Đơn giá nước vượt mức cho phép'),
      serviceFeeMonthly: z
        .number()
        .min(0, 'Phí dịch vụ không được âm')
        .max(10_000_000, 'Phí dịch vụ vượt mức cho phép'),
      note: z.string().max(500, 'Ghi chú tối đa 500 ký tự').optional(),
    })
    .optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  allowedExecutionPolicies: z
    .array(rentalExecutionPolicyRefSchema)
    .max(2)
    .optional(),
  defaultExecutionPolicy: rentalExecutionPolicyRefSchema.optional(),
})

export const rentalPackagePostingSchema = rentalPackageShape.superRefine(
  (pkg, ctx) => {
    if (pkg.depositPolicy.type !== 'FIXED_AMOUNT') return
    const problem = fixedDepositError(pkg.depositPolicy.amount, pkg.monthlyRent)
    if (problem) {
      ctx.addIssue({
        code: 'custom',
        path: ['depositPolicy', 'amount'],
        message: problem,
      })
    }
  }
)

export type RentalPackagePostingSchemaType = z.infer<
  typeof rentalPackagePostingSchema
>

export const apartmentPostingSchema = z.object({
  title: z
    .string()
    .min(10, 'Tiêu đề phải dài tối thiểu 10 ký tự')
    .max(200, 'Tiêu đề không được vượt quá 200 ký tự'),
  category: z
    .string()
    .min(1, 'Vui lòng chọn loại căn hộ')
    .refine(
      value => (APARTMENT_CATEGORIES as readonly string[]).includes(value),
      'Loại hình phải là căn hộ chung cư hoặc chung cư mini, căn hộ dịch vụ'
    ),
  // Số giấy chứng nhận quyền sở hữu/sử dụng căn hộ: không bắt buộc, ghi vào hợp đồng khi lập.
  ownershipCertificate: z.string().max(200, 'Tối đa 200 ký tự').optional(),
  // Không bắt buộc; nếu nhập thì tối thiểu 10 ký tự.
  description: z
    .string()
    .max(5000, 'Mô tả không được vượt quá 5000 ký tự')
    .default('')
    .refine(
      value => value.trim() === '' || value.trim().length >= 10,
      'Mô tả (nếu nhập) phải dài tối thiểu 10 ký tự'
    ),
  location: z.string().optional().default(''),
  city: z.string().min(1, 'Vui lòng chọn Tỉnh/Thành phố'),
  // Cơ cấu hành chính từ 1/7/2025 không còn cấp Quận/Huyện: giữ chuỗi rỗng cho tin mới.
  district: z.string().default(''),
  ward: z.string().min(1, 'Vui lòng chọn Phường/Xã'),
  street: z.string().min(1, 'Vui lòng nhập Tên đường/phố'),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ hiển thị'),
  priceMonthly: z
    .number()
    .gt(0, 'Giá thuê phải lớn hơn 0')
    .max(
      MAX_MONTHLY_RENT_VND / 1_000_000,
      rentError(MAX_MONTHLY_RENT_VND + 1) ?? 'Giá thuê quá cao'
    ),
  rentalPackages: z.array(rentalPackagePostingSchema).optional().default([]),
  area: z.number().gt(0, 'Diện tích phải lớn hơn 0'),
  bedrooms: z.number().nonnegative('Số phòng ngủ phải từ 0 trở lên'),
  // Không bắt buộc: để trống thì hồ sơ thuê theo cấu hình luồng thuê của Chủ nhà.
  maxOccupants: z
    .number()
    .int('Số người ở tối đa phải là số nguyên từ 1 đến 20.')
    .min(1, 'Số người ở tối đa phải từ 1 đến 20.')
    .max(20, 'Số người ở tối đa phải từ 1 đến 20.')
    .nullable()
    .optional(),
  bathrooms: z.number().nonnegative('Số phòng vệ sinh phải từ 0 trở lên'),
  direction: z.string().optional().default(''),
  balconyDirection: z.string().optional().default(''),
  furniture: z.string().optional().default(''),
  moveInTime: z.string().optional().default(''),
  electricity: z.string().optional().default(''),
  water: z.string().optional().default(''),
  internet: z.string().optional().default(''),
  gallery: z.array(z.string()).default([]),
  amenities: z.array(z.string()).default([]),
  projectName: z.string().optional().default(''),
  projectId: z.string().nullable().default(null),
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
