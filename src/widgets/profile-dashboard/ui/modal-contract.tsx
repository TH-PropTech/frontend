'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog'
import { UseProfileReturn } from '../model/use-profile'
import {
  FileText,
  ShieldCheck,
  FileSignature,
  Download,
  CheckCircle2,
  Camera,
  Loader2,
  Upload,
} from 'lucide-react'
import { env } from '@/shared/config/env'
import { downloadContractArtifact } from '@/features/contracts'

interface ModalContractProps {
  profile: UseProfileReturn
}

const base64ToBlob = (base64: string): Blob => {
  const arr = base64.split(',')
  const mime = arr[0]?.match(/:(.*?);/)?.[1] || 'image/jpeg'
  const bstr = atob(arr[1] || '')
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export function ModalContract({
  profile,
}: ModalContractProps): React.ReactElement {
  const {
    showContractModal,
    setShowContractModal,
    role,
    activeProperty,
    handleSignContract,
    contractViewOnly,
  } = profile

  // Signer verification states
  const [signerStep, setSignerStep] = React.useState<
    'document' | 'webcam' | 'success'
  >('document')
  const [isVerifying, setIsVerifying] = React.useState(false)

  // Webcam refs & state
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [selfiePreview, setSelfiePreview] = React.useState('')
  const [isWebcamActive, setIsWebcamActive] = React.useState(false)
  const [webcamStream, setWebcamStream] = React.useState<MediaStream | null>(
    null
  )

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (showContractModal) {
      timer = setTimeout(() => {
        setSignerStep('document')
        setSelfiePreview('')
        setIsVerifying(false)
      }, 0)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [showContractModal])

  React.useEffect(() => {
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach(t => t.stop())
      }
    }
  }, [webcamStream])

  const handleClose = (): void => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(t => t.stop())
      setWebcamStream(null)
    }
    setIsWebcamActive(false)
    setShowContractModal(false)
  }

  const handleDownloadArtifact = async (): Promise<void> => {
    if (!activeProperty.id || activeProperty.id.length !== 24) {
      toast.error('Chưa có mã hợp đồng hợp lệ để tải tài liệu.')
      return
    }
    try {
      const artifact = await downloadContractArtifact(activeProperty.id, 'pdf')
      const url = URL.createObjectURL(artifact)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `${activeProperty.code}.pdf`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (downloadError) {
      toast.error(
        downloadError instanceof Error
          ? downloadError.message
          : 'Không thể tải tài liệu hợp đồng.'
      )
    }
  }

  const startWebcam = async () => {
    setIsWebcamActive(true)
    setSelfiePreview('')
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      })
      setWebcamStream(s)
      if (videoRef.current) {
        videoRef.current.srcObject = s
        videoRef.current.play()
      }
    } catch {
      toast.error('Không mở được webcam của bạn')
      setIsWebcamActive(false)
    }
  }

  const capturePicture = () => {
    if (videoRef.current && canvasRef.current && webcamStream) {
      const ctx = canvasRef.current.getContext('2d')
      canvasRef.current.width = 480
      canvasRef.current.height = 480
      const size = Math.min(
        videoRef.current.videoWidth,
        videoRef.current.videoHeight
      )
      const sx = (videoRef.current.videoWidth - size) / 2
      const sy = (videoRef.current.videoHeight - size) / 2
      ctx?.drawImage(videoRef.current, sx, sy, size, size, 0, 0, 480, 480)
      setSelfiePreview(canvasRef.current.toDataURL('image/jpeg', 0.9))

      // Stop stream
      webcamStream.getTracks().forEach(t => t.stop())
      setWebcamStream(null)
      setIsWebcamActive(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setSelfiePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleVerifySigner = async () => {
    if (!selfiePreview) {
      toast.error('Vui lòng chụp ảnh chân dung để xác thực người ký!')
      return
    }

    setIsVerifying(true)
    try {
      // Safe default fallback ObjectID if current activeProperty.id is not 24 chars
      const contractId =
        activeProperty.id && activeProperty.id.length === 24
          ? activeProperty.id
          : '658c149d5a892b112c3d4e5f'

      const selfieBlob = base64ToBlob(selfiePreview)
      const formData = new FormData()
      formData.append('portraitImages', selfieBlob, 'signer.jpg')
      formData.append('role', role)

      const response = await fetch(
        `${env.apiUrl}/contracts/${contractId}/verify-signer`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData?.message || 'Xác minh danh tính người ký thất bại'
        )
      }

      const data = await response.json()

      if (data.verified) {
        toast.success('Xác minh danh tính người ký trùng khớp hoàn toàn!')
        setSignerStep('success')

        // Execute sign after small delay for success animation
        setTimeout(() => {
          handleSignContract()
          setShowContractModal(false)
        }, 2000)
      } else {
        toast.error(
          'Xác thực thất bại: Khuôn mặt người ký không khớp với CCCD trong hồ sơ KYC!'
        )
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Lỗi kết nối máy chủ xác thực người ký'
      )
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Dialog open={showContractModal} onOpenChange={setShowContractModal}>
      <DialogContent className="max-w-2xl p-6 md:p-8 gap-6 bg-white border border-border rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
        <DialogHeader className="border-b border-border pb-3 text-left shrink-0">
          <DialogTitle className="font-display text-lg font-bold text-fg flex items-center gap-2">
            <FileText className="h-5.5 w-5.5 text-primary" />
            {contractViewOnly
              ? 'Hợp đồng thuê nhà đã ký'
              : signerStep === 'webcam'
                ? 'Xác thực khuôn mặt người ký hợp đồng'
                : 'Chi tiết Điều khoản Hợp đồng Thuê nhà Điện tử'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted mt-1 font-sans">
            Mã số hợp đồng:{' '}
            {role === 'tenant' ? 'CTR-2026-0048' : activeProperty.code}
          </DialogDescription>
        </DialogHeader>

        {/* Signed status banner (only in view mode) */}
        {contractViewOnly && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 shrink-0">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
            <div className="text-left font-sans">
              <p className="text-[11px] font-bold text-emerald-800">
                Hợp đồng đã được ký số bởi cả hai bên
              </p>
              <p className="text-[10px] text-slate-500">
                Ký bằng chứng chỉ Fabric CA X.509 (ECDSA P-256) • Ngày ký:
                10/06/2026 16:30 • Băm SHA-256 đã ghi nhận lên hệ thống
                Hyperledger Fabric
              </p>
            </div>
          </div>
        )}

        {/* Document view */}
        {signerStep === 'document' && (
          <>
            <div className="flex-1 overflow-y-auto pr-2 border border-slate-200 rounded-xl p-4 bg-slate-50/30 text-xs text-fg space-y-4 leading-relaxed font-sans scrollbar-thin text-left">
              <h4 className="text-center font-bold text-sm uppercase">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </h4>
              <h5 className="text-center font-bold text-xs uppercase -mt-2">
                Độc lập - Tự do - Hạnh phúc
              </h5>
              <div className="border-t border-border/60 my-2" />

              <h4 className="text-center font-bold text-sm uppercase">
                HỢP ĐỒNG THUÊ CĂN HỘ CHUNG CƯ
              </h4>

              <p className="font-semibold">
                Hôm nay, ngày 10 tháng 06 năm 2026, chúng tôi gồm các bên:
              </p>

              <div className="space-y-1">
                <p className="font-bold">BÊN CHO THUÊ (BÊN A): LÊ HOÀNG MINH</p>
                <p>
                  Số CCCD: 012093005678 - Nơi cấp: Cục Cảnh sát Quảnh lý Hành
                  chính về Trật tự Xã hội
                </p>
                <p>
                  Địa chỉ thường trú: 100 Nguyễn Hữu Cảnh, Phường 22, Bình
                  Thạnh, TP.HCM
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold">BÊN THUÊ (BÊN B): NGUYỄN VĂN A</p>
                <p>
                  Số CCCD: 038096001234 - Nơi cấp: Cục Cảnh sát Quản lý Hành
                  chính về Trật tự Xã hội
                </p>
                <p>
                  Địa chỉ thường trú: 720A Điện Biên Phủ, Phường 22, Bình Thạnh,
                  TP.HCM
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold">ĐIỀU 1: ĐỐI TƯỢNG HỢP ĐỒNG</p>
                <p>
                  Bên A đồng ý cho Bên B thuê căn hộ chung cư tọa lạc tại:{' '}
                  {role === 'tenant'
                    ? 'Vinhomes Central Park - Căn hộ #102'
                    : activeProperty.name}
                  . Diện tích sử dụng: 75 m² bao gồm 2 phòng ngủ đầy đủ nội thất
                  cơ bản.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold">ĐIỀU 2: THỜI HẠN VÀ GIÁ THUÊ</p>
                <p>
                  2.1 Thời hạn thuê là 12 tháng, bắt đầu từ ngày 15/06/2026 đến
                  ngày 15/06/2027.
                </p>
                <p>
                  2.2 Giá thuê căn hộ cố định trong suốt thời gian hợp đồng là:{' '}
                  <strong className="text-[#9F3F2A]">
                    {role === 'tenant'
                      ? '18.000.000đ'
                      : activeProperty.price.toLocaleString() + 'đ'}
                    /tháng
                  </strong>
                  .
                </p>
                <p>
                  2.3 Tiền đặt cọc bảo đảm là:{' '}
                  <strong className="text-[#9F3F2A]">
                    {role === 'tenant'
                      ? '18.000.000đ'
                      : activeProperty.price.toLocaleString() + 'đ'}
                  </strong>
                  , khoản tiền này được khóa ký quỹ bảo chứng tại ngân hàng
                  Techcombank dưới sự giám sát của hệ thống Fabric.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold">
                  ĐIỀU 3: QUYỀN VÀ NGHĨA VỤ CỦA CÁC BÊN
                </p>
                <p>
                  3.1 Bên A có trách nhiệm bàn giao căn hộ và trang thiết bị
                  đúng hiện trạng thỏa thuận, hỗ trợ khai báo tạm trú và sửa
                  chữa các sự cố lỗi khách quan lớn.
                </p>
                <p>
                  3.2 Bên B phải thanh toán tiền nhà đúng hạn (trước ngày 5 hàng
                  tháng), giữ gìn tài sản chung, không được tự ý sửa đổi kiến
                  trúc khi chưa có sự đồng ý bằng văn bản của Bên A.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold">
                  ĐIỀU 4: PHƯƠNG THỨC GIẢI QUYẾT TRANH CHẤP
                </p>
                <p>
                  Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết thông qua
                  thương lượng. Trong trường hợp không thể thỏa thuận, dữ liệu
                  hành trình băm mã hóa trên Hệ thống hợp đồng của TH-PropTech
                  sẽ được sử dụng làm bằng chứng số đối chiếu pháp lý.
                </p>
              </div>

              {/* Signed signatures section (only in view mode) */}
              {contractViewOnly && (
                <div className="border-t border-slate-200 pt-4 mt-4 space-y-4">
                  <p className="font-bold text-center">CHỮ KÝ SỐ CÁC BÊN</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 text-center">
                      <p className="font-bold text-xs">BÊN CHO THUÊ (BÊN A)</p>
                      <div className="border border-emerald-300 bg-emerald-50 rounded-lg p-3 space-y-1">
                        <p className="text-[#9F3F2A] font-bold italic text-sm">
                          Lê Hoàng Minh
                        </p>
                        <p className="text-[9px] text-slate-500 font-mono">
                          Fabric CA: org1.landlord.le_hoang_minh
                        </p>
                        <div className="flex items-center justify-center gap-1 text-emerald-600">
                          <CheckCircle2 className="h-3 w-3" />
                          <span className="text-[9px] font-bold">
                            Đã ký số X.509
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="font-bold text-xs">BÊN THUÊ (BÊN B)</p>
                      <div className="border border-emerald-300 bg-emerald-50 rounded-lg p-3 space-y-1">
                        <p className="text-[#9F3F2A] font-bold italic text-sm">
                          Nguyễn Văn A
                        </p>
                        <p className="text-[9px] text-slate-500 font-mono">
                          Fabric CA: org1.tenant.nguyen_van_a
                        </p>
                        <div className="flex items-center justify-center gap-1 text-emerald-600">
                          <CheckCircle2 className="h-3 w-3" />
                          <span className="text-[9px] font-bold">
                            Đã ký số X.509
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {contractViewOnly ? (
              <div className="flex gap-3 pt-2 shrink-0">
                <Button
                  onClick={() => void handleDownloadArtifact()}
                  variant="secondary"
                  className="flex-1 h-10 text-xs rounded-full font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="h-4 w-4" />
                  Tải về PDF
                </Button>
                <Button
                  onClick={handleClose}
                  className="flex-1 h-10 text-xs text-white rounded-full font-bold shadow-md border-none"
                  style={{ backgroundColor: '#9F3F2A' }}
                >
                  Đóng
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-[10px] text-orange-800 leading-relaxed flex gap-2 shrink-0 text-left font-sans">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#9F3F2A] shrink-0 mt-0.5" />
                  <span>
                    Trước khi thực hiện ký số bằng Fabric CA, hệ thống yêu cầu
                    quét webcam đối sánh khuôn mặt (Face Matching) để xác thực
                    bạn chính là chủ sở hữu của chữ ký số này.
                  </span>
                </div>

                <div className="flex gap-3 pt-2 shrink-0">
                  <Button
                    onClick={handleClose}
                    variant="secondary"
                    className="flex-1 h-10 text-xs rounded-full font-bold"
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    onClick={() => setSignerStep('webcam')}
                    className="flex-1 h-10 text-xs text-white rounded-full font-bold shadow-md flex items-center justify-center gap-1.5 border-none"
                    style={{ backgroundColor: '#9F3F2A' }}
                  >
                    <FileSignature className="h-4 w-4" />
                    Ký số bằng chứng chỉ Fabric
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {/* Webcam Face matching step before signing */}
        {signerStep === 'webcam' && (
          <div className="flex flex-col items-center justify-center space-y-5 py-4 max-w-sm mx-auto w-full text-center">
            <p className="text-xs text-slate-500 font-sans">
              Nhìn thẳng vào webcam để xác thực danh tính trước khi kích hoạt mã
              hóa X.509
            </p>

            <div className="relative h-44 w-44 rounded-full overflow-hidden border-4 border-[#9F3F2A]/30 bg-slate-50 flex items-center justify-center shadow-inner shrink-0">
              {isWebcamActive ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
              ) : selfiePreview ? (
                <img
                  src={selfiePreview}
                  className="w-full h-full object-cover"
                  alt="Người ký"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-3">
                  <Camera className="h-7 w-7 text-slate-400 mb-1" />
                  <span className="text-[10px] text-slate-500">
                    Camera sẵn sàng
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2 w-full">
              {isWebcamActive ? (
                <Button
                  onClick={capturePicture}
                  className="flex-1 h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none text-xs"
                >
                  <Camera className="h-4 w-4 mr-1.5" /> Chụp ảnh
                </Button>
              ) : (
                <Button
                  onClick={startWebcam}
                  variant="outline"
                  className="flex-1 h-9 border-slate-200 hover:bg-slate-50 text-xs"
                >
                  <Camera className="h-4 w-4 mr-1.5" /> Bật camera
                </Button>
              )}
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex-1 h-9 border-slate-200 hover:bg-slate-50 text-xs"
              >
                <Upload className="h-4 w-4 mr-1.5" /> Chọn tệp
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {isVerifying ? (
              <div className="flex flex-col items-center justify-center space-y-1">
                <Loader2 className="h-6 w-6 text-[#9F3F2A] animate-spin" />
                <span className="text-xs text-slate-500 font-bold">
                  Đang so khớp sinh trắc học khuôn mặt...
                </span>
              </div>
            ) : (
              <div className="flex gap-2 w-full pt-2">
                <Button
                  onClick={() => setSignerStep('document')}
                  variant="outline"
                  className="flex-1 h-10 border-slate-200 text-xs font-bold"
                >
                  Quay lại
                </Button>
                <Button
                  onClick={handleVerifySigner}
                  disabled={!selfiePreview}
                  className="flex-1 h-10 text-white text-xs font-bold rounded-xl border-none"
                  style={{
                    backgroundColor: selfiePreview ? '#9F3F2A' : '#e2e8f0',
                  }}
                >
                  <ShieldCheck className="h-4.5 w-4.5 mr-1.5" /> Xác thực người
                  ký
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Success animation step */}
        {signerStep === 'success' && (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
            <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-200 animate-bounce">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h3 className="font-display text-sm font-bold text-emerald-800 uppercase">
              Xác thực sinh trắc học trùng khớp!
            </h3>
            <p className="text-xs text-slate-500 max-w-sm font-sans">
              Danh tính hợp lệ. Hệ thống đang tiến hành băm mã hóa chữ ký CA của
              bạn lên Hyperledger Fabric Ledger...
            </p>
          </div>
        )}
      </DialogContent>
      {/* Hidden canvas for webcam capture */}
      <canvas ref={canvasRef} className="hidden" />
    </Dialog>
  )
}
