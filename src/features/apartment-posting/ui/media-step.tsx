import * as React from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { ApartmentFormValues } from '../model/types'
import { uploadApartmentImages } from '../api/apartment-posting-api'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { toast } from 'sonner'
import { ImagePlus, Trash2, Video, Globe, Loader2 } from 'lucide-react'
interface MediaStepProps {
  form: UseFormReturn<ApartmentFormValues, unknown, ApartmentFormValues>
}

export function MediaStep({ form }: MediaStepProps): React.ReactElement {
  const { watch, setValue, register } = form
  const gallery = watch('gallery') || []
  const images360 = watch('images360') || []
  const [isUploading, setIsUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length === 0) return

    // Limit to 20 images
    if (gallery.length + files.length > 20) {
      toast.error('Chỉ được tải lên tối đa 20 ảnh!')
      return
    }

    setIsUploading(true)
    const toastId = toast.loading('Đang tải lên hình ảnh...')
    try {
      const urls = await uploadApartmentImages(files)
      setValue('gallery', [...gallery, ...urls], { shouldValidate: true })
      toast.success(`Đã tải lên thành công ${urls.length} ảnh!`, {
        id: toastId,
      })
    } catch (err) {
      console.error('Upload error:', err)
      toast.error('Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại!', {
        id: toastId,
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const removeImage = (urlToRemove: string) => {
    setValue(
      'gallery',
      gallery.filter(url => url !== urlToRemove),
      { shouldValidate: true }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <ImagePlus className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-fg">
          Hình ảnh & Trực quan 3D
        </h3>
      </div>

      {/* Upload Zone */}
      <div className="space-y-4">
        <Label>Hình ảnh thực tế căn hộ (Tối đa 20 ảnh) *</Label>

        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer transition bg-background/30 hover:bg-muted/30 flex flex-col items-center justify-center min-h-48 ${
            isUploading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="space-y-2 flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-sm font-medium text-muted">
                Đang tải ảnh lên hệ thống...
              </p>
            </div>
          ) : (
            <div className="space-y-2 flex flex-col items-center">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <ImagePlus className="h-8 w-8" />
              </div>
              <p className="text-sm font-semibold text-fg">
                Click để chọn ảnh từ máy tính hoặc kéo thả vào đây
              </p>
              <p className="text-xs text-muted">
                Hỗ trợ định dạng JPG, PNG, WEBP tối đa 10MB/ảnh
              </p>
            </div>
          )}
        </div>

        {/* Preview Gallery Grid */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
            {gallery.map((url, index) => (
              <div
                key={url}
                className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-muted"
              >
                <img
                  src={url}
                  alt={`Apartment preview ${index + 1}`}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-2 right-2 p-1.5 bg-destructive/80 text-white rounded-md opacity-0 group-hover:opacity-100 transition shadow hover:bg-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded">
                    Ảnh bìa
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trực quan 3D & VR */}
      <div className="space-y-4 pt-4 border-t border-border/60">
        <Label className="flex items-center gap-1.5 font-medium text-fg">
          <Globe className="h-4 w-4 text-primary" />
          Tham quan ảo 3D & VR Tour (Tùy chọn)
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Link VR */}
          <div className="space-y-2">
            <Label htmlFor="vrUrl" className="flex items-center gap-1">
              <Video className="h-4 w-4 text-muted-foreground" />
              Liên kết Matterport / VR 3D Tour URL
            </Label>
            <Input
              id="vrUrl"
              placeholder="https://my.matterport.com/show/?m=..."
              className="bg-background/50 backdrop-blur-sm border-border"
              {...register('vrUrl')}
            />
          </div>

          {/* Link hình 360 */}
          <div className="space-y-2">
            <Label htmlFor="images360" className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Ảnh chụp toàn cảnh 360° (Dải phân cách bằng dấu phẩy)
            </Label>
            <Input
              id="images360"
              placeholder="Nhập link ảnh 360 (ngăn cách bởi dấu phẩy)"
              className="bg-background/50 backdrop-blur-sm border-border"
              onChange={e => {
                const urls = e.target.value
                  .split(',')
                  .map(s => s.trim())
                  .filter(Boolean)
                setValue('images360', urls)
              }}
              value={images360.join(', ')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
