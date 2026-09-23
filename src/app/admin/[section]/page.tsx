import { OwnershipTransferPanel } from '@/features/property-ownership-transfer'

interface AdminSectionPageProps {
  params: Promise<{ section: string }>
}

export default async function AdminSectionPage({
  params,
}: AdminSectionPageProps): Promise<React.ReactElement | null> {
  const { section } = await params

  if (section !== 'ownership-transfer') return null

  return <OwnershipTransferPanel />
}
