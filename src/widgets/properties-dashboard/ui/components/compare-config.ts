import * as React from 'react'
import { ApartmentItem } from '@/entities/properties'

export interface CompareColor {
  border: string
  bg: string
  text: string
  fill: string
  name: string
}

export const itemColors: CompareColor[] = [
  {
    border: 'border-t-primary',
    bg: 'bg-primary/5',
    text: 'text-primary',
    fill: '#C65A3A',
    name: 'Màu Cam',
  },
  {
    border: 'border-t-blue-500',
    bg: 'bg-blue-500/5',
    text: 'text-blue-500',
    fill: '#3B82F6',
    name: 'Màu Xanh Dương',
  },
  {
    border: 'border-t-emerald-500',
    bg: 'bg-emerald-500/5',
    text: 'text-emerald-500',
    fill: '#10B981',
    name: 'Màu Xanh Lá',
  },
  {
    border: 'border-t-amber-500',
    bg: 'bg-amber-500/5',
    text: 'text-amber-500',
    fill: '#F59E0B',
    name: 'Màu Vàng',
  },
]

export function getColor(idx: number): CompareColor {
  return itemColors[idx % itemColors.length] ?? itemColors[0]!
}

export interface CompareCriterion {
  key: string
  label: string
  explain: string
  getValue: (apt: ApartmentItem) => React.ReactNode
  isWinner?: (apt: ApartmentItem) => boolean
  winnerText?: string
  getAnalysis?: (apartments: ApartmentItem[]) => string
}

/** Điểm kiểm duyệt: 100 nếu tin đã được nhân viên hệ thống kiểm duyệt, 0 nếu chưa. */
export function getVerifiedScore(apt: ApartmentItem): number {
  return apt.isVerified ? 100 : 0
}

export function buildCriteria(
  compareApartments: ApartmentItem[],
  getUnitPrice: (apt: ApartmentItem) => number
): CompareCriterion[] {
  return [
    {
      key: 'price',
      label: 'Giá thuê',
      explain:
        'Giá thuê hàng tháng cố định chưa bao gồm điện nước và phí dịch vụ. Căn hộ có giá thuê thấp nhất sẽ được đánh dấu là tốt nhất.',
      getValue: (apt: ApartmentItem) => apt.price,
      isWinner: (apt: ApartmentItem) => {
        const val = apt.priceNum ?? 999
        const prices = compareApartments.map(a => a.priceNum ?? 999)
        return val === Math.min(...prices)
      },
      winnerText: 'Giá tốt nhất',
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const sorted = [...apts].sort(
          (a, b) => (a.priceNum ?? 999) - (b.priceNum ?? 999)
        )
        const cheapest = sorted[0]!
        const dearest = sorted[sorted.length - 1]!
        const diff = (dearest.priceNum ?? 0) - (cheapest.priceNum ?? 0)
        if (diff === 0)
          return 'Tất cả các căn hộ so sánh đều đồng mức giá thuê hàng tháng.'
        return `Căn "${cheapest.title}" tiết kiệm chi phí nhất, giúp bạn giữ lại được ${diff.toFixed(1)} triệu VND/tháng so với căn cao nhất ("${dearest.title}").`
      },
    },
    {
      key: 'area',
      label: 'Diện tích',
      explain:
        'Diện tích thông thủy sử dụng của căn hộ tính bằng mét vuông. Diện tích rộng giúp không gian sinh hoạt thoải mái hơn.',
      getValue: (apt: ApartmentItem) => apt.area,
      isWinner: (apt: ApartmentItem) => {
        const val = apt.areaNum ?? 0
        const areas = compareApartments.map(a => a.areaNum ?? 0)
        return val === Math.max(...areas)
      },
      winnerText: 'Rộng nhất',
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const sorted = [...apts].sort(
          (a, b) => (b.areaNum ?? 0) - (a.areaNum ?? 0)
        )
        const largest = sorted[0]!
        const smallest = sorted[sorted.length - 1]!
        const diff = (largest.areaNum ?? 0) - (smallest.areaNum ?? 0)
        if (diff === 0)
          return 'Tất cả các căn hộ so sánh đều có diện tích sử dụng như nhau.'
        const percent = ((diff / (smallest.areaNum ?? 1)) * 100).toFixed(0)
        return `Căn "${largest.title}" tối ưu không gian nhất, cung cấp thêm ${diff.toFixed(1)} m² (+${percent}% diện tích sinh hoạt) so với căn nhỏ nhất.`
      },
    },
    {
      key: 'unitPrice',
      label: 'Đơn giá / m²',
      explain:
        'Đơn giá thuê chia cho diện tích (đ/m²/tháng). Giúp đo lường chính xác hiệu quả chi phí thực tế trên mỗi mét vuông sử dụng.',
      getValue: (apt: ApartmentItem) => {
        const uPrice = getUnitPrice(apt)
        return (
          new Intl.NumberFormat('vi-VN').format(Math.round(uPrice)) + ' đ/m²'
        )
      },
      isWinner: (apt: ApartmentItem) => {
        const uPrices = compareApartments.map(getUnitPrice)
        const minUP = Math.min(...uPrices)
        return getUnitPrice(apt) === minUP
      },
      winnerText: 'Đáng tiền nhất',
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const sorted = [...apts].sort(
          (a, b) => getUnitPrice(a) - getUnitPrice(b)
        )
        const best = sorted[0]!
        const worst = sorted[sorted.length - 1]!
        const bestVal = getUnitPrice(best)
        const worstVal = getUnitPrice(worst)
        const diffPct = (((worstVal - bestVal) / worstVal) * 100).toFixed(0)
        if (Math.abs(bestVal - worstVal) < 1000)
          return 'Giá trị sử dụng trên mỗi m² của các căn hộ là tương đương nhau.'
        return `Căn "${best.title}" có giá trị thực tế tốt nhất, tiết kiệm thêm ${diffPct}% chi phí sử dụng diện tích so với căn đắt đỏ nhất.`
      },
    },
    {
      key: 'bedrooms',
      label: 'Phòng ngủ',
      explain: 'Số phòng ngủ riêng biệt được phân bổ trong căn hộ.',
      getValue: (apt: ApartmentItem) => `${apt.bedrooms} PN`,
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const counts = apts.map(a => a.bedrooms)
        const allSame = counts.every(c => c === counts[0])
        if (allSame)
          return `Đồng bộ cấu trúc phòng ngủ (${counts[0]} PN), phù hợp cho cùng nhóm đối tượng người ở.`
        const sorted = [...apts].sort((a, b) => b.bedrooms - a.bedrooms)
        return `Căn "${sorted[0]?.title}" có số phòng ngủ nhiều nhất (${sorted[0]?.bedrooms} PN), mang lại không gian riêng tư tối đa cho các gia đình.`
      },
    },
    {
      key: 'bathrooms',
      label: 'Phòng tắm / WC',
      explain: 'Số lượng phòng vệ sinh hoặc phòng tắm trong căn hộ.',
      getValue: (apt: ApartmentItem) => `${apt.bathrooms} WC`,
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const counts = apts.map(a => a.bathrooms)
        const allSame = counts.every(c => c === counts[0])
        if (allSame)
          return `Tất cả đều được trang bị cấu trúc ${counts[0]} nhà vệ sinh giống nhau.`
        const sorted = [...apts].sort((a, b) => b.bathrooms - a.bathrooms)
        return `Căn "${sorted[0]?.title}" tiện nghi nhất với ${sorted[0]?.bathrooms} nhà vệ sinh độc lập, giảm thiểu tắc nghẽn giờ cao điểm sáng.`
      },
    },
    {
      key: 'verified',
      label: 'Kiểm duyệt tin',
      explain:
        'Tin đăng đã được nhân viên hệ thống kiểm duyệt thông tin hay chưa.',
      getValue: (apt: ApartmentItem) =>
        apt.isVerified ? 'Đã kiểm duyệt' : 'Chưa kiểm duyệt',
      isWinner: (apt: ApartmentItem) => {
        const maxT = Math.max(...compareApartments.map(getVerifiedScore))
        return getVerifiedScore(apt) === maxT
      },
      winnerText: 'Đã kiểm duyệt',
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const verified = apts.filter(a => a.isVerified)
        if (verified.length === apts.length)
          return 'Tất cả các căn hộ này đều đã được nhân viên hệ thống kiểm duyệt.'
        if (verified.length > 0) {
          return `Căn "${verified.map(v => v.title).join(', ')}" đã được nhân viên hệ thống kiểm duyệt, các căn còn lại chưa được kiểm duyệt.`
        }
        return 'Chưa có căn hộ nào trong danh sách được kiểm duyệt. Hãy kiểm tra kỹ thông tin trước khi đặt cọc.'
      },
    },
    {
      key: 'direction',
      label: 'Hướng ban công',
      explain:
        'Hướng đón ánh sáng và gió trời của ban công. Ảnh hưởng lớn đến phong thủy và nhiệt độ căn nhà.',
      getValue: (apt: ApartmentItem) =>
        apt.balconyDirection || apt.direction || 'Chưa cập nhật',
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const coolDir = apts.filter(a => {
          const d = (a.balconyDirection || a.direction || '').toUpperCase()
          return d.includes('NAM') || d.includes('ĐÔNG NAM')
        })
        const hotDir = apts.filter(a => {
          const d = (a.balconyDirection || a.direction || '').toUpperCase()
          return d.includes('TÂY') || d.includes('TÂY BẮC')
        })
        if (coolDir.length > 0) {
          return `Căn "${coolDir.map(c => c.title).join(', ')}" có hướng ban công hướng Nam/Đông Nam mát mẻ quanh năm. Hạn chế chọn hướng Tây của căn khác nếu ngại nắng chiều.`
        }
        if (hotDir.length > 0) {
          return `Lưu ý: Có căn hộ hướng Tây/Tây Bắc đón nắng chiều trực tiếp, sẽ nóng hơn vào các khung giờ chiều.`
        }
        return 'Hãy lựa chọn hướng ban công phù hợp với phong thủy và sở thích đón ánh sáng tự nhiên của bạn.'
      },
    },
    {
      key: 'furniture',
      label: 'Nội thất đi kèm',
      explain:
        'Mức độ hoàn thiện nội thất đi kèm (Đầy đủ, Cơ bản, Không nội thất).',
      getValue: (apt: ApartmentItem) => apt.furniture || 'Chưa cập nhật',
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const full = apts.filter(
          a =>
            a.furniture?.includes('Đầy đủ') || a.furniture?.includes('Cao cấp')
        )
        if (full.length === apts.length)
          return 'Tất cả các căn hộ so sánh đều đã được trang bị nội thất đầy đủ, sẵn sàng dọn vào ở.'
        if (full.length > 0) {
          return `Căn "${full.map(f => f.title).join(', ')}" đã sắm đầy đủ nội thất cao cấp giúp bạn tiết kiệm hàng chục triệu chi phí mua đồ mới.`
        }
        return 'Đa số các căn chỉ bàn giao nội thất cơ bản hoặc thô. Bạn cần cân đối thêm chi phí sắm sửa thêm thiết bị gia dụng.'
      },
    },
    {
      key: 'moveIn',
      label: 'Dọn vào từ',
      explain: 'Thời điểm sớm nhất bạn có thể ký hợp đồng dọn vào ở.',
      getValue: (apt: ApartmentItem) => apt.moveInTime || 'Liên hệ',
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const immediate = apts.filter(
          a =>
            a.moveInTime?.includes('Ngay') || a.moveInTime?.includes('lập tức')
        )
        if (immediate.length > 0) {
          return `Căn "${immediate.map(i => i.title).join(', ')}" có thể dọn vào ở ngay lập tức, cực kỳ thích hợp nếu bạn đang cần chuyển nhà gấp.`
        }
        return 'Vui lòng kiểm tra lịch bàn giao để thống nhất ngày ký hợp đồng và dọn vào ở cùng với chủ nhà.'
      },
    },
    {
      key: 'projectName',
      label: 'Dự án',
      explain:
        'Tên dự án căn hộ chung cư thuộc về (nếu có) hoặc do chủ nhà cá nhân đăng ký.',
      getValue: (apt: ApartmentItem) => apt.projectName || 'Cá nhân',
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const fromProjects = apts.filter(a => a.projectName)
        if (fromProjects.length === apts.length) {
          return 'Tất cả các căn hộ đều thuộc các dự án chung cư hiện đại.'
        }
        if (fromProjects.length > 0) {
          return `Có ${fromProjects.length} căn hộ thuộc dự án và các căn còn lại thuộc sở hữu cá nhân lẻ.`
        }
        return 'Tất cả căn hộ đều thuộc chủ nhà cá nhân đăng lẻ bên ngoài.'
      },
    },
    {
      key: 'location',
      label: 'Địa chỉ',
      explain: 'Vị trí địa lý chi tiết của căn hộ chung cư.',
      getValue: (apt: ApartmentItem) => apt.location,
      getAnalysis: (apts: ApartmentItem[]) => {
        if (apts.length < 2) return ''
        const locations = apts.map(
          a => a.location.split(',').pop()?.trim() || ''
        )
        const uniqueLocs = Array.from(new Set(locations))
        if (uniqueLocs.length === 1) {
          return `Tất cả căn hộ đều nằm ở khu vực ${uniqueLocs[0]}.`
        }
        return `Các căn hộ phân bố ở nhiều khu vực khác nhau: ${uniqueLocs.join(', ')}.`
      },
    },
  ]
}
