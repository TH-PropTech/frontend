import { AdminContractCommercialEditor } from '@/features/contracts'

interface AdminContractEditorPageProps {
  params: Promise<{ id: string }>
}

export default async function AdminContractEditorPage({
  params,
}: AdminContractEditorPageProps): Promise<React.ReactElement> {
  const { id } = await params
  return <AdminContractCommercialEditor contractId={id} />
}
