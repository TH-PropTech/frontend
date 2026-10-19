import { apiClient } from '@/shared/api/api-client'
import type { ApartmentFormValues, LandlordApartmentItem } from '../model/types'
import type { ApiProjectItem } from '@/entities/properties/model/types'

function sanitizeApartmentPayload(
  values: ApartmentFormValues
): Record<string, unknown> {
  const sanitizedPackages = values.rentalPackages?.map(pkg => {
    // Strip computed / read-only fields returned from API to avoid validation errors
    const cleanPackage = { ...(pkg as Record<string, unknown>) }
    delete cleanPackage.resolvedDepositAmount
    delete cleanPackage.resolvedHoldingDepositAmount
    delete cleanPackage.resolvedSecurityTopUpAmount
    delete cleanPackage.resolvedPrepaidRentMonths
    delete cleanPackage.resolvedPrepaidRentAmount
    return cleanPackage
  })

  return {
    ...values,
    priceMonthly: values.priceMonthly * 1000000,
    ...(sanitizedPackages ? { rentalPackages: sanitizedPackages } : {}),
  }
}

export async function createApartment(
  values: ApartmentFormValues
): Promise<LandlordApartmentItem> {
  // Convert priceMonthly back to absolute VND (e.g. 10 million -> 10,000,000)
  const payload = sanitizeApartmentPayload(values)
  return apiClient.post<LandlordApartmentItem>('/apartments', payload)
}

export async function uploadApartmentImages(files: File[]): Promise<string[]> {
  const formData = new FormData()
  files.forEach(file => {
    formData.append('images', file)
  })
  const response = await apiClient.post<{ urls: string[] }>(
    '/apartments/upload',
    formData
  )
  return response.urls
}

export async function searchProjects(query: string): Promise<ApiProjectItem[]> {
  return apiClient.get<ApiProjectItem[]>(
    `/projects?search=${encodeURIComponent(query)}`
  )
}

export async function updateApartment(
  id: string,
  values: ApartmentFormValues
): Promise<LandlordApartmentItem> {
  const payload = sanitizeApartmentPayload(values)
  return apiClient.patch<LandlordApartmentItem>(`/apartments/${id}`, payload)
}

export async function resubmitApartment(
  id: string,
  values: ApartmentFormValues
): Promise<LandlordApartmentItem> {
  const payload = sanitizeApartmentPayload(values)
  return apiClient.patch<LandlordApartmentItem>(
    `/apartments/${id}/resubmit`,
    payload
  )
}

export async function renewApartment(
  id: string
): Promise<LandlordApartmentItem> {
  return apiClient.patch<LandlordApartmentItem>(`/apartments/${id}/renew`, {})
}

export async function getMyListings(): Promise<LandlordApartmentItem[]> {
  return apiClient.get<LandlordApartmentItem[]>(
    '/apartments/my-listings?format=landlord'
  )
}
