import type { ApartmentPostingSchemaType } from './apartment-posting-schema'

export type ApartmentFormValues = ApartmentPostingSchemaType

export interface LandlordApartmentItem {
  id: string
  title: string
  category: string
  description: string
  ownershipCertificate?: string | null
  location: string
  city: string
  district: string
  ward: string
  street: string
  address: string
  priceMonthly: number
  area: number
  bedrooms: number
  bathrooms: number
  direction: string
  balconyDirection: string
  furniture: string
  moveInTime: string
  electricity: string
  water: string
  internet: string
  gallery: string[]
  images360: string[]
  vrUrl: string
  amenities: string[]
  status: 'pending' | 'available' | 'rejected' | 'expired' | 'unavailable'
  rejectedReason: string | null
  submittedAt: string | null
  approvedAt: string | null
  expiresAt: string | null
  projectName: string
  projectId: string | null
  buildingName: string
  buildingId: string | null
  rentalPackages?: ApartmentPostingSchemaType['rentalPackages']
}
