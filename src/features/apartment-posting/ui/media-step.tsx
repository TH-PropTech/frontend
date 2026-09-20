import * as React from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { ApartmentFormValues } from '../model/types'
import { uploadApartmentImages } from '../api/apartment-posting-api'
import { Label } from '@/shared/ui/label'
import { toast } from 'sonner'
import { ImagePlus, Trash2, Loader2 } from 'lucide-react'

// Khớp APARTMENT_IMAGE_MAX_COUNT / APARTMENT_IMAGE_MAX_BYTES ở backend.
const MAX_FILES_PER_UPLOAD = 10
const MAX_IMAGE_MB = 5
const MAX_GALLERY_IMAGES = 20

interface MediaStepProps {
  form: UseFormReturn<ApartmentFormValues, unknown, ApartmentFormValues>
}

export function MediaStep({ form }: MediaStepProps): React.ReactElement {
  const { watch, setValue } = form
  const gallery = watch('gallery') || []
  const [isUploading, setIsUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length === 0) return

    if (files.length > MAX_FILES_PER_UPLOAD) {
      toast.error(`Mỗi lần chỉ tải lên tối đa ${MAX_FILES_PER_UPLOAD} ảnh!`)
      return
    }
    if (gallery.length + files.length > MAX_GALLERY_IMAGES) {
      toast.error(`Chỉ được tải lên tối đa ${MAX_GALLERY_IMAGES} ảnh!`)
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
        <h3 className="text-lg font-semibold text-fg">Hình ảnh căn hộ</h3>
      </div>

      {/* Upload Zone */}
      <div className="space-y-4">
        <Label>
          Hình ảnh thực tế căn hộ (Tối đa {MAX_GALLERY_IMAGES} ảnh) *
        </Label>

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
                Hỗ trợ định dạng JPG, PNG, WEBP tối đa {MAX_IMAGE_MB}MB/ảnh, mỗi
                lần chọn tối đa {MAX_FILES_PER_UPLOAD} ảnh
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
    </div>
  )
}
