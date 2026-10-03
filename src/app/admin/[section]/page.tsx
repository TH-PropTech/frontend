interface AdminSectionPageProps {
  params: Promise<{ section: string }>
}

export default async function AdminSectionPage({
  params,
}: AdminSectionPageProps): Promise<null> {
  await params
  return null
}
