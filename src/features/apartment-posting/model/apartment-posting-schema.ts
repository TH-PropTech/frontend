import { z } from 'zod'

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
