import * as React from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { ApartmentFormValues } from '../model/types'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Checkbox } from '@/shared/ui/checkbox'
import {
  formatVndAmount,
  millionsToVnd,
  rentWarning,
} from '../model/rent-limits'
import { RentalPackagesConfigSection } from './rental-packages-config-section'
import { VndInput } from './vnd-input'
import { APARTMENT_CATEGORIES } from '../model/apartment-categories'
import { AMENITIES_LIST } from '../model/amenities'
import {
  FileText,
  DollarSign,
  Maximize,
  Bed,
  Bath,
  Compass,
  Sofa,
  Shield,
} from 'lucide-react'
interface DetailsStepProps {
  form: UseFormReturn<ApartmentFormValues, unknown, ApartmentFormValues>
}

const DIRECTIONS = [
  'Đông',
  'Tây',
  'Nam',
  'Bắc',
  'Đông Bắc',
  'Đông Nam',
  'Tây Bắc',
  'Tây Nam',
]
const FURNITURE_TYPES = ['Đầy đủ', 'Cơ bản', 'Không nội thất', 'Cao cấp']
const UTILITIES_PRICING = ['Giá nhà nước', 'Giá kinh doanh', 'Tự thỏa thuận']
const INTERNET_PRICING = ['Miễn phí', 'Cố định', 'Tự lắp']

export function DetailsStep({ form }: DetailsStepProps): React.ReactElement {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const basePriceVnd = millionsToVnd(Number(watch('priceMonthly')) || 0)
  const category = watch('category')
  const direction = watch('direction')
  const balconyDirection = watch('balconyDirection')
  const furniture = watch('furniture')
  const electricity = watch('electricity')
  const water = watch('water')
  const internet = watch('internet')
  const selectedAmenities = watch('amenities') || []

  const toggleAmenity = (id: string, checked: boolean) => {
    if (checked) {
      setValue('amenities', [...selectedAmenities, id], {
        shouldValidate: true,
      })
    } else {
      setValue(
        'amenities',
        selectedAmenities.filter(item => item !== id),
        { shouldValidate: true }
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-fg">
          Thông tin chi tiết tin đăng
        </h3>
      </div>

      {/* Tiêu đề & Phân loại */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="title">Tiêu đề tin đăng *</Label>
          <Input
            id="title"
            placeholder="Ví dụ: Căn hộ cao cấp Vinhomes Central Park 2PN đầy đủ nội thất..."
            className="bg-background/50 backdrop-blur-sm border-border"
            {...register('title', { required: true, minLength: 10 })}
          />
          {errors.title && (
            <p className="text-xs text-destructive">
              {errors.title.message || 'Tiêu đề bắt buộc và từ 10 ký tự'}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Loại hình bất động sản *</Label>
          <Select
            value={category}
            onValueChange={val =>
              setValue('category', val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="category"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue placeholder="Chọn loại hình" />
            </SelectTrigger>
            <SelectContent>
              {APARTMENT_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Giá thuê & Diện tích */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priceMonthly" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            Giá thuê hằng tháng (VNĐ / tháng) *
          </Label>
          <VndInput
            id="priceMonthly"
            placeholder="Ví dụ: 12.500.000"
            className="bg-background/50 backdrop-blur-sm border-border"
            valueVnd={basePriceVnd}
            onValueChange={vnd =>
              setValue('priceMonthly', vnd / 1_000_000, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
          {errors.priceMonthly ? (
            <p className="text-xs text-destructive">
              {errors.priceMonthly.message || 'Giá thuê phải lớn hơn 0'}
            </p>
          ) : basePriceVnd > 0 ? (
            <p
              data-testid="price-monthly-preview"
              className={`text-xs ${
                rentWarning(basePriceVnd)
                  ? 'text-amber-700'
                  : 'text-muted-foreground'
              }`}
            >
              = {formatVndAmount(basePriceVnd)}/tháng
              {rentWarning(basePriceVnd)
                ? ` · ${rentWarning(basePriceVnd)}`
                : ''}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="area" className="flex items-center gap-1">
            <Maximize className="h-4 w-4 text-muted-foreground" />
            Diện tích sử dụng (m²) *
          </Label>
          <Input
            id="area"
            type="number"
            placeholder="Ví dụ: 75"
            className="bg-background/50 backdrop-blur-sm border-border"
            {...register('area', { required: true, valueAsNumber: true })}
          />
          {errors.area && (
            <p className="text-xs text-destructive">
              {errors.area.message || 'Diện tích phải lớn hơn 0'}
            </p>
          )}
        </div>
      </div>

      {/* Gói thuê linh hoạt & Chính sách cọc */}
      <RentalPackagesConfigSection form={form} />

      {/* Số lượng phòng */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bedrooms" className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-muted-foreground" />
            Số phòng ngủ *
          </Label>
          <Input
            id="bedrooms"
            type="number"
            className="bg-background/50 backdrop-blur-sm border-border"
            {...register('bedrooms', { required: true, valueAsNumber: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms" className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-muted-foreground" />
            Số phòng tắm/WC *
          </Label>
          <Input
            id="bathrooms"
            type="number"
            className="bg-background/50 backdrop-blur-sm border-border"
            {...register('bathrooms', { required: true, valueAsNumber: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="direction" className="flex items-center gap-1">
            <Compass className="h-4 w-4 text-muted-foreground" />
            Hướng cửa chính
          </Label>
          <Select
            value={direction}
            onValueChange={val =>
              setValue('direction', val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="direction"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue placeholder="Chọn hướng" />
            </SelectTrigger>
            <SelectContent>
              {DIRECTIONS.map(dir => (
                <SelectItem key={dir} value={dir}>
                  {dir}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="balconyDirection" className="flex items-center gap-1">
            <Compass className="h-4 w-4 text-muted-foreground" />
            Hướng ban công
          </Label>
          <Select
            value={balconyDirection}
            onValueChange={val =>
              setValue('balconyDirection', val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="balconyDirection"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue placeholder="Chọn hướng" />
            </SelectTrigger>
            <SelectContent>
              {DIRECTIONS.map(dir => (
                <SelectItem key={dir} value={dir}>
                  {dir}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Nội thất & Thời gian nhận phòng & Đơn giá điện nước */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="furniture" className="flex items-center gap-1">
            <Sofa className="h-4 w-4 text-muted-foreground" />
            Tình trạng nội thất
          </Label>
          <Select
            value={furniture}
            onValueChange={val =>
              setValue('furniture', val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="furniture"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue placeholder="Chọn nội thất" />
            </SelectTrigger>
            <SelectContent>
              {FURNITURE_TYPES.map(f => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="electricity">Đơn giá điện</Label>
          <Select
            value={electricity}
            onValueChange={val =>
              setValue('electricity', val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="electricity"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue placeholder="Chọn giá điện" />
            </SelectTrigger>
            <SelectContent>
              {UTILITIES_PRICING.map(p => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="water">Đơn giá nước</Label>
          <Select
            value={water}
            onValueChange={val =>
              setValue('water', val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="water"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue placeholder="Chọn giá nước" />
            </SelectTrigger>
            <SelectContent>
              {UTILITIES_PRICING.map(p => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="internet">Chi phí Internet</Label>
          <Select
            value={internet}
            onValueChange={val =>
              setValue('internet', val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="internet"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue placeholder="Chọn giá internet" />
            </SelectTrigger>
            <SelectContent>
              {INTERNET_PRICING.map(p => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tiện ích tiện nghi */}
      <div className="space-y-3">
        <Label className="flex items-center gap-1.5 font-medium text-fg">
          <Shield className="h-4 w-4 text-primary" />
          Tiện ích căn hộ & Khu cư dân
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-muted/40 p-4 rounded-xl border border-border/60">
          {AMENITIES_LIST.map(amenity => {
            const isChecked = selectedAmenities.includes(amenity.id)
            return (
              <div
                key={amenity.id}
                className="flex items-start space-x-3 space-y-0"
              >
                <Checkbox
                  id={amenity.id}
                  checked={isChecked}
                  onCheckedChange={checked =>
                    toggleAmenity(amenity.id, !!checked)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={amenity.id}
                    className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {amenity.label}
                  </label>
                  <p className="text-xs text-muted">{amenity.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Giấy chứng nhận quyền sở hữu */}
      <div className="space-y-2">
        <Label htmlFor="ownershipCertificate">
          Số giấy chứng nhận quyền sở hữu/sử dụng căn hộ (Không bắt buộc)
        </Label>
        <Input
          id="ownershipCertificate"
          placeholder="VD: Số vào sổ CS 12345, cấp ngày ..."
          maxLength={200}
          className="bg-background border-border"
          {...register('ownershipCertificate')}
        />
        <p className="text-xs text-muted-foreground">
          Thông tin này được ghi vào hợp đồng thuê để chứng minh quyền cho thuê
          của chủ nhà.
        </p>
      </div>

      {/* Mô tả chi tiết */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Mô tả chi tiết căn hộ (Không bắt buộc, nếu nhập tối thiểu 10 ký tự)
        </Label>
        <Textarea
          id="description"
          placeholder="Mô tả chi tiết về đặc điểm căn hộ, vị trí, các khoản chi phí phát sinh, điều kiện thuê nhà, thời gian thuê tối thiểu, số tiền cọc..."
          rows={6}
          className="bg-background/50 backdrop-blur-sm border-border resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-xs text-destructive">
            {errors.description.message ||
              'Mô tả (nếu nhập) tối thiểu 10 ký tự'}
          </p>
        )}
      </div>
    </div>
  )
}
