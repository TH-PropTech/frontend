import { apiClient } from '@/shared/api'

export interface AdminWalletView {
  userId: string
  status: 'linked' | 'unlinked'
  simulation: boolean
  bank: { code: string; name: string } | null
  accountHolder: string | null
  accountNumberMasked: string | null
  linkedAt: string | null
}

export interface LandlordWalletItem {
  userId: string
  name: string
  email: string
  wallet: AdminWalletView
}

export interface LandlordWalletPage {
  items: LandlordWalletItem[]
  total: number
  page: number
  limit: number
}

export interface PlatformEscrowWallet {
  accountNumber: string
  accountName: string
  availableBalance: number
  heldBalance: number
  currency: string
  status: string
}

export function getLandlordWallets(
  page = 1,
  limit = 20
): Promise<LandlordWalletPage> {
  return apiClient.get<LandlordWalletPage>(
    `/admin/wallets/landlords?page=${page}&limit=${limit}`
  )
}

export function getPlatformWallet(): Promise<PlatformEscrowWallet> {
  return apiClient.get<PlatformEscrowWallet>('/admin/wallets/platform')
}
