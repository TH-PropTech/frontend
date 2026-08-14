import { Badge } from '@/shared/ui/badge'
import type { RentalApplicationStatus } from '../api/rental-application-api'
const LABELS: Record<RentalApplicationStatus, string> = {
  pending: 'Đang chờ',
  accepted: 'Đã chấp nhận',
  rejected: 'Đã từ chối',
}
export function ApplicationStatusBadge({
  status,
}: {
  status: RentalApplicationStatus
}): React.ReactElement {
  return (
    <Badge variant={status === 'rejected' ? 'destructive' : 'secondary'}>
      {LABELS[status]}
    </Badge>
  )
}
