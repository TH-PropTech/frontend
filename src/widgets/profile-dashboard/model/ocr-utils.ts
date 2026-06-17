import { toast } from 'sonner'

export function getMockKycForm(role: 'tenant' | 'landlord') {
  return {
    fullName: role === 'tenant' ? 'NGUYỄN VĂN A' : 'LÊ HOÀNG MINH',
    cccdNumber: role === 'tenant' ? '038096001234' : '012093005678',
    dob: role === 'tenant' ? '15/08/1996' : '20/12/1985',
    address:
      role === 'tenant'
        ? '720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM'
        : '100 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP.HCM',
    gender: 'Nam',
    nationality: 'Việt Nam',
    placeOfOrigin: role === 'tenant' ? 'Hải Phòng' : 'Hà Nội',
  }
}

export async function uploadAndProcessCccd(
  imageBase64: string | undefined,
  role: 'tenant' | 'landlord'
) {
  // Always wait for 2.5 seconds to show OCR progress analysis animation
  await new Promise(resolve => setTimeout(resolve, 2500))

  if (!imageBase64) {
    toast.success('Trích xuất OCR CCCD thành công!')
    return getMockKycForm(role)
  }

  try {
    const cleanBase64 = imageBase64
      .replace(/^data:image\/[a-z]+;base64,/, '')
      .replace(/^data:application\/pdf;base64,/, '')

    const res = await fetch('http://localhost:80/api/idcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: cleanBase64 }),
    })
    const result = await res.json()
    if (result && result.ID_number) {
      toast.success('Trích xuất OCR CCCD thành công!')
      return {
        fullName: result.Name || '',
        cccdNumber: result.ID_number || '',
        dob: result.Date_of_birth || '',
        address: result.Place_of_residence || result.Place_of_origin || '',
        gender: result.Gender || 'Nam',
        nationality: result.Nationality || 'Việt Nam',
        placeOfOrigin: result.Place_of_origin || '',
      }
    } else {
      throw new Error('Dữ liệu không hợp lệ từ API')
    }
  } catch (err) {
    console.error('Fallback to mock OCR data due to error:', err)
    toast.success('Trích xuất OCR CCCD thành công (Mock)!')
    return getMockKycForm(role)
  }
}
