import type {
  LegalSource,
  PlatformRegulation,
} from '../model/legal-governance-data'

export function makeLegalSource(
  overrides: Partial<LegalSource> = {}
): LegalSource {
  return {
    id: 'src-1004194',
    key: '1.004194',
    kind: 'procedure',
    code: 'TTHC 1.004194',
    title: 'Đăng ký tạm trú tại chỗ ở hợp pháp do thuê',
    subtitle: 'Thủ tục hành chính cấp Xã/Phường',
    agency: 'Công an Xã / Phường nơi có căn hộ',
    duration: '03 ngày làm việc',
    fee: 'Miễn phí khi nộp trực tuyến',
    externalUrl:
      'https://dichvucong.gov.vn/thu-tuc-hanh-chinh/019d2bf7-770b-734d-b7fb-5e1995f194f4',
    icon: 'residence',
    description: 'Người thuê đăng ký tạm trú trong 30 ngày.',
    dossierItems: [
      { title: 'Tờ khai CT01', detail: 'Kê khai trực tuyến' },
      {
        title: 'Hợp đồng thuê đã khóa SHA-256',
        detail: 'Trích xuất từ TH-PropTech',
        isPropTechExport: true,
      },
    ],
    steps: [{ step: 1, title: 'Nộp hồ sơ trực tuyến', detail: 'Qua VNeID' }],
    legalGrounds: [
      {
        title: 'Luật Cư trú số 68/2020/QH14',
        article: 'Điều 27',
        url: 'https://vanban.chinhphu.vn/?pageid=27160&docid=200519',
      },
    ],
    notes: ['Hạn 30 ngày kể từ ngày nhận bàn giao.'],
    showInContractPanel: true,
    isActive: true,
    order: 1,
    ...overrides,
  }
}

export const TAX_SOURCE = makeLegalSource({
  id: 'src-1007689',
  key: '1.007689',
  code: 'TTHC 1.007689',
  title: 'Khai thuế đối với cá nhân cho thuê tài sản',
  externalUrl:
    'https://dichvucong.gov.vn/thu-tuc-hanh-chinh/019d2bfc-2d93-73ec-ba2f-8d6aef8f7950',
  icon: 'tax',
  legalGrounds: [],
  order: 2,
})

export const HOUSING_LAW_SOURCE = makeLegalSource({
  id: 'src-housing',
  key: 'housing-law-2023',
  kind: 'legal_text',
  code: 'Luật số 27/2023/QH15',
  title: 'Luật Nhà ở 2023',
  externalUrl:
    'https://vanban.chinhphu.vn/default.aspx?pageid=27160&docid=209627',
  icon: 'law',
  legalGrounds: [],
  order: 3,
})

export const PANEL_SOURCES: LegalSource[] = [
  makeLegalSource(),
  TAX_SOURCE,
  HOUSING_LAW_SOURCE,
]

export function makeRegulation(
  overrides: Partial<PlatformRegulation> = {}
): PlatformRegulation {
  return {
    id: 'reg-1',
    code: 'REG-RES-01',
    title: 'Bắt buộc đăng ký Tạm trú trực tuyến trong 30 ngày',
    summary: 'Người thuê phối hợp chủ nhà đăng ký tạm trú.',
    category: 'residence',
    severity: 'mandatory',
    scope: ['all'],
    linkedSourceKey: '1.004194',
    checklistItems: [{ id: 'chk-ct01', label: 'Kê khai mẫu CT01' }],
    order: 1,
    isActive: true,
    isDefault: true,
    ...overrides,
  }
}

export const REGULATIONS: PlatformRegulation[] = [
  makeRegulation(),
  makeRegulation({
    id: 'reg-2',
    code: 'REG-TAX-02',
    title: 'Kê khai thuế cho thuê tài sản',
    summary: 'Doanh thu trên 100 triệu/năm phải kê khai.',
    category: 'tax-finance',
    linkedSourceKey: '1.007689',
    order: 2,
  }),
  makeRegulation({
    id: 'reg-3',
    code: 'REG-FIRE-03',
    title: 'Trang bị bình chữa cháy',
    summary: 'Tiêu chuẩn PCCC căn hộ.',
    category: 'fire-safety',
    severity: 'recommended',
    linkedSourceKey: null,
    checklistItems: [],
    order: 3,
  }),
]
