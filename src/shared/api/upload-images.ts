import { apiClient } from './api-client'

/** Tải ảnh JPEG/PNG qua luồng tải ảnh căn hộ có sẵn; trả về danh sách URL đã lưu. */
export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData()
  files.forEach(file => formData.append('images', file))
  const response = await apiClient.post<{ urls: string[] }>(
    '/apartments/upload',
    formData
  )
  return response.urls
}
