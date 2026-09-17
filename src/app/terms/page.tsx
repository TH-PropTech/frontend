import type { Metadata } from 'next'
import {
  getCurrentLegalTerms,
  getPublicPolicies,
  TermsDocument,
} from '@/features/legal-terms'

export const metadata: Metadata = {
  title: 'Điều khoản dịch vụ — TH PropTech',
  description:
    'Văn bản quy định điều khoản dịch vụ thuê căn hộ chung cư, căn cứ pháp lý theo Luật Nhà ở 2023 và thủ tục cư trú công dân.',
}

export const dynamic = 'force-dynamic'

export default async function TermsPage(): Promise<React.ReactElement> {
  let terms = null
  let policies: Awaited<ReturnType<typeof getPublicPolicies>> = []

  try {
    const [termsRes, policiesRes] = await Promise.all([
      getCurrentLegalTerms(),
      getPublicPolicies(),
    ])
    terms = termsRes
    policies = policiesRes
  } catch {
    // Graceful fallback if backend is not ready
  }

  if (!terms) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-fg">Điều khoản Dịch vụ</h1>
        <p className="mt-3 text-sm text-muted">
          Hệ thống đang chuẩn bị bản công bố điều khoản dịch vụ chính thức. Vui
          lòng quay lại sau.
        </p>
      </div>
    )
  }

  return <TermsDocument terms={terms} policies={policies} />
}
