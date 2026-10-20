import type { EngineStrategy } from './types'

/**
 * Nội dung giải thích (nút "i") cho từng chiến lược gợi ý.
 * Công thức bám sát backend `naive-bayes.engine.ts` — sửa engine thì sửa cả file này.
 */

export interface ExplainerReference {
  /** Trích dẫn đầy đủ (tác giả, năm, tên, nơi xuất bản). */
  citation: string
  /** Vị trí cụ thể trong tài liệu (mục, phương trình). */
  locator?: string
  /** Phần nào của hệ thống dựa vào tài liệu này. */
  usedFor: string
  url?: string
}

export interface ExplainerSymbol {
  symbol: string
  meaning: string
}

export interface StrategyExplainer {
  title: string
  /** Giải thích bằng lời thường, không cần biết toán. */
  plain: readonly string[]
  /** Ví dụ có số cụ thể. */
  example: { title: string; steps: readonly string[] }
  whenToUse: string
  /** Giới hạn / điểm cần lưu ý trung thực. */
  caveats: readonly string[]
  formula: readonly string[]
  symbols: readonly ExplainerSymbol[]
  references: readonly ExplainerReference[]
}

const REF_NB_LAPLACE: ExplainerReference = {
  citation:
    'Manning, C. D., Raghavan, P. & Schütze, H. (2008). Introduction to Information Retrieval. Cambridge University Press.',
  locator:
    'Mục 13.2 "Naive Bayes text classification": PT (116) xác suất tiên nghiệm P(c) = N_c / N; PT (119) làm mịn cộng 1 (Laplace) cho P(t|c); cộng log thay vì nhân xác suất (ngay trước PT 115).',
  usedFor:
    'Cách tính Naive Bayes, phép làm mịn Laplace và việc cộng log xác suất.',
  url: 'https://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html',
}

const REF_GAUSSIAN: ExplainerReference = {
  citation:
    'John, G. H. & Langley, P. (1995). Estimating Continuous Distributions in Bayesian Classifiers. Proceedings of the 11th Conference on Uncertainty in Artificial Intelligence (UAI-95), tr. 338–345.',
  locator:
    'Bài báo so sánh giả định phân phối chuẩn (Gaussian) với ước lượng mật độ kernel cho biến liên tục trong Naive Bayes. Hệ thống dùng phương án Gaussian.',
  usedFor: 'Đường cong chuông cho tuổi và thu nhập.',
  url: 'https://arxiv.org/abs/1302.4964',
}

const REF_HYBRID: ExplainerReference = {
  citation:
    'Burke, R. (2002). Hybrid Recommender Systems: Survey and Experiments. User Modeling and User-Adapted Interaction, 12(4), 331–370.',
  locator:
    'Phần phân loại 7 kiểu hệ gợi ý lai; kiểu "Weighted": điểm của nhiều kỹ thuật gợi ý được kết hợp thành một điểm duy nhất.',
  usedFor:
    'Trộn điểm học máy (NB%) với điểm quy tắc (Rule%) theo tỷ lệ wNB / wRule.',
}

const REF_DIRICHLET: ExplainerReference = {
  citation:
    'Murphy, K. P. (2012). Machine Learning: A Probabilistic Perspective. MIT Press.',
  locator:
    'Mục 3.4 "The Dirichlet-multinomial model" (likelihood, prior Dirichlet, posterior, 3.4.4 "Posterior predictive").',
  usedFor:
    'Cơ sở lý thuyết của tham số α: công thức (đếm + α) / (tổng + α·V) chính là xác suất dự đoán hậu nghiệm dưới tiên nghiệm Dirichlet(α).',
}

const REF_ADDITIVE: ExplainerReference = {
  citation:
    'Wikipedia — "Additive smoothing" (tài liệu tổng quan, tham khảo phụ).',
  usedFor:
    'Tra nhanh công thức làm mịn cộng thêm α và liên hệ với tiên nghiệm Dirichlet.',
  url: 'https://en.wikipedia.org/wiki/Additive_smoothing',
}

const REF_MI: ExplainerReference = {
  citation:
    'Cover, T. M. & Thomas, J. A. (2006). Elements of Information Theory (2nd ed.). Wiley.',
  locator:
    'Mục 2.3 "Relative Entropy and Mutual Information" — định nghĩa I(X;Y).',
  usedFor: 'Công thức Thông tin tương hỗ để đo mức quan trọng của tiêu chí.',
}

const REF_WNB_RULE: ExplainerReference = {
  citation:
    'Zhou, X., Wu, D., You, Z., Zhang, L. & Ye, N. (2022). A General Framework for Adaptive Two-Index Fusion Attribute Weighted Naive Bayes. arXiv:2202.11963.',
  locator:
    'PT (4): luật phân lớp Naive Bayes có trọng số ĉ = argmax P(c)·∏ P(xⱼ|c)^wⱼ; PT (8): I(Aⱼ; C) = Σ P(aⱼ, c)·log[P(aⱼ, c) / (P(aⱼ)P(c))].',
  usedFor:
    'Dạng công thức chính xác hệ thống dùng: trọng số là số mũ của xác suất (tương đương nhân wⱼ vào log), trọng số lấy từ MI giữa tiêu chí và nhãn.',
  url: 'https://arxiv.org/abs/2202.11963',
}

const REF_WNB_MI: ExplainerReference = {
  citation:
    'Jiang, L., Zhang, L., Li, C. & Wu, J. (2019). A Correlation-Based Feature Weighting Filter for Naive Bayes. IEEE Transactions on Knowledge and Data Engineering, 31(2), 201–213. DOI: 10.1109/TKDE.2018.2836440.',
  locator:
    'Đặt trọng số tiêu chí dựa trên Thông tin tương hỗ giữa tiêu chí và nhãn (kèm trừ phần trùng lặp giữa các tiêu chí).',
  usedFor:
    'Cơ sở cho việc dùng MI làm trọng số. Hệ thống dùng bản đơn giản hơn: chỉ MI tiêu chí–căn hộ, chuẩn hóa tổng = 1, không trừ phần trùng lặp.',
  url: 'https://doi.org/10.1109/TKDE.2018.2836440',
}

const REF_WNB: ExplainerReference = {
  citation:
    "Zhang, H. & Sheng, S. (2004). Learning Weighted Naive Bayes with Accurate Ranking. Proceedings of the 4th IEEE International Conference on Data Mining (ICDM'04), tr. 567–570. DOI: 10.1109/ICDM.2004.10030.",
  locator:
    'Đề xuất Naive Bayes có trọng số tiêu chí; bài báo dùng gain ratio (không phải MI) để tính trọng số.',
  usedFor:
    'Ý tưởng gốc "tiêu chí quan trọng hơn được tính nặng hơn" trong Naive Bayes.',
  url: 'https://doi.org/10.1109/ICDM.2004.10030',
}

const SYMBOLS_BASE: readonly ExplainerSymbol[] = [
  { symbol: 'Bᵢ', meaning: 'Căn hộ thứ i đang được chấm điểm' },
  { symbol: 'nᵢ', meaning: 'Số lượt căn hộ Bᵢ đã được thuê trong lịch sử' },
  { symbol: 'N', meaning: 'Tổng số lượt thuê của toàn hệ thống' },
  { symbol: 'K', meaning: 'Tổng số căn hộ' },
  {
    symbol: 'xⱼ',
    meaning:
      'Một tiêu chí của khách: quận muốn ở, số phòng ngủ, cần gym, cần bãi xe',
  },
  {
    symbol: 'Vⱼ',
    meaning:
      'Số lựa chọn khác nhau của tiêu chí j (vd: gym có 2 lựa chọn Có/Không)',
  },
  {
    symbol: '𝒩(·)',
    meaning:
      'Đường cong chuông: tuổi/thu nhập càng gần mức trung bình của người từng thuê căn đó thì càng khớp',
  },
]

const SYMBOL_ALPHA: ExplainerSymbol = {
  symbol: 'α',
  meaning:
    'Số "lượt thuê ảo" cộng thêm cho mọi lựa chọn. Chỉnh ở ô Dirichlet Prior Alpha',
}

const SYMBOL_W: ExplainerSymbol = {
  symbol: 'wⱼ',
  meaning: 'Trọng số (mức quan trọng) của tiêu chí j, 4 trọng số cộng lại = 1',
}

const SYMBOL_MI: ExplainerSymbol = {
  symbol: 'I(Xⱼ; B)',
  meaning:
    'Thông tin tương hỗ: biết tiêu chí j của khách giúp đoán được căn họ thuê tốt cỡ nào',
}

export const STRATEGY_EXPLAINERS: Record<EngineStrategy, StrategyExplainer> = {
  hybrid: {
    title: 'Cân bằng (Hybrid Naive Bayes + Quy tắc)',
    plain: [
      'Hệ thống tự hỏi: "Những khách trước đây giống người này (tuổi, thu nhập, quận muốn ở, số phòng, cần gym/bãi xe) đã thuê căn nào?". Căn nào được nhiều người giống họ thuê thì điểm học máy cao.',
      'Song song, hệ thống chấm điểm theo kinh nghiệm nghiệp vụ: giá có vừa túi tiền không, có đúng quận không, có đủ phòng và tiện ích không.',
      'Điểm cuối = trộn hai phần theo tỷ lệ bạn chọn ở thanh trượt (mặc định 50/50).',
      'Làm mịn Laplace: nếu một căn chưa từng có khách nào chọn tiêu chí đó, hệ thống vẫn cộng 1 "lượt ảo" để căn đó không bị loại oan về 0 điểm.',
    ],
    example: {
      title: 'Ví dụ: khách muốn thuê ở Quận 7 (lịch sử có 5 quận khác nhau)',
      steps: [
        'Căn A đã được thuê 10 lần, 8 lần là khách muốn Quận 7 → (8 + 1) / (10 + 5) = 0,60.',
        'Căn B đã được thuê 5 lần, chưa lần nào khách muốn Quận 7. Không làm mịn sẽ ra 0/5 = 0 (loại hẳn). Có Laplace → (0 + 1) / (5 + 5) = 0,10, vẫn còn cơ hội.',
        'Làm tương tự cho số phòng, gym, bãi xe, tuổi, thu nhập rồi nhân lại → căn có tích lớn nhất được 100%, các căn khác tính tương đối so với căn đó.',
      ],
    },
    whenToUse: 'Lựa chọn mặc định, ổn định cho hầu hết trường hợp.',
    caveats: [
      'Coi 4 tiêu chí (quận, phòng, gym, bãi xe) quan trọng ngang nhau.',
      'Sách Manning et al. tính xác suất tiên nghiệm không làm mịn (P(c) = N_c / N). Hệ thống cộng thêm 1 cho cả tiên nghiệm để căn chưa có lượt thuê nào không bị 0 điểm. Đây là mở rộng của đề tài.',
      'Căn có giá thuê > 50% thu nhập của khách bị loại trước khi chấm điểm.',
    ],
    formula: [
      'P(Bᵢ) = (nᵢ + 1) / (N + K)',
      'P(xⱼ | Bᵢ) = (số lần khách thuê Bᵢ chọn xⱼ + 1) / (nᵢ + Vⱼ)',
      'log L(Bᵢ) = log P(Bᵢ) + log 𝒩(tuổi) + log 𝒩(thu nhập) + Σⱼ log P(xⱼ | Bᵢ)',
      'NB%(Bᵢ) = exp(log L(Bᵢ) − max log L) × 100',
      'Điểm khớp = wNB × NB% + wRule × Rule%',
    ],
    symbols: [
      ...SYMBOLS_BASE,
      {
        symbol: 'wNB, wRule',
        meaning: 'Tỷ lệ trộn ở thanh trượt, cộng lại = 1',
      },
    ],
    references: [REF_NB_LAPLACE, REF_GAUSSIAN, REF_HYBRID],
  },

  map: {
    title: 'Thận trọng khi ít dữ liệu (MAP Bayesian / Dirichlet Prior)',
    plain: [
      'Giống chiến lược mặc định, nhưng thay vì luôn cộng đúng 1 "lượt thuê ảo", bạn tự chọn số lượt ảo α.',
      'α lớn → hệ thống thận trọng hơn, không vội tin vào vài lượt thuê lẻ tẻ. α nhỏ → tin dữ liệu thật nhiều hơn.',
      'Hữu ích khi hệ thống mới, nhiều căn hộ chỉ có 1–2 lượt thuê, dễ bị kết luận vội.',
    ],
    example: {
      title: 'Ví dụ: căn C mới có đúng 1 lượt thuê, người đó cần gym',
      steps: [
        'Không làm mịn: 1/1 = 100% → hệ thống kết luận vội "ai thuê căn C cũng cần gym".',
        'α = 1 (giống Laplace): (1 + 1) / (1 + 2) ≈ 0,67.',
        'α = 3: (1 + 3) / (1 + 6) ≈ 0,57 → bớt cực đoan hơn.',
        'α = 0,1: (1 + 0,1) / (1 + 0,2) ≈ 0,92 → gần như tin hoàn toàn vào 1 lượt thuê.',
      ],
    },
    whenToUse:
      'Dữ liệu lịch sử thuê còn ít hoặc phân bố không đều giữa các căn.',
    caveats: [
      'Về mặt học thuật, công thức hệ thống đang dùng là "kỳ vọng hậu nghiệm" (posterior mean) của Dirichlet(α), tức làm mịn cộng thêm α. Ước lượng MAP chuẩn sẽ là (đếm + α − 1) / (nᵢ + α·Vⱼ − Vⱼ). Tên "MAP" được giữ theo thiết kế ban đầu.',
      'Khi α tăng, hệ thống cũng nới độ biến thiên tối thiểu của tuổi (max(0,1; 0,5·α)) để tránh đường cong chuông quá hẹp.',
    ],
    formula: [
      'P(Bᵢ) = (nᵢ + α) / (N + α·K)',
      'P(xⱼ | Bᵢ) = (số lần khách thuê Bᵢ chọn xⱼ + α) / (nᵢ + α·Vⱼ)',
      'log L(Bᵢ) = log P(Bᵢ) + log 𝒩(tuổi) + log 𝒩(thu nhập) + Σⱼ log P(xⱼ | Bᵢ)',
      'α = 1 ⇒ trùng với Laplace của chiến lược mặc định',
    ],
    symbols: [...SYMBOLS_BASE, SYMBOL_ALPHA],
    references: [REF_DIRICHLET, REF_NB_LAPLACE, REF_ADDITIVE],
  },

  weighted: {
    title: 'Ưu tiên tiêu chí quan trọng (Naive Bayes có trọng số)',
    plain: [
      'Không phải tiêu chí nào cũng quan trọng như nhau. Ví dụ "quận muốn ở" thường quyết định căn được thuê nhiều hơn "có cần gym không".',
      'Hệ thống tự đo trên lịch sử thuê: biết một tiêu chí của khách thì đoán được căn họ thuê chính xác đến đâu. Tiêu chí nào đoán tốt hơn thì được trọng số cao hơn.',
      'Trọng số tự cập nhật mỗi lần hệ thống học lại (retrain), không cần ai nhập tay.',
    ],
    example: {
      title: 'Ví dụ: kết quả đo trên lịch sử thuê',
      steps: [
        'Mức thông tin đo được: Quận 0,9 · Số phòng 0,4 · Gym 0,1 · Bãi xe 0,1 (tổng 1,5).',
        'Trọng số = mức thông tin / tổng → Quận 60% · Số phòng 27% · Gym 7% · Bãi xe 7%.',
        'Khi chấm một căn, điểm khớp quận được tính nặng gần gấp 9 lần điểm khớp gym.',
      ],
    },
    whenToUse:
      'Đã có khá nhiều lịch sử thuê (càng nhiều, trọng số đo được càng đáng tin).',
    caveats: [
      'Trọng số chỉ áp cho 4 tiêu chí quận, phòng, gym, bãi xe. Tuổi và thu nhập vẫn tính bình thường.',
      'Nếu dữ liệu không đủ để đo (tổng thông tin ≈ 0), hệ thống tự dùng trọng số đều 25% mỗi tiêu chí.',
      'Phần làm mịn giữ nguyên Laplace (α = 1).',
    ],
    formula: [
      'I(Xⱼ; B) = Σ p(b, x) · ln[ p(b, x) / (p(b) · p(x)) ]',
      'wⱼ = I(Xⱼ; B) / Σₖ I(Xₖ; B)',
      'log L(Bᵢ) = log P(Bᵢ) + log 𝒩(tuổi) + log 𝒩(thu nhập) + Σⱼ wⱼ · log P(xⱼ | Bᵢ)',
    ],
    symbols: [...SYMBOLS_BASE, SYMBOL_MI, SYMBOL_W],
    references: [REF_MI, REF_WNB_RULE, REF_WNB_MI, REF_WNB],
  },

  'map-weighted': {
    title: 'Nâng cao (thận trọng + ưu tiên tiêu chí)',
    plain: [
      'Gộp hai cải tiến ở trên vào một: vừa thận trọng với căn ít dữ liệu (số lượt ảo α), vừa ưu tiên tiêu chí quan trọng (trọng số tự đo).',
      'Đây là chiến lược đầy đủ nhất, nhưng cần đủ dữ liệu để phần trọng số có ý nghĩa.',
    ],
    example: {
      title:
        'Ví dụ: căn C (1 lượt thuê, khách cần gym), α = 3, trọng số gym 7%',
      steps: [
        'Xác suất gym của căn C sau làm mịn: (1 + 3) / (1 + 6) ≈ 0,57.',
        'Vì gym chỉ chiếm 7% mức quan trọng, ảnh hưởng của tiêu chí này lên điểm cuối rất nhỏ.',
        'Ngược lại, tiêu chí quận (60%) sẽ chi phối thứ hạng.',
      ],
    },
    whenToUse:
      'Hệ thống đã vận hành một thời gian nhưng vẫn còn nhiều căn mới ít lượt thuê.',
    caveats: [
      'Kế thừa cả hai lưu ý: công thức α là làm mịn cộng thêm (posterior mean), và trọng số chỉ áp cho 4 tiêu chí phân loại.',
    ],
    formula: [
      'P(xⱼ | Bᵢ) = (số lần khách thuê Bᵢ chọn xⱼ + α) / (nᵢ + α·Vⱼ)',
      'wⱼ = I(Xⱼ; B) / Σₖ I(Xₖ; B)',
      'log L(Bᵢ) = log P(Bᵢ) + log 𝒩(tuổi) + log 𝒩(thu nhập) + Σⱼ wⱼ · log P(xⱼ | Bᵢ)',
    ],
    symbols: [...SYMBOLS_BASE, SYMBOL_ALPHA, SYMBOL_MI, SYMBOL_W],
    references: [REF_DIRICHLET, REF_MI, REF_WNB_RULE, REF_WNB_MI],
  },
}

/** Giải thích phần điểm quy tắc nghiệp vụ (dùng chung cho mọi chiến lược). */
export const RULE_SCORE_EXPLAINER: StrategyExplainer = {
  title: 'Bảng kiểm quy tắc (Rule-based)',
  plain: [
    'Bên cạnh học máy, mỗi căn hộ được chấm theo một bảng kiểm (checklist) giống cách một nhân viên tư vấn có kinh nghiệm sẽ đánh giá.',
    'Bảng kiểm có tối đa 110 điểm, sau đó quy ra phần trăm (Rule%).',
    'Rule% được trộn với điểm học máy (NB%) theo thanh trượt "Tỷ lệ trọng số NB vs Rule-based".',
  ],
  example: {
    title:
      'Ví dụ: khách 27 tuổi, thu nhập 20 triệu, muốn Quận 7, 2 phòng ngủ, cần gym',
    steps: [
      'Căn D: giá 5 triệu (25% thu nhập) → Tài chính 35 điểm.',
      'Đúng Quận 7 → Vị trí 30 điểm.',
      '2 phòng ngủ đúng yêu cầu → 15 điểm. Có gym → 10 điểm. Khách không cần bãi xe → 0 điểm.',
      'Căn dành cho độ tuổi 25–50, khách 27 tuổi → 10 điểm.',
      'Tổng 100 / 110 → Rule% ≈ 90,9%. Nếu NB% = 80% và tỷ lệ 50/50 → điểm khớp ≈ 85,5%.',
    ],
  },
  whenToUse:
    'Luôn được tính. Kéo thanh trượt về 0% NB nếu muốn chỉ dùng quy tắc.',
  caveats: [
    'Các ngưỡng (15% / 30% / 35% thu nhập) và số điểm mỗi mục là heuristic nghiệp vụ do đề tài tự đặt, không phải kết quả học máy hay chuẩn lấy từ tài liệu.',
    'Căn có giá > 50% thu nhập bị loại hẳn, không được gợi ý.',
  ],
  formula: [
    'Tài chính: giá/thu nhập ∈ [15%, 30%] → 35 · < 15% → 25 · > 30% → 10',
    'Vị trí: đúng quận → 30 · quận giáp ranh → 18 · khác → 0',
    'Số phòng: khớp → 15 · lệch Δ phòng → max(0, 15 − 5·Δ)',
    'Tiện ích: cần gym & có → +10 · cần gym & không có → −5 · không cần & có → +5 · cần bãi xe & có → +10 (tổng tiện ích ≥ 0)',
    'Độ tuổi: trong khoảng tuổi mục tiêu của căn → 10',
    'Phạt: giá/thu nhập > 35% → trừ min(35, (tỷ lệ − 35%) × 150)',
    'Rule% = tổng điểm / 110 × 100',
  ],
  symbols: [
    {
      symbol: 'giá/thu nhập',
      meaning: 'Tỷ lệ tiền thuê hằng tháng trên thu nhập hằng tháng của khách',
    },
    {
      symbol: 'quận giáp ranh',
      meaning: 'Theo bản đồ hành chính TP.HCM được khai báo sẵn trong hệ thống',
    },
  ],
  references: [REF_HYBRID],
}

/** Giới thiệu chung về Naive Bayes — hiển thị ngay trên trang, trước phần chọn chiến lược. */
export const NAIVE_BAYES_INTRO = {
  title: 'Hệ thống gợi ý căn hộ hoạt động thế nào?',
  lead: 'Lõi của hệ thống là thuật toán Naive Bayes (đọc: "nê-ý bây-ơ"): dựa vào lịch sử, đoán xem khách có đặc điểm như thế này thì nhiều khả năng sẽ thuê căn nào.',
  steps: [
    {
      title: 'Học từ lịch sử thuê',
      body: 'Với mỗi căn, hệ thống đếm xem những người từng thuê căn đó thường ở độ tuổi nào, thu nhập bao nhiêu, muốn quận nào, mấy phòng ngủ, có cần gym hoặc bãi xe không.',
    },
    {
      title: 'Chấm điểm từng căn cho khách mới',
      body: 'Khách mới càng giống những người từng thuê căn nào thì căn đó điểm càng cao. "Naive" (ngây thơ) nghĩa là hệ thống coi các đặc điểm độc lập với nhau để phép tính đơn giản, nhanh.',
    },
    {
      title: 'Trộn với bảng kiểm quy tắc',
      body: 'Điểm học từ dữ liệu được trộn với điểm bảng kiểm nghiệp vụ (giá vừa túi tiền, đúng khu vực, đủ phòng, tiện ích) theo tỷ lệ bạn chọn ở thanh trượt.',
    },
    {
      title: 'Xếp hạng và gợi ý',
      body: 'Căn nào có điểm khớp cao nhất được gợi ý đầu tiên, kèm lý do ngắn gọn cho khách.',
    },
  ],
  formulaTitle: 'Công thức cốt lõi của Naive Bayes',
  formula: [
    'P(căn B | khách x) ∝ P(B) × P(x₁ | B) × P(x₂ | B) × … × P(xₙ | B)',
    'Căn được gợi ý = căn B có vế phải lớn nhất',
  ],
  formulaSymbols: [
    {
      symbol: 'P(B)',
      meaning: 'Độ "hot" của căn B: tỷ lệ lượt thuê của B trên tổng lượt thuê',
    },
    {
      symbol: 'P(xⱼ | B)',
      meaning:
        'Trong những người từng thuê B, bao nhiêu phần trăm có đặc điểm xⱼ giống khách này (cùng quận, cùng số phòng…)',
    },
    {
      symbol: '∝',
      meaning:
        'Tỷ lệ thuận: chỉ cần so sánh các căn với nhau nên không cần tính mẫu số',
    },
    {
      symbol: '×',
      meaning: 'Nhân lại: khớp càng nhiều đặc điểm thì điểm càng cao',
    },
  ],
  formulaNote:
    'Khi chạy thật, hệ thống cộng log của các xác suất thay vì nhân (tránh số quá nhỏ) và dùng đường cong chuông cho tuổi và thu nhập. Chi tiết từng cách tính xem ở nút ⓘ của mỗi lựa chọn bên dưới.',
  references: [
    {
      citation:
        'Manning, C. D., Raghavan, P. & Schütze, H. (2008). Introduction to Information Retrieval, Mục 13.2 "Naive Bayes text classification". Cambridge University Press.',
      usedFor:
        'Dạng công thức: chọn lớp có P(c) nhân tích các P(đặc điểm | c) lớn nhất; cộng log thay vì nhân xác suất.',
      url: 'https://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html',
    },
    {
      citation:
        'Wikipedia — "Naive Bayes classifier" (tổng quan, tham khảo phụ).',
      usedFor:
        'Giải thích giả định "ngây thơ" (các đặc điểm độc lập) và định lý Bayes.',
      url: 'https://en.wikipedia.org/wiki/Naive_Bayes_classifier',
    },
  ] as readonly ExplainerReference[],
} as const

/** Dữ liệu hệ thống khai thác — đối chiếu `recommendations.service.ts` (retrainModel, feedback). */
export const NAIVE_BAYES_DATA_SOURCE = {
  title: 'Hệ thống lấy dữ liệu gì để học?',
  intro:
    'Hệ thống học từ bảng "lịch sử thuê". Mỗi dòng là một lần có khách ưng một căn, ghi lại 6 thông tin của khách và căn họ chọn:',
  fields: [
    { field: 'Tuổi', example: '27' },
    { field: 'Thu nhập hằng tháng', example: '20.000.000 đ' },
    { field: 'Quận muốn ở', example: 'Quận 7' },
    { field: 'Số phòng ngủ muốn thuê', example: '2' },
    { field: 'Cần phòng gym không', example: 'Có (1) / Không (0)' },
    { field: 'Cần bãi xe không', example: 'Có (1) / Không (0)' },
    { field: 'Căn đã chọn', example: 'Căn A' },
  ],
  notes: [
    'Mỗi lần khách bấm "Thích" một căn được gợi ý, hệ thống thêm 1 dòng vào lịch sử rồi học lại ngay. "Không thích" chỉ được ghi nhận, không dùng để học.',
    'Chỉ các căn đang ở trạng thái "available" mới được đem ra chấm điểm và gợi ý.',
    'Càng nhiều dòng lịch sử, các con số đếm càng đáng tin.',
  ],
} as const

export const NAIVE_BAYES_PARTS = {
  title: 'Mỗi phần của công thức được tính thế nào?',
  parts: [
    {
      name: 'P(B): căn B "hot" cỡ nào',
      words: '(số lượt thuê của B + 1) ÷ (tổng lượt thuê + số căn)',
      note: 'Căn nào nhiều người thuê hơn thì điểm khởi đầu cao hơn. Cộng 1 để căn chưa ai thuê vẫn có cơ hội.',
    },
    {
      name: 'P(xⱼ | B): người thuê B có giống khách này ở tiêu chí j không',
      words:
        '(số người thuê B có đúng tiêu chí đó + 1) ÷ (số người thuê B + số lựa chọn của tiêu chí)',
      note: 'Áp dụng cho quận, số phòng, gym, bãi xe. Ví dụ tiêu chí gym có 2 lựa chọn (có / không).',
    },
    {
      name: 'Tuổi và thu nhập',
      words:
        'Dùng đường cong chuông quanh mức trung bình của những người đã thuê B',
      note: 'Khách càng gần mức tuổi/thu nhập điển hình của người thuê căn đó thì điểm càng cao. Ví dụ dưới đây bỏ qua hai mục này cho gọn.',
    },
  ],
} as const

export const NAIVE_BAYES_EXAMPLE = {
  title: 'Ví dụ thực tế: chọn giữa 2 căn A và B',
  setup:
    'Lịch sử có 10 lượt thuê: 6 lượt thuê căn A, 4 lượt thuê căn B. Hệ thống đếm được:',
  table: {
    columns: ['Số liệu đếm được', 'Căn A (6 lượt)', 'Căn B (4 lượt)'],
    rows: [
      ['Khách muốn Quận 7', '4 người', '0 người'],
      ['Khách muốn 2 phòng ngủ', '5 người', '1 người'],
      ['Khách cần gym', '3 người', '1 người'],
    ],
  },
  guest:
    'Khách mới đến: muốn Quận 7, 2 phòng ngủ, có cần gym. (Trong lịch sử có 3 quận, 3 loại số phòng; gym có 2 lựa chọn.)',
  steps: [
    {
      label: 'Độ "hot"',
      a: 'P(A) = (6 + 1) ÷ (10 + 2) = 7/12 ≈ 0,58',
      b: 'P(B) = (4 + 1) ÷ (10 + 2) = 5/12 ≈ 0,42',
    },
    {
      label: 'Muốn Quận 7',
      a: '(4 + 1) ÷ (6 + 3) = 5/9 ≈ 0,56',
      b: '(0 + 1) ÷ (4 + 3) = 1/7 ≈ 0,14',
    },
    {
      label: 'Muốn 2 phòng ngủ',
      a: '(5 + 1) ÷ (6 + 3) = 6/9 ≈ 0,67',
      b: '(1 + 1) ÷ (4 + 3) = 2/7 ≈ 0,29',
    },
    {
      label: 'Cần gym',
      a: '(3 + 1) ÷ (6 + 2) = 4/8 = 0,50',
      b: '(1 + 1) ÷ (4 + 2) = 2/6 ≈ 0,33',
    },
    {
      label: 'Nhân lại',
      a: '0,58 × 0,56 × 0,67 × 0,50 ≈ 0,108',
      b: '0,42 × 0,14 × 0,29 × 0,33 ≈ 0,0057',
    },
  ],
  result: [
    'Căn A có tích lớn nhất nên được 100%. Căn B chỉ bằng 0,0057 ÷ 0,108 ≈ 5%. Đây là điểm học từ dữ liệu (NB%).',
    'Giả sử bảng kiểm quy tắc chấm A được 80%, B được 60%. Với tỷ lệ 50/50: A = 0,5 × 100 + 0,5 × 80 = 90% · B = 0,5 × 5 + 0,5 × 60 ≈ 33%. Hệ thống gợi ý A trước.',
  ],
  whyPlusOne:
    'Vì sao cộng 1? Nếu không cộng, căn B có "0 người muốn Quận 7" sẽ ra 0 ÷ 4 = 0 và cả tích bị nhân với 0: căn B bị loại hẳn chỉ vì chưa ai từng thuê B ở Quận 7. Cộng 1 chỉ làm điểm thấp đi chứ không loại hẳn.',
  note: 'Số liệu minh họa để dễ hiểu, không phải dữ liệu thật của hệ thống.',
} as const
