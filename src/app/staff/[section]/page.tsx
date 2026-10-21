interface StaffSectionPageProps {
  params: Promise<{ section: string }>
}

/** Route marker: dashboard shell trong layout render nội dung theo `section`. */
export default async function StaffSectionPage({
  params,
}: StaffSectionPageProps): Promise<null> {
  await params
  return null
}
