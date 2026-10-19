import * as React from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { ApartmentFormValues } from '../model/types'
import { searchProjects } from '../api/apartment-posting-api'
import { useLocationCascade } from '../model/use-location-cascade'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { MapPin, Folder } from 'lucide-react'
import type { ApiProjectItem } from '@/entities/properties/model/types'

interface LocationStepProps {
  form: UseFormReturn<ApartmentFormValues, unknown, ApartmentFormValues>
}

export function LocationStep({ form }: LocationStepProps): React.ReactElement {
  const { register, watch, setValue } = form

  const city = watch('city')
  const ward = watch('ward')
  const street = watch('street')
  const address = watch('address')
  const projectName = watch('projectName')

  // Suggestion lists state - now storing the full API item objects
  const [projectSuggestions, setProjectSuggestions] = React.useState<
    ApiProjectItem[]
  >([])
  const [showProjList, setShowProjList] = React.useState(false)
  const [isLoadingProj, setIsLoadingProj] = React.useState(false)

  // Use custom hook to load Vietnamese administrative divisions & handle cascading auto-fill
  const { cities, wards, autoFillAddress } = useLocationCascade({
    city,
    setValue,
  })

  const mockStreets: string[] = []

  // Auto-fill address field
  React.useEffect(() => {
    const parts = [street, ward, city].filter(Boolean)
    setValue('address', parts.join(', '), { shouldValidate: true })
  }, [city, ward, street, setValue])

  // Search projects on input change
  React.useEffect(() => {
    if (!projectName || projectName.trim() === '') {
      setTimeout(() => setProjectSuggestions([]), 0)
      return
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoadingProj(true)
      try {
        const results = await searchProjects(projectName)
        setProjectSuggestions(results)
      } catch (err) {
        console.error('Error searching projects:', err)
      } finally {
        setIsLoadingProj(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [projectName])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-fg">Địa chỉ & Vị trí</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tỉnh/Thành phố */}
        <div className="space-y-2">
          <Label htmlFor="city">Tỉnh / Thành phố *</Label>
          <Select
            value={city}
            onValueChange={val => {
              setValue('city', val, { shouldValidate: true })
              setValue('district', '')
              setValue('ward', '')
              setValue('street', '')
            }}
          >
            <SelectTrigger
              id="city"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue placeholder="Chọn Tỉnh / Thành phố" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(c => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Phường/Xã */}
        <div className="space-y-2">
          <Label htmlFor="ward">Phường / Xã *</Label>
          <Select
            value={ward}
            disabled={!city}
            onValueChange={val =>
              setValue('ward', val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="ward"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue
                placeholder={
                  city ? 'Chọn Phường / Xã' : 'Vui lòng chọn Tỉnh/Thành trước'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {wards.map(w => (
                <SelectItem key={w} value={w}>
                  {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tên đường */}
        <div className="space-y-2">
          <Label htmlFor="street">Đường / Phố *</Label>
          <Input
            id="street"
            placeholder="Nhập tên đường, số nhà..."
            className="bg-background/50 backdrop-blur-sm border-border"
            list="streets-list"
            {...register('street', { required: true })}
          />
          <datalist id="streets-list">
            {mockStreets.map(s => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>

        {/* Địa chỉ hiển thị */}
        <div className="space-y-2">
          <Label htmlFor="address">
            Địa chỉ hiển thị chi tiết (Tự động cập nhật)
          </Label>
          <Input
            id="address"
            placeholder="Số nhà, Tên đường, Phường/Xã, Tỉnh/Thành phố"
            disabled
            className="bg-muted border-border cursor-not-allowed"
            value={address}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dự án */}
        <div className="space-y-2 relative">
          <Label htmlFor="projectName" className="flex items-center gap-1.5">
            <Folder className="h-4 w-4 text-muted-foreground" />
            Dự án / Khu đô thị (Tùy chọn)
          </Label>
          <Input
            id="projectName"
            placeholder="Nhập để tìm kiếm hoặc tạo mới dự án..."
            className="bg-background/50 backdrop-blur-sm border-border"
            autoComplete="off"
            {...register('projectName')}
            onFocus={() => setShowProjList(true)}
            onBlur={() => setTimeout(() => setShowProjList(false), 200)}
          />
          {showProjList &&
            (projectName || isLoadingProj || projectSuggestions.length > 0) && (
              <div className="absolute z-10 w-full bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                {isLoadingProj && (
                  <div className="p-2 text-sm text-muted-foreground">
                    Đang tải...
                  </div>
                )}
                {!isLoadingProj &&
                  projectSuggestions.length === 0 &&
                  projectName.trim() !== '' && (
                    <div
                      className="p-2 text-sm text-primary font-medium cursor-pointer hover:bg-muted"
                      onClick={() => {
                        setValue('projectId', null)
                        setShowProjList(false)
                      }}
                    >
                      + Tạo mới dự án: &quot;{projectName}&quot;
                    </div>
                  )}
                {projectSuggestions.map(proj => (
                  <div
                    key={proj.id}
                    className="p-2 text-sm text-fg cursor-pointer hover:bg-muted"
                    onClick={() => {
                      setValue('projectName', proj.name)
                      setValue('projectId', proj.id)
                      autoFillAddress(proj.location, proj.city)
                      setShowProjList(false)
                    }}
                  >
                    {proj.name}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
