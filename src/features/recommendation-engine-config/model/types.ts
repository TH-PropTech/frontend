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
  name: string
  badge: string
  description: string
  details: string
}

export const STRATEGY_DEFINITIONS: readonly StrategyInfo[] = [
  {
    id: 'hybrid',
    name: 'Hybrid NB + Rule-based',
    badge: 'Mặc định (Laplace)',
    description:
      'Kết hợp Naive Bayes cổ điển với Laplace smoothing và bộ tiêu chuẩn quy tắc 4 trụ cột.',
    details:
      'Phù hợp trong hầu hết trường hợp, cân bằng ổn định giữa xác suất tiên nghiệm và quy tắc nghiệp vụ.',
  },
  {
    id: 'map',
    name: 'MAP Bayesian (Dirichlet Prior)',
    badge: 'Bayesian MAP',
    description:
      'Dùng Dirichlet prior cho phân phối phân loại và ước lượng hậu nghiệm cực đại.',
    details:
      'Tối ưu khi dữ liệu thuê lịch sử còn thưa (sparse data), cho phép điều chỉnh siêu tham số alpha.',
  },
  {
    id: 'weighted',
    name: 'Feature Weighted Naive Bayes',
    badge: 'Mutual Info',
    description:
      'Trọng số hóa đặc trưng dựa trên Thông tin tương hỗ (Mutual Information - MI).',
    details:
      'Đo lường mức độ quan trọng thực tế của từng đặc trưng (quận, phòng, gym, bãi xe) thay vì coi ngang hàng.',
  },
  {
    id: 'map-weighted',
    name: 'MAP + Feature Weighting (Kết hợp)',
    badge: 'Tối tân nhất',
    description:
      'Kết hợp cả Dirichlet prior alpha và trọng số thông tin tương hỗ MI cho từng đặc trưng.',
    details:
      'Chiến lược toàn diện nhất, vừa xử lý làm mịn dữ liệu thưa vừa tối ưu hóa độ đóng góp của từng đặc trưng.',
  },
]
