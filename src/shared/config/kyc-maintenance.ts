export const KYC_MAINTENANCE_MESSAGE =
  'Dịch vụ eKYC đang tạm bảo trì. Vui lòng thử lại sau.'

export function assertKycAvailable(maintenanceMode: boolean): void {
  if (maintenanceMode) {
    throw new Error(KYC_MAINTENANCE_MESSAGE)
  }
}
