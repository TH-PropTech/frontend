import type { Metadata } from 'next'
import { CommunityDashboard } from '@/widgets/community-dashboard'

export const metadata: Metadata = {
  title: 'Cộng đồng cư dân',
  description:
    'Thảo luận, hỏi đáp và trao đổi ý kiến cùng cư dân và chủ nhà tại TH PropTech.',
}

export default function CommunityPage(): React.ReactElement {
  return <CommunityDashboard />
}
