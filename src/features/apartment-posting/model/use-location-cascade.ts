/* eslint-disable react-hooks/set-state-in-effect */
import * as React from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import type { ApartmentFormValues } from './types'

interface ProvinceData {
  name: string
  code: number
}

interface DistrictData {
  name: string
  code: number
}

interface WardData {
  name: string
  code: number
}

interface ApiProvinceResponse {
  name: string
  code: number
  districts?: DistrictData[]
}

interface ApiDistrictResponse {
  name: string
  code: number
  wards?: WardData[]
}

interface UseLocationCascadeProps {
  city: string
  district: string
  setValue: UseFormSetValue<ApartmentFormValues>
}

export function useLocationCascade({
  city,
  district,
  setValue,
}: UseLocationCascadeProps) {
  // Real Administrative Divisions from Public provinces.open-api.vn
  const [provinces, setProvinces] = React.useState<
    Array<{ name: string; code: number }>
  >([])
  const [districtsList, setDistrictsList] = React.useState<
    Array<{ name: string; code: number }>
  >([])
  const [wardsList, setWardsList] = React.useState<
    Array<{ name: string; code: number }>
  >([])

  const cities = React.useMemo(() => provinces.map(p => p.name), [provinces])
  const districts = React.useMemo(
    () => districtsList.map(d => d.name),
    [districtsList]
  )
  const wards = React.useMemo(() => wardsList.map(w => w.name), [wardsList])

  // Helper to parse address strings
  const parseLocation = React.useCallback(
    (locStr?: string, fallbackCity?: string, fallbackDistrict?: string) => {
      const result = {
        street: '',
        ward: '',
        district: fallbackDistrict || '',
        city: fallbackCity || '',
      }

      if (!locStr) return result

      const parts = locStr.split(',').map(p => p.trim())

      if (parts.length >= 4) {
        result.street = parts[0] || ''
        result.ward = parts[1] || ''
        result.district = parts[2] || ''
        result.city = parts[3] || ''
      } else if (parts.length === 3) {
        result.ward = parts[0] || ''
        result.district = parts[1] || ''
        result.city = parts[2] || ''
      } else if (parts.length === 2) {
        result.district = parts[0] || ''
        result.city = parts[1] || ''
      } else if (parts.length === 1) {
        result.city = parts[0] || ''
      }

      return result
    },
    []
  )

  // 1. Fetch provinces on mount
  React.useEffect(() => {
    let active = true
    fetch('https://provinces.open-api.vn/api/p/')
      .then(res => res.json())
      .then(data => {
        if (active && Array.isArray(data)) {
          setProvinces(
            data.map((p: ProvinceData) => ({ name: p.name, code: p.code }))
          )
        }
      })
      .catch(err => {
        console.error('Error fetching provinces:', err)
        if (active) {
          // Fallback static list if offline
          setProvinces([
            { name: 'Thành phố Hồ Chí Minh', code: 79 },
            { name: 'Thành phố Hà Nội', code: 1 },
            { name: 'Tỉnh Đồng Nai', code: 75 },
          ])
        }
      })
    return () => {
      active = false
    }
  }, [])

  // Helper to match province code by name
  const getProvinceCode = React.useCallback(
    (name: string) => {
      if (!name) return null
      const search = name
        .toLowerCase()
        .replace(/^(tỉnh|thành phố)\s+/i, '')
        .trim()
      const found = provinces.find(p => {
        const pName = p.name
          .toLowerCase()
          .replace(/^(tỉnh|thành phố)\s+/i, '')
          .trim()
        return (
          pName === search ||
          (search === 'tp.hcm' && pName === 'hồ chí minh') ||
          (search === 'hồ chí minh' && pName === 'tp.hcm')
        )
      })
      return found ? found.code : null
    },
    [provinces]
  )

  // Helper to match district code by name
  const getDistrictCode = React.useCallback(
    (name: string) => {
      if (!name) return null
      const search = name
        .toLowerCase()
        .replace(/^(quận|huyện|thành phố|thị xã)\s+/i, '')
        .trim()
      const found = districtsList.find(d => {
        const dName = d.name
          .toLowerCase()
          .replace(/^(quận|huyện|thành phố|thị xã)\s+/i, '')
          .trim()
        return dName === search
      })
      return found ? found.code : null
    },
    [districtsList]
  )

  // 2. Fetch districts when city changes
  React.useEffect(() => {
    if (!city) {
      setDistrictsList([])
      return
    }

    const code = getProvinceCode(city)
    if (!code) return

    let active = true
    fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then(res => res.json())
      .then(data => {
        if (active && data && Array.isArray(data.districts)) {
          setDistrictsList(
            data.districts.map((d: DistrictData) => ({
              name: d.name,
              code: d.code,
            }))
          )
        }
      })
      .catch(err => {
        console.error('Error fetching districts:', err)
      })
    return () => {
      active = false
    }
  }, [city, getProvinceCode])

  // 3. Fetch wards when district changes
  React.useEffect(() => {
    if (!district || !city) {
      setWardsList([])
      return
    }

    const code = getDistrictCode(district)
    if (!code) return

    let active = true
    fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      .then(res => res.json())
      .then(data => {
        if (active && data && Array.isArray(data.wards)) {
          setWardsList(
            data.wards.map((w: WardData) => ({ name: w.name, code: w.code }))
          )
        }
      })
      .catch(err => {
        console.error('Error fetching wards:', err)
      })
    return () => {
      active = false
    }
  }, [district, city, getDistrictCode])

  // 4. Sequential Async Auto-fill for Project/Building Selection
  const autoFillAddress = React.useCallback(
    async (
      locStr?: string,
      fallbackCity?: string,
      fallbackDistrict?: string
    ) => {
      if (!locStr) return

      const parsed = parseLocation(locStr, fallbackCity, fallbackDistrict)
      if (!parsed.city) return

      let provCode: number | null = null
      let exactCity = ''

      let currentProvinces = provinces
      if (currentProvinces.length === 0) {
        try {
          const res = await fetch('https://provinces.open-api.vn/api/p/')
          currentProvinces = await res.json()
        } catch (e) {
          console.error(e)
        }
      }

      const searchCity = parsed.city
        .toLowerCase()
        .replace(/^(tỉnh|thành phố)\s+/i, '')
        .trim()
      const matchedProv = currentProvinces.find((p: ProvinceData) => {
        const pName = p.name
          .toLowerCase()
          .replace(/^(tỉnh|thành phố)\s+/i, '')
          .trim()
        return (
          pName === searchCity ||
          (searchCity === 'tp.hcm' && pName === 'hồ chí minh') ||
          (searchCity === 'hồ chí minh' && pName === 'tp.hcm')
        )
      })

      if (matchedProv) {
        provCode = matchedProv.code
        exactCity = matchedProv.name
        setValue('city', exactCity, { shouldValidate: true })
      } else {
        return
      }

      if (!provCode) return
      try {
        const res = await fetch(
          `https://provinces.open-api.vn/api/p/${provCode}?depth=2`
        )
        const provData = (await res.json()) as ApiProvinceResponse
        const districtsData = provData.districts || []

        setDistrictsList(
          districtsData.map((d: DistrictData) => ({
            name: d.name,
            code: d.code,
          }))
        )

        const searchDist = parsed.district
          .toLowerCase()
          .replace(/^(quận|huyện|thành phố|thị xã)\s+/i, '')
          .trim()
        const matchedDist = districtsData.find((d: DistrictData) => {
          const dName = d.name
            .toLowerCase()
            .replace(/^(quận|huyện|thành phố|thị xã)\s+/i, '')
            .trim()
          return dName === searchDist
        })

        if (matchedDist) {
          setValue('district', matchedDist.name, { shouldValidate: true })

          const distCode = matchedDist.code
          const resW = await fetch(
            `https://provinces.open-api.vn/api/d/${distCode}?depth=2`
          )
          const distData = (await resW.json()) as ApiDistrictResponse
          const wardsData = distData.wards || []

          setWardsList(
            wardsData.map((w: WardData) => ({ name: w.name, code: w.code }))
          )

          const searchWard = parsed.ward
            .toLowerCase()
            .replace(/^(phường|xã|thị trấn)\s+/i, '')
            .trim()
          const matchedWard = wardsData.find((w: WardData) => {
            const wName = w.name
              .toLowerCase()
              .replace(/^(phường|xã|thị trấn)\s+/i, '')
              .trim()
            return wName === searchWard
          })

          if (matchedWard) {
            setValue('ward', matchedWard.name, { shouldValidate: true })
          } else {
            setValue('ward', '')
          }
        } else {
          setValue('district', '')
          setValue('ward', '')
        }
      } catch (err) {
        console.error('Error in address auto-fill:', err)
      }

      if (parsed.street) {
        setValue('street', parsed.street, { shouldValidate: true })
      }
    },
    [provinces, parseLocation, setValue]
  )

  return {
    cities,
    districts,
    wards,
    autoFillAddress,
  }
}
