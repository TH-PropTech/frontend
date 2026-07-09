import { z } from 'zod'

export const loginSchema = z.object({
  emailOrPhone: z.string().min(1, 'Vui lòng nhập Email hoặc Số điện thoại'),
  password: z.string().min(8, 'Mật khẩu phải từ 8 ký tự trở lên'),
})

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Họ tên cần có ít nhất 2 ký tự'),
    phone: z
      .string()
      .regex(/^(?:\+84|0)\d{9,10}$/, 'Số điện thoại không đúng định dạng VN'),
    email: z.string().email('Địa chỉ email không hợp lệ'),
    password: z
      .string()
      .min(8, 'Mật khẩu tối thiểu 8 ký tự')
      .regex(/[A-Z]/, 'Mật khẩu cần ít nhất 1 chữ viết hoa')
      .regex(/[0-9]/, 'Mật khẩu cần ít nhất 1 chữ số'),
    confirmPassword: z.string(),
    acceptedTerms: z.literal(true, {
      errorMap: () => ({ message: 'Bạn phải đồng ý với điều khoản sử dụng' }),
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })
