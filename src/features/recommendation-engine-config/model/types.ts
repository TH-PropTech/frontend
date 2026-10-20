export type EngineStrategy = 'hybrid' | 'map' | 'weighted' | 'map-weighted'

export interface EngineConfig {
  strategy: EngineStrategy
  alpha: number
  nbWeight: number
  ruleWeight: number
  updatedAt?: string
  updatedBy?: string
}

export interface UpdateEngineConfigDto {
  strategy: EngineStrategy
  alpha: number
  nbWeight: number
  ruleWeight: number
}

export interface StrategyInfo {
  id: EngineStrategy
  /** Tên dễ hiểu hiển thị chính. */
  name: string
  /** Tên kỹ thuật (hiển thị nhỏ, cho người cần tra cứu). */
  technicalName: string
  badge: string
  description: string
  details: string
}

export const STRATEGY_DEFINITIONS: readonly StrategyInfo[] = [
  {
    id: 'hybrid',
    name: 'Cân bằng',
    technicalName: 'Hybrid NB + Rule-based',
    badge: 'Mặc định',
    description:
      'Gợi ý căn hộ dựa trên lịch sử "người giống bạn đã thuê căn nào", cộng với bộ quy tắc nghiệp vụ (giá vừa túi tiền, đúng khu vực, đủ tiện ích).',
    details:
      'Nên dùng mặc định. Cân bằng giữa dữ liệu thực tế và kinh nghiệm nghiệp vụ.',
  },
  {
    id: 'map',
    name: 'Thận trọng khi ít dữ liệu',
    technicalName: 'MAP Bayesian (Dirichlet Prior)',
    badge: 'Dữ liệu ít',
    description:
      'Giống mặc định nhưng cho phép chỉnh mức "thận trọng" (α) khi dữ liệu lịch sử còn ít.',
    details:
      'Nên dùng khi hệ thống mới chạy, nhiều căn hộ mới có rất ít lượt thuê.',
  },
  {
    id: 'weighted',
    name: 'Ưu tiên tiêu chí quan trọng',
    technicalName: 'Feature Weighted Naive Bayes',
    badge: 'Tự đo mức quan trọng',
    description:
      'Tự đo từ dữ liệu xem tiêu chí nào (quận, số phòng, gym, bãi xe) quan trọng hơn, rồi cho tiêu chí đó nặng ký hơn.',
    details:
      'Nên dùng khi đã có khá nhiều lịch sử thuê để đo được mức quan trọng.',
  },
  {
    id: 'map-weighted',
    name: 'Nâng cao (gộp cả hai)',
    technicalName: 'MAP + Feature Weighting',
    badge: 'Nâng cao',
    description:
      'Gộp cả hai: vừa thận trọng với dữ liệu ít (α), vừa ưu tiên tiêu chí quan trọng.',
    details:
      'Đầy đủ nhất, nhưng cần đủ dữ liệu để phần trọng số tiêu chí có ý nghĩa.',
  },
]
