import * as React from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { ApartmentFormValues } from '../model/types'
import { Card, CardContent } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Label } from '@/shared/ui/label'
import { Checkbox } from '@/shared/ui/checkbox'
import { Button } from '@/shared/ui/button'
import {
  FileCheck,
  MapPin,
  DollarSign,
  Maximize,
  Bed,
  Bath,
  ShieldAlert,
  Loader2,
} from 'lucide-react'
interface ReviewStepProps {
  form: UseFormReturn<ApartmentFormValues, unknown, ApartmentFormValues>
  onSubmit: () => void
  isSubmitting: boolean
  submitButtonText?: string
}

export function ReviewStep({
  form,
  onSubmit,
  isSubmitting,
  submitButtonText = 'Đăng tin thuê ngay',
}: ReviewStepProps): React.ReactElement {
  const { watch } = form
  const values = watch()
  const [agreed, setAgreed] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <FileCheck className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-fg">
          Xác nhận thông tin tin đăng
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Text Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-muted/30 p-6 rounded-xl border border-border/60 space-y-4">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                {values.category}
              </span>
              <h2 className="text-xl font-bold text-fg mt-1">
                {values.title || 'Chưa nhập tiêu đề'}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-y border-border/40">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-[10px] text-muted uppercase font-bold">
                    Giá thuê
                  </p>
                  <p className="text-sm font-bold text-fg">
                    {values.priceMonthly
                      ? `${values.priceMonthly} triệu/tháng`
                      : 'Chưa nhập'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Maximize className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-[10px] text-muted uppercase font-bold">
                    Diện tích
                  </p>
                  <p className="text-sm font-bold text-fg">
                    {values.area ? `${values.area} m²` : 'Chưa nhập'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-[10px] text-muted uppercase font-bold">
                    Phòng ngủ
                  </p>
                  <p className="text-sm font-bold text-fg">
                    {values.bedrooms ?? 0} PN
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-[10px] text-muted uppercase font-bold">
                    Phòng tắm
                  </p>
                  <p className="text-sm font-bold text-fg">
                    {values.bathrooms ?? 0} WC
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted uppercase flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> Địa chỉ bất động sản
              </p>
              <p className="text-sm text-fg leading-relaxed">
                {values.address || 'Chưa nhập địa chỉ'}
              </p>
              {values.projectName && (
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {values.projectName && (
                    <Badge variant="secondary">
                      Dự án: {values.projectName}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted uppercase">
                Mô tả chi tiết
              </p>
              <p className="text-sm text-fg whitespace-pre-wrap leading-relaxed">
                {values.description || 'Chưa nhập mô tả chi tiết.'}
              </p>
            </div>

            {/* Basic specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/40 text-xs">
              {values.direction && (
                <div>
                  <span className="text-muted font-medium">
                    Hướng cửa chính:
                  </span>
                  <p className="font-semibold text-fg mt-0.5">
                    {values.direction}
                  </p>
                </div>
              )}
              {values.balconyDirection && (
                <div>
                  <span className="text-muted font-medium">
                    Hướng ban công:
                  </span>
                  <p className="font-semibold text-fg mt-0.5">
                    {values.balconyDirection}
                  </p>
                </div>
              )}
              {values.furniture && (
                <div>
                  <span className="text-muted font-medium">Nội thất:</span>
                  <p className="font-semibold text-fg mt-0.5">
                    {values.furniture}
                  </p>
                </div>
              )}
              {values.moveInTime && (
                <div>
                  <span className="text-muted font-medium">
                    Thời gian dọn vào:
                  </span>
                  <p className="font-semibold text-fg mt-0.5">
                    {values.moveInTime}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Media Preview & Policies */}
        <div className="space-y-6">
          {/* Gallery Preview */}
          <Card className="border-border/60 bg-muted/20">
            <CardContent className="p-4 space-y-3">
              <Label className="text-xs font-bold uppercase text-muted tracking-wider">
                Hình ảnh đã tải lên ({values.gallery?.length || 0})
              </Label>

              {values.gallery && values.gallery.length > 0 ? (
                <div className="space-y-2">
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                    <img
                      src={values.gallery[0]}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {values.gallery.length > 1 && (
                    <div className="grid grid-cols-4 gap-1.5">
                      {values.gallery.slice(1, 5).map((img, idx) => (
                        <div
                          key={img}
                          className="aspect-square rounded border border-border overflow-hidden relative bg-muted"
                        >
                          <img
                            src={img}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                          />
                          {idx === 3 && values.gallery.length > 5 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                              +{values.gallery.length - 5}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center border border-dashed border-border rounded-lg text-xs text-muted">
                  Chưa tải lên hình ảnh nào
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guidelines & Submit */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-destructive">
                  Điều khoản đăng tin
                </p>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li>
                    Tin đăng sẽ có thời hạn hoạt động là 30 ngày kể từ ngày
                    duyệt.
                  </li>
                  <li>
                    Mọi thông tin cần chính xác và phản ánh đúng thực tế căn hộ.
                  </li>
                  <li>
                    Ban quản trị (Staff) sẽ duyệt tin trong vòng tối đa 24h làm
                    việc.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-border/40">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={checked => setAgreed(!!checked)}
              />
              <label
                htmlFor="terms"
                className="text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Tôi cam kết thông tin cung cấp chính xác 100%.
              </label>
            </div>

            <Button
              className="w-full font-bold shadow-lg"
              disabled={
                !agreed ||
                isSubmitting ||
                !values.title ||
                !values.address ||
                !values.priceMonthly
              }
              onClick={onSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang gửi dữ liệu...
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
