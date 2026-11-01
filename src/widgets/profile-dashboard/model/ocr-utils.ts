import { toast } from 'sonner'

export interface OcrKycForm {
  fullName: string
  cccdNumber: string
  dob: string
  address: string
  gender: string
  nationality: string
  placeOfOrigin: string
  issueDate: string
  placeOfIssue: string
}

export async function uploadAndProcessCccd(
  imageBase64: string | undefined,
  _role?: 'tenant' | 'landlord'
): Promise<OcrKycForm | null> {
  void _role
  // Always wait for 1.5 seconds to show OCR progress analysis animation
  await new Promise(resolve => setTimeout(resolve, 1500))

  if (!imageBase64) {
    toast.error(
      'Không tìm thấy hình ảnh căn cước. Vui lòng thử lại hoặc tự nhập thông tin.'
    )
    return null
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
        issueDate: result.Issue_date || '20/03/2021',
        placeOfIssue: result.Place_of_issue || 'CỤC CSQLHC VỀ TTXH',
      }
    } else {
      throw new Error('Dữ liệu không hợp lệ từ máy chủ OCR')
    }
  } catch (err) {
    console.error('OCR processing error:', err)
    toast.error(
      'Không thể trích xuất thông tin từ ảnh CCCD. Vui lòng tự nhập thông tin thủ công.'
    )
    return null
  }
}
