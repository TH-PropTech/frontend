import * as React from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { ApartmentFormValues } from '../model/types'
import { locationData } from '@/entities/properties/model/mocks'
import { searchProjects, searchBuildings } from '../api/apartment-posting-api'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { MapPin, Building, Folder } from 'lucide-react'
interface LocationStepProps {
  form: UseFormReturn<ApartmentFormValues, unknown, ApartmentFormValues>
}

export function LocationStep({ form }: LocationStepProps): React.ReactElement {
  const { register, watch, setValue } = form

  const city = watch('city')
  const district = watch('district')
  const ward = watch('ward')
  const street = watch('street')
  const address = watch('address')
  const projectName = watch('projectName')
  const projectId = watch('projectId')
  const buildingName = watch('buildingName')

  // Suggestion lists state
  const [projectSuggestions, setProjectSuggestions] = React.useState<
    Array<{ id: string; name: string }>
  >([])
  const [buildingSuggestions, setBuildingSuggestions] = React.useState<
    Array<{ id: string; name: string }>
  >([])
  const [showProjList, setShowProjList] = React.useState(false)
  const [showBuildList, setShowBuildList] = React.useState(false)
  const [isLoadingProj, setIsLoadingProj] = React.useState(false)
  const [isLoadingBuild, setIsLoadingBuild] = React.useState(false)

  const cities = Object.keys(locationData)
  const districts =
    city && locationData[city] ? Object.keys(locationData[city]) : []
  const wards =
    city && district && locationData[city]?.[district]
      ? locationData[city][district].wards || []
      : []
  const mockStreets =
    city && district && locationData[city]?.[district]
      ? locationData[city][district].streets || []
      : []

  // Auto-fill address field
  React.useEffect(() => {
    const parts = [street, ward, district, city].filter(Boolean)
    setValue('address', parts.join(', '), { shouldValidate: true })
  }, [city, district, ward, street, setValue])

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
        setProjectSuggestions(results.map(r => ({ id: r.id, name: r.name })))
      } catch (err) {
        console.error('Error searching projects:', err)
      } finally {
        setIsLoadingProj(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [projectName])

  // Search buildings on input change
  React.useEffect(() => {
    if (!buildingName || buildingName.trim() === '') {
      setTimeout(() => setBuildingSuggestions([]), 0)
      return
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoadingBuild(true)
      try {
        const results = await searchBuildings(
          buildingName,
          projectId || undefined
        )
        setBuildingSuggestions(results.map(r => ({ id: r.id, name: r.name })))
      } catch (err) {
        console.error('Error searching buildings:', err)
      } finally {
        setIsLoadingBuild(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [buildingName, projectId])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-fg">Địa chỉ & Vị trí</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Quận/Huyện */}
        <div className="space-y-2">
          <Label htmlFor="district">Quận / Huyện *</Label>
          <Select
            value={district}
            disabled={!city}
            onValueChange={val => {
              setValue('district', val, { shouldValidate: true })
              setValue('ward', '')
              setValue('street', '')
            }}
          >
            <SelectTrigger
              id="district"
              className="bg-background/50 backdrop-blur-sm border-border"
            >
              <SelectValue
                placeholder={
                  city ? 'Chọn Quận / Huyện' : 'Vui lòng chọn Tỉnh/Thành trước'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {districts.map(d => (
                <SelectItem key={d} value={d}>
                  {d}
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
            disabled={!district}
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
                  district
                    ? 'Chọn Phường / Xã'
                    : 'Vui lòng chọn Quận/Huyện trước'
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
            placeholder="Số nhà, Tên đường, Phường, Quận, Thành phố"
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
                      setShowProjList(false)
                    }}
                  >
                    {proj.name}
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Tòa nhà */}
        <div className="space-y-2 relative">
          <Label htmlFor="buildingName" className="flex items-center gap-1.5">
            <Building className="h-4 w-4 text-muted-foreground" />
            Tòa nhà / Block (Tùy chọn)
          </Label>
          <Input
            id="buildingName"
            placeholder="Nhập để tìm kiếm hoặc tạo mới tòa nhà..."
            className="bg-background/50 backdrop-blur-sm border-border"
            autoComplete="off"
            {...register('buildingName')}
            onFocus={() => setShowBuildList(true)}
            onBlur={() => setTimeout(() => setShowBuildList(false), 200)}
          />
          {showBuildList &&
            (buildingName ||
              isLoadingBuild ||
              buildingSuggestions.length > 0) && (
              <div className="absolute z-10 w-full bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                {isLoadingBuild && (
                  <div className="p-2 text-sm text-muted-foreground">
                    Đang tải...
                  </div>
                )}
                {!isLoadingBuild &&
                  buildingSuggestions.length === 0 &&
                  buildingName.trim() !== '' && (
                    <div
                      className="p-2 text-sm text-primary font-medium cursor-pointer hover:bg-muted"
                      onClick={() => {
                        setValue('buildingId', null)
                        setShowBuildList(false)
                      }}
                    >
                      + Tạo mới tòa nhà: &quot;{buildingName}&quot;
                    </div>
                  )}
                {buildingSuggestions.map(b => (
                  <div
                    key={b.id}
                    className="p-2 text-sm text-fg cursor-pointer hover:bg-muted"
                    onClick={() => {
                      setValue('buildingName', b.name)
                      setValue('buildingId', b.id)
                      setShowBuildList(false)
                    }}
                  >
                    {b.name}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
