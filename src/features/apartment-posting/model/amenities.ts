export interface AmenityOption {
  id: string
  label: string
  description: string
}

// Dùng chung cho form đăng tin của chủ nhà và form sửa của nhân viên.
export const AMENITIES_LIST: readonly AmenityOption[] = [
  { id: 'pool', label: 'Bể bơi', description: 'Bể bơi nội khu hoặc trong nhà' },
  { id: 'gym', label: 'Phòng gym', description: 'Trung tâm thể hình thể thao' },
  {
    id: 'parking',
    label: 'Bãi đỗ xe',
    description: 'Chỗ gửi xe ô tô/xe máy rộng rãi',
  },
  {
    id: 'elevator',
    label: 'Thang máy',
    description: 'Hệ thống di chuyển nhanh chóng',
  },
  {
    id: 'security',
    label: 'An ninh 24/7',
    description: 'Bảo vệ, camera giám sát',
  },
  {
    id: 'pets',
    label: 'Nuôi thú cưng',
    description: 'Cho phép đem vật nuôi vào nhà',
  },
  {
    id: 'park',
    label: 'Công viên',
    description: 'Không gian xanh dạo bộ, thư giãn',
  },
]
