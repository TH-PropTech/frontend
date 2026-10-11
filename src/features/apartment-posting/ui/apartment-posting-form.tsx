'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  apartmentPostingSchema,
  ensureRentalPackagesFallback,
} from '../model/apartment-posting-schema'
import type { ApartmentFormValues, LandlordApartmentItem } from '../model/types'
import {
  createApartment,
  updateApartment,
  resubmitApartment,
} from '../api/apartment-posting-api'
import { LocationStep } from './location-step'
import { DetailsStep } from './details-step'
import { MediaStep } from './media-step'
import { ReviewStep } from './review-step'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

interface ApartmentPostingFormProps {
  initialData?: LandlordApartmentItem | null
  mode?: 'create' | 'edit'
  noCard?: boolean
}

const STEPS = [
  { id: 1, name: 'Vị trí & Dự án' },
  { id: 2, name: 'Thông tin mô tả' },
  { id: 3, name: 'Hình ảnh & VR' },
  { id: 4, name: 'Xác nhận & Gửi' },
]

export function ApartmentPostingForm({
  initialData = null,
  mode = 'create',
  noCard = false,
}: ApartmentPostingFormProps): React.ReactElement {
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Map initial data to form fields
  const defaultValues: Partial<ApartmentFormValues> = React.useMemo(() => {
    if (initialData) {
      return {
        title: initialData.title || '',
        category: initialData.category || '',
        description: initialData.description || '',
        ownershipCertificate: initialData.ownershipCertificate || '',
        location: initialData.location || '',
        city: initialData.city || '',
        district: initialData.district || '',
        ward: initialData.ward || '',
        street: initialData.street || '',
        address: initialData.address || '',
        priceMonthly: initialData.priceMonthly
          ? initialData.priceMonthly / 1000000
          : 0,
        area: initialData.area || 0,
        bedrooms: initialData.bedrooms || 0,
        bathrooms: initialData.bathrooms || 0,
        direction: initialData.direction || '',
        balconyDirection: initialData.balconyDirection || '',
        furniture: initialData.furniture || '',
        moveInTime: initialData.moveInTime || '',
        electricity: initialData.electricity || '',
        water: initialData.water || '',
        internet: initialData.internet || '',
        gallery: initialData.gallery || [],
        amenities: initialData.amenities || [],
        projectName: initialData.projectName || '',
        projectId: initialData.projectId || null,
        buildingName: initialData.buildingName || '',
        buildingId: initialData.buildingId || null,
        rentalPackages: initialData.rentalPackages || [],
      }
    }

    return {
      title: '',
      category: '',
      description: '',
      ownershipCertificate: '',
      location: '',
      city: '',
      district: '',
      ward: '',
      street: '',
      address: '',
      priceMonthly: 0,
      rentalPackages: [],
      area: 0,
      bedrooms: 1,
      bathrooms: 1,
      direction: '',
      balconyDirection: '',
      furniture: '',
      moveInTime: '',
      electricity: 'Giá nhà nước',
      water: 'Giá nhà nước',
      internet: 'Cố định',
      gallery: [],
      amenities: [],
      projectName: '',
      projectId: null,
      buildingName: '',
      buildingId: null,
    }
  }, [initialData])

  const form = useForm<ApartmentFormValues, unknown, ApartmentFormValues>({
    resolver: zodResolver(apartmentPostingSchema) as unknown as Resolver<
      ApartmentFormValues,
      unknown,
      ApartmentFormValues
    >,
    defaultValues,
    mode: 'onChange',
  })

  const { trigger, getValues, handleSubmit } = form

  const handleNext = async () => {
    // Validate fields inside each step before advancing
    let fieldsToValidate: Array<keyof ApartmentFormValues> = []
    if (currentStep === 1) {
      fieldsToValidate = ['city', 'district', 'ward', 'street']
    } else if (currentStep === 2) {
      fieldsToValidate = [
        'title',
        'category',
        'priceMonthly',
        'area',
        'bedrooms',
        'bathrooms',
        'description',
      ]
    } else if (currentStep === 3) {
      const galleryVal = getValues('gallery')
      if (!galleryVal || galleryVal.length === 0) {
        toast.error('Vui lòng tải lên ít nhất 1 hình ảnh căn hộ!')
        return
      }
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate)
      if (!isValid) {
        toast.error('Vui lòng hoàn thành chính xác các trường bắt buộc (*)')
        return
      }
    }

    setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const onSubmitForm = async () => {
    const rawValues = getValues()
    const packagesWithFallback = ensureRentalPackagesFallback(
      rawValues.priceMonthly,
      rawValues.rentalPackages
    )
    const values: ApartmentFormValues = {
      ...rawValues,
      rentalPackages: packagesWithFallback,
    }
    setIsSubmitting(true)
    const toastId = toast.loading(
      mode === 'edit' ? 'Đang cập nhật bài đăng...' : 'Đang tạo bài đăng mới...'
    )

    try {
      if (mode === 'edit' && initialData) {
        if (initialData.status === 'rejected') {
          await resubmitApartment(initialData.id, values)
          toast.success('Cập nhật và nộp duyệt lại tin đăng thành công!', {
            id: toastId,
          })
        } else {
          await updateApartment(initialData.id, values)
          toast.success('Cập nhật tin đăng thành công!', {
            id: toastId,
          })
        }
      } else {
        await createApartment(values)
        toast.success(
          'Đăng bài thành công! Bài đăng đang chờ Staff kiểm duyệt.',
          { id: toastId }
        )
      }

      // Redirect back to profile page and activate the 'listings' tab
      router.push('/profile?tab=listings')
    } catch (err: unknown) {
      console.error('Submission failed:', err)
      const msg =
        err instanceof Error
          ? err.message
          : 'Gửi tin đăng thất bại. Vui lòng thử lại!'
      toast.error(msg, { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={
        noCard
          ? 'w-full max-w-4xl mx-auto bg-transparent'
          : 'w-full max-w-4xl mx-auto shadow-lg border border-border bg-surface rounded-2xl'
      }
    >
      <div className={noCard ? 'pb-4' : 'pb-4 p-6'}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-fg">
              {mode === 'edit'
                ? 'Chỉnh sửa tin đăng cho thuê'
                : 'Đăng tin cho thuê căn hộ'}
            </h1>
            <p className="text-sm text-muted">
              Đăng tin tiếp cận hàng ngàn khách thuê nhanh chóng và an toàn.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110'
                        : currentStep > step.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="hidden md:inline text-xs font-medium ml-1.5 text-muted-foreground">
                    {step.name}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-4 md:w-8 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div
        className={
          noCard
            ? 'pt-6 border-t border-border'
            : 'pt-6 border-t border-border p-6'
        }
      >
        {/* Render Steps */}
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {currentStep === 1 && <LocationStep form={form} />}
          {currentStep === 2 && <DetailsStep form={form} />}
          {currentStep === 3 && <MediaStep form={form} />}
          {currentStep === 4 && (
            <ReviewStep
              form={form}
              onSubmit={onSubmitForm}
              isSubmitting={isSubmitting}
              submitButtonText={
                mode === 'edit'
                  ? 'Nộp lại & Yêu cầu duyệt'
                  : 'Gửi bài đăng chờ duyệt'
              }
            />
          )}

          {/* Navigation Controls */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="gap-1 border-border bg-surface hover:bg-surface-muted"
              >
                <ChevronLeft className="h-4 w-4" />
                Quay lại
              </Button>

              <Button
                type="button"
                onClick={handleNext}
                className="gap-1 shadow"
              >
                Tiếp tục
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
