export function base64ToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',')
  const mime = parts[0]?.match(/:(.*?);/)?.[1] || 'image/jpeg'
  const binary = atob(parts[1] || '')
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new Blob([bytes], { type: mime })
}

export function attachMediaStream(
  video: HTMLVideoElement | null,
  stream: MediaStream | null
): void {
  if (!video || !stream) return

  video.srcObject = stream
  const playPromise = video.play()
  if (playPromise) {
    void playPromise.catch(error => {
      console.warn('Unable to autoplay KYC camera preview', error)
    })
  }
}
