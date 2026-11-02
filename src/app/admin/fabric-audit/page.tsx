import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trung tâm kiểm toán lưu vết',
  description:
    'Giám sát sức khỏe Hyperledger Fabric, độ phủ bằng chứng và đối soát sổ cái dành cho quản trị viên và nhân viên vận hành.',
}

/**
 * Route marker for `/admin/fabric-audit`. The admin layout already enforces the `admin`/`staff` role
 * gate and the dashboard shell (`widgets/staff-dashboard`) hosts the Audit Center view in its main
 * area, exactly like the other tab-based admin sections, so this page renders nothing of its own.
 */
export default function FabricAuditPage(): null {
  return null
}
