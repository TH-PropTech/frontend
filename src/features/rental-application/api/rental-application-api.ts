import { apiClient } from '@/shared/api'

export type RentalApplicationStatus = 'pending' | 'accepted' | 'rejected'
export interface CreateRentalApplicationInput {
  apartmentId: string
  occupants: number
  moveInDate: string
  leaseDurationMonths: number
  occupation: string
  hasPets: boolean
  notes?: string
}
export interface RentalApplicationItem extends CreateRentalApplicationInput {
  _id: string
  tenantId: string
  landlordId: string
  status: RentalApplicationStatus
  reasonCode: string | null
  actorId: string | null
  actorTimestamp: string | null
  createdAt: string
  updatedAt: string
}
export interface RentalApplicationList {
  items: RentalApplicationItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}
export async function createRentalApplication(
  input: CreateRentalApplicationInput
): Promise<RentalApplicationItem> {
  return apiClient.post<RentalApplicationItem>('/rental-applications', input)
}
export async function getMyRentalApplications(): Promise<RentalApplicationList> {
  return apiClient.get<RentalApplicationList>(
    '/rental-applications/mine?page=1&limit=20'
  )
}
export async function getReceivedRentalApplications(): Promise<RentalApplicationList> {
  return apiClient.get<RentalApplicationList>(
    '/rental-applications/received?page=1&limit=20'
  )
}
export async function respondToRentalApplication(
  id: string,
  input: { status: 'accepted' | 'rejected'; reasonCode: string }
): Promise<RentalApplicationItem> {
  return apiClient.patch<RentalApplicationItem>(
    `/rental-applications/${id}/respond`,
    input
  )
}
