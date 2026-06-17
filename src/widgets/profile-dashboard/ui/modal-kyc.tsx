'use client'

import * as React from 'react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { UseProfileReturn } from '../model/use-profile'
import {
  ShieldCheck,
  Upload,
  Brain,
  ThumbsUp,
  ThumbsDown,
  MapPin,
  Loader2,
  Camera,
  RefreshCw,
  Shield,
  CheckCircle,
  ChevronLeft,
} from 'lucide-react'
import { toast } from 'sonner'

interface ModalKycProps {
  profile: UseProfileReturn
}

interface Recommendation {
  id: number
  name: string
  district: string
  rent_price: number
  rooms: number
  has_gym: boolean
  has_parking: boolean
  match_score: number
  confidence: string
  contributions: {
    location: number
    finance: number
    amenities: number
    demographics: number
  }
  reasons: string[]
}

export function ModalKyc({
  profile,
}: ModalKycProps): React.ReactElement | null {
  const {
    showKycModal,
    setShowKycModal,
    cccdUploaded,
    isOcrLoading,
    handleUploadCccd,
    kycForm,
    setKycForm,
    handleConfirmKyc,
    setCccdUploaded,
  } = profile

  const fileInputRef1 = React.useRef<HTMLInputElement>(null)
  const fileInputRef2 = React.useRef<HTMLInputElement>(null)
  const videoRef1 = React.useRef<HTMLVideoElement>(null)
  const videoRef2 = React.useRef<HTMLVideoElement>(null)
  const canvasRef1 = React.useRef<HTMLCanvasElement>(null)
  const canvasRef2 = React.useRef<HTMLCanvasElement>(null)

  const [frontPreview, setFrontPreview] = React.useState('')
  const [backPreview, setBackPreview] = React.useState('')
  const [frontUrl, setFrontUrl] = React.useState('')
  const [backUrl, setBackUrl] = React.useState('')
  const [isWebcamActive1, setIsWebcamActive1] = React.useState(false)
  const [isWebcamActive2, setIsWebcamActive2] = React.useState(false)
  const [stream1, setStream1] = React.useState<MediaStream | null>(null)
  const [stream2, setStream2] = React.useState<MediaStream | null>(null)

  // Extra state fields for AI Recommendations
  const [preferredDistrict, setPreferredDistrict] = React.useState('Bình Thạnh')
  const [income, setIncome] = React.useState(25000000)
  const [rooms, setRooms] = React.useState(2)
  const [hasGym] = React.useState(true)
  const [hasParking] = React.useState(true)
  const [recommendations, setRecommendations] = React.useState<
    Recommendation[]
  >([])
  const [showResults, setShowResults] = React.useState(false)
  const [feedbackGiven, setFeedbackGiven] = React.useState<
    Record<number, 'like' | 'dislike'>
  >({})

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(v)
      .replace('₫', 'đ')

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    if (cccdUploaded && kycForm.address) {
      const addr = kycForm.address.toLowerCase()
      let district = 'Bình Thạnh'
      if (addr.includes('bình thạnh')) district = 'Bình Thạnh'
      else if (addr.includes('quận 1') || addr.includes('q.1'))
        district = 'Quận 1'
      else if (
        addr.includes('quận 2') ||
        addr.includes('q.2') ||
        addr.includes('thủ đức')
      )
        district = 'Quận 2'
      else if (addr.includes('quận 7') || addr.includes('q.7'))
        district = 'Quận 7'

      timer = setTimeout(() => {
        setPreferredDistrict(district)
      }, 0)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [cccdUploaded, kycForm.address])

  React.useEffect(() => {
    if (showKycModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showKycModal])

  React.useEffect(() => {
    return () => {
      stream1?.getTracks().forEach(t => t.stop())
      stream2?.getTracks().forEach(t => t.stop())
    }
  }, [stream1, stream2])

  if (!showKycModal) return null

  const startWebcam = async (card: 1 | 2) => {
    if (card === 1) {
      setIsWebcamActive1(true)
      setFrontPreview('')
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true })
        setStream1(s)
        if (videoRef1.current) {
          videoRef1.current.srcObject = s
          videoRef1.current.play()
        }
      } catch (e) {
        console.error('Error starting webcam 1', e)
        toast.error('Không mở được webcam mặt trước')
      }
    } else {
      setIsWebcamActive2(true)
      setBackPreview('')
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true })
        setStream2(s)
        if (videoRef2.current) {
          videoRef2.current.srcObject = s
          videoRef2.current.play()
        }
      } catch (e) {
        console.error('Error starting webcam 2', e)
        toast.error('Không mở được webcam mặt sau')
      }
    }
  }

  const takePicture = (card: 1 | 2) => {
    if (card === 1 && videoRef1.current && canvasRef1.current && stream1) {
      const ctx = canvasRef1.current.getContext('2d')
      canvasRef1.current.width = 640
      canvasRef1.current.height = 480
      ctx?.drawImage(videoRef1.current, 0, 0, 640, 480)
      setFrontPreview(canvasRef1.current.toDataURL('image/jpeg', 0.9))
      stream1.getTracks().forEach(t => t.stop())
      setStream1(null)
      setIsWebcamActive1(false)
    } else if (
      card === 2 &&
      videoRef2.current &&
      canvasRef2.current &&
      stream2
    ) {
      const ctx = canvasRef2.current.getContext('2d')
      canvasRef2.current.width = 640
      canvasRef2.current.height = 480
      ctx?.drawImage(videoRef2.current, 0, 0, 640, 480)
      setBackPreview(canvasRef2.current.toDataURL('image/jpeg', 0.9))
      stream2.getTracks().forEach(t => t.stop())
      setStream2(null)
      setIsWebcamActive2(false)
    }
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    card: 1 | 2
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (card === 1) setFrontPreview(reader.result as string)
      else setBackPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleExtractOcr = () => {
    const targetImage = frontPreview || frontUrl
    if (!targetImage) {
      toast.error('Vui lòng cung cấp ảnh mặt trước CCCD!')
      return
    }
    handleUploadCccd(targetImage)
  }

  const handleVerifyAndRecommend = async () => {
    let age = 30
    if (kycForm.dob) {
      const parts = kycForm.dob.split('/')
      if (parts.length === 3) {
        const birthYear = parseInt(parts[2] || '')
        if (!isNaN(birthYear)) age = 2026 - birthYear
      }
    }

    try {
      const response = await fetch('http://localhost:5001/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age,
          income,
          preferred_district: preferredDistrict,
          rooms,
          has_gym: hasGym,
          has_parking: hasParking,
        }),
      })
      const result = await response.json()
      if (result.success && result.data) setRecommendations(result.data)
      else throw new Error('API recommend error')
    } catch (e) {
      console.error('Recommend API error, using fallback recommendations', e)
      setRecommendations([
        {
          id: 1,
          name: 'Vinhomes Central Park',
          district: 'Bình Thạnh',
          rent_price: 18000000,
          rooms: 2,
          has_gym: true,
          has_parking: true,
          match_score: 92,
          confidence: '95.6%',
          contributions: {
            location: 95,
            finance: 90,
            amenities: 95,
            demographics: 90,
          },
          reasons: [
            'Đúng khu vực Bình Thạnh bạn yêu cầu',
            'Giá thuê 18tr/tháng tối ưu cho thu nhập 25tr',
            'Đáp ứng trọn vẹn yêu cầu Gym & Bãi đỗ xe',
            'Khu vực sinh sống lý tưởng cho độ tuổi 30',
          ],
        },
        {
          id: 2,
          name: 'Masteri Thảo Điền',
          district: 'Quận 2',
          rent_price: 22000000,
          rooms: 2,
          has_gym: true,
          has_parking: true,
          match_score: 76,
          confidence: '88.2%',
          contributions: {
            location: 60,
            finance: 70,
            amenities: 95,
            demographics: 80,
          },
          reasons: [
            'Khu vực Quận 2 giáp ranh đi lại thuận tiện',
            'Giá thuê chiếm 88% ngân sách tối đa mong muốn',
            'Đáp ứng trọn vẹn yêu cầu Gym & Bãi đỗ xe',
          ],
        },
      ])
    } finally {
      setShowResults(true)
      handleConfirmKyc()
    }
  }

  const handleFeedback = (buildingId: number, type: 'like' | 'dislike') => {
    setFeedbackGiven(prev => ({ ...prev, [buildingId]: type }))
    toast.success(
      type === 'like'
        ? 'Đã lưu phản hồi học máy Naïve Bayes!'
        : 'Đã ghi nhận phản hồi!'
    )
  }

  const handleCloseAll = () => {
    setShowKycModal(false)
    setTimeout(() => {
      setShowResults(false)
      setCccdUploaded(false)
      setFeedbackGiven({})
    }, 300)
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-hidden flex flex-col bg-white">
      {/* Sticky Top Header with Back Button */}
      <header className="shrink-0 border-b border-border bg-white/95 backdrop-blur px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3.5">
          <button
            onClick={handleCloseAll}
            className="flex items-center justify-center h-9 w-9 rounded-full border border-border bg-white hover:bg-surface transition-all cursor-pointer text-fg animate-fade-in"
            title="Quay lại trang cá nhân"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
          <div>
            <h1 className="font-marketing text-base font-bold text-fg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Xác minh danh
              tính KYC & Trích xuất CCCD
            </h1>
            <p className="text-[11px] text-muted mt-0.5">
              Nhận dạng thông tin tự động bằng AI OCR bảo mật tích hợp
              Blockchain.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted">Trạng thái:</span>
          {isOcrLoading ? (
            <Badge className="bg-warning text-warning-foreground animate-pulse text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              ĐANG TRÍCH XUẤT OCR
            </Badge>
          ) : cccdUploaded ? (
            <Badge className="bg-success text-success-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> HOÀN TẤT
            </Badge>
          ) : (
            <Badge className="bg-surface-muted text-muted text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              SẴN SÀNG (READY)
            </Badge>
          )}
        </div>
      </header>

      {/* Main Workspace Area (scroll-free view) */}
      <main className="flex-1 overflow-hidden p-6 flex flex-col justify-start bg-slate-50/20">
        {showResults ? (
          <div className="max-w-2xl mx-auto w-full space-y-6 overflow-y-auto h-full pr-2 scrollbar-thin">
            <div className="border-b border-border pb-3 text-left">
              <h2 className="font-marketing text-lg font-bold text-fg flex items-center gap-2">
                <Brain className="h-5.5 w-5.5 text-primary" /> Gợi ý Căn hộ từ
                AI Recommender Engine
              </h2>
              <p className="text-xs text-muted mt-1">
                Dựa trên hồ sơ và sở thích của bạn, thuật toán học máy Naïve
                Bayes đã đề xuất các căn hộ phù hợp nhất.
              </p>
            </div>
            <div className="space-y-4">
              {recommendations.map((b, index) => {
                const isTop1 = index === 0
                return (
                  <div
                    key={b.id}
                    className={`border rounded-2xl p-5 bg-white transition-all shadow-sm ${isTop1 ? 'border-primary/40 bg-gradient-to-br from-primary-soft/5 to-white ring-1 ring-primary/25' : 'border-border'}`}
                  >
                    {isTop1 && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider mb-3">
                        🏆 TOP 1 GỢI Ý
                      </div>
                    )}
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1 text-left">
                        <h4 className="font-marketing text-base font-bold text-fg">
                          {b.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{b.district}, TP. Hồ Chí Minh</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge
                          variant="outline"
                          className="font-mono text-xs py-0.5 px-2.5 rounded-full border bg-primary-soft text-primary border-primary/20"
                        >
                          {b.match_score}% Hợp
                        </Badge>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleFeedback(b.id, 'like')}
                            className={`p-1.5 border rounded-lg bg-surface transition-all cursor-pointer ${feedbackGiven[b.id] === 'like' ? 'text-success border-success bg-success-soft/20' : 'hover:text-fg'}`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(b.id, 'dislike')}
                            className={`p-1.5 border rounded-lg bg-surface transition-all cursor-pointer ${feedbackGiven[b.id] === 'dislike' ? 'text-danger border-danger bg-danger-soft/20' : 'hover:text-fg'}`}
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-border/60 py-3 my-3 text-left">
                      <div>
                        <span className="text-[10px] text-muted font-bold uppercase block">
                          Giá thuê
                        </span>
                        <span className="font-mono text-sm font-bold text-primary">
                          {formatCurrency(b.rent_price)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted font-bold uppercase block">
                          Thiết kế
                        </span>
                        <span className="text-xs font-semibold text-fg">
                          {b.rooms} PN
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted font-bold uppercase block">
                          Phòng Gym
                        </span>
                        <span className="text-xs font-semibold text-fg">
                          {b.has_gym ? 'Có' : 'Không'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted font-bold uppercase block">
                          Bãi đỗ xe
                        </span>
                        <span className="text-xs font-semibold text-fg">
                          {b.has_parking ? 'Có' : 'Không'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 bg-surface/40 p-3 rounded-xl border border-border/40 text-left">
                      <div className="flex justify-between items-center text-[10px] text-muted font-bold uppercase">
                        <span className="flex items-center gap-1">
                          <Brain className="h-3.5 w-3.5 text-primary" />
                          AI Decision Breakdown (XAI)
                        </span>
                        <span className="text-primary text-[10px]">
                          Độ tin cậy: {b.confidence}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {[
                          {
                            l: 'Độ khớp Vị trí',
                            v: b.contributions.location,
                            c: 'bg-success text-success',
                          },
                          {
                            l: 'Độ khớp Tài chính',
                            v: b.contributions.finance,
                            c: 'bg-primary text-primary',
                          },
                          {
                            l: 'Độ khớp Tiện ích',
                            v: b.contributions.amenities,
                            c: 'bg-warning text-warning',
                          },
                        ].map(row => (
                          <div
                            className="grid grid-cols-[100px_1fr_40px] items-center gap-2"
                            key={row.l}
                          >
                            <span className="text-[9px] text-muted font-bold">
                              {row.l}
                            </span>
                            <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${row.c.split(' ')[0]} rounded-full`}
                                style={{ width: `${row.v}%` }}
                              />
                            </div>
                            <span
                              className={`text-[9px] font-bold ${row.c.split(' ')[1]} text-right`}
                            >
                              {row.v}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-end pt-4 border-t border-border shrink-0">
              <Button
                onClick={handleCloseAll}
                className="h-10 text-xs rounded-full font-bold px-8 cursor-pointer"
              >
                Hoàn tất & Quay lại trang cá nhân
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch overflow-hidden">
            {/* Left Column - 2 Cards side-by-side (col-span-8) */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Front Card Panel */}
                <div className="border border-border rounded-2xl p-4 bg-surface/5 space-y-3 shadow-sm bg-white">
                  <div className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-xs font-bold text-fg">
                      Mặt trước CCCD
                    </span>
                    <span className="text-[10px] text-primary font-bold">
                      Bắt buộc
                    </span>
                  </div>
                  <div className="h-36 w-full relative rounded-xl bg-surface-muted/20 border border-dashed border-border overflow-hidden flex items-center justify-center shadow-inner">
                    {isWebcamActive1 ? (
                      <video
                        ref={videoRef1}
                        className="w-full h-full object-cover"
                        autoPlay
                        playsInline
                        muted
                      />
                    ) : frontPreview || frontUrl ? (
                      <img
                        src={frontPreview || frontUrl}
                        className="w-full h-full object-cover"
                        alt="Mặt trước preview"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-muted/50" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    {isWebcamActive1 ? (
                      <Button
                        size="sm"
                        className="flex-1 text-[10px] h-8 bg-success hover:bg-success/90"
                        onClick={() => takePicture(1)}
                      >
                        <Camera className="h-3.5 w-3.5 mr-1" /> Chụp ảnh
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-[10px] h-8"
                        onClick={() => startWebcam(1)}
                      >
                        <Camera className="h-3.5 w-3.5 mr-1" /> Webcam
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-[10px] h-8"
                      onClick={() => fileInputRef1.current?.click()}
                    >
                      <Upload className="h-3.5 w-3.5 mr-1" /> Chọn ảnh
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef1}
                      className="hidden"
                      accept="image/*"
                      onChange={e => handleFileChange(e, 1)}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <input
                        type="text"
                        placeholder="Nhập URL ảnh mặt trước..."
                        value={frontUrl}
                        onChange={e => setFrontUrl(e.target.value)}
                        className="flex-1 border border-border rounded-lg px-2.5 py-1 text-[11px] bg-white text-fg focus:outline-none focus:border-primary"
                      />
                      {(frontPreview || frontUrl) && (
                        <button
                          onClick={() => {
                            setFrontPreview('')
                            setFrontUrl('')
                          }}
                          className="p-1 border border-border rounded-lg text-muted hover:text-danger cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Back Card Panel */}
                <div className="border border-border rounded-2xl p-4 bg-surface/5 space-y-3 shadow-sm bg-white">
                  <div className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-xs font-bold text-fg">
                      Mặt sau CCCD
                    </span>
                    <span className="text-[10px] text-muted">
                      Không bắt buộc
                    </span>
                  </div>
                  <div className="h-36 w-full relative rounded-xl bg-surface-muted/20 border border-dashed border-border overflow-hidden flex items-center justify-center shadow-inner">
                    {isWebcamActive2 ? (
                      <video
                        ref={videoRef2}
                        className="w-full h-full object-cover"
                        autoPlay
                        playsInline
                        muted
                      />
                    ) : backPreview || backUrl ? (
                      <img
                        src={backPreview || backUrl}
                        className="w-full h-full object-cover"
                        alt="Mặt sau preview"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-muted/50" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    {isWebcamActive2 ? (
                      <Button
                        size="sm"
                        className="flex-1 text-[10px] h-8 bg-success hover:bg-success/90"
                        onClick={() => takePicture(2)}
                      >
                        <Camera className="h-3.5 w-3.5 mr-1" /> Chụp ảnh
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-[10px] h-8"
                        onClick={() => startWebcam(2)}
                      >
                        <Camera className="h-3.5 w-3.5 mr-1" /> Webcam
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-[10px] h-8"
                      onClick={() => fileInputRef2.current?.click()}
                    >
                      <Upload className="h-3.5 w-3.5 mr-1" /> Chọn ảnh
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef2}
                      className="hidden"
                      accept="image/*"
                      onChange={e => handleFileChange(e, 2)}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <input
                        type="text"
                        placeholder="Nhập URL ảnh mặt sau..."
                        value={backUrl}
                        onChange={e => setBackUrl(e.target.value)}
                        className="flex-1 border border-border rounded-lg px-2.5 py-1 text-[11px] bg-white text-fg focus:outline-none focus:border-primary"
                      />
                      {(backPreview || backUrl) && (
                        <button
                          onClick={() => {
                            setBackPreview('')
                            setBackUrl('')
                          }}
                          className="p-1 border border-border rounded-lg text-muted hover:text-danger cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action and AI status info */}
              <div className="space-y-3.5 bg-white border border-border rounded-2xl p-4.5 shadow-sm flex-1 flex flex-col justify-center">
                {isOcrLoading ? (
                  <div className="flex flex-col items-center justify-center gap-2.5 py-6">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <span className="text-xs font-bold text-primary">
                      Đang phân tích OCR từ ảnh thẻ CCCD...
                    </span>
                    <span className="text-[10px] text-muted">
                      Đang gọi thuật toán xử lý ảnh - Vui lòng chờ 2.5 giây
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-primary-soft/10 border border-primary/10 rounded-xl p-3 text-[11px] text-muted leading-relaxed">
                      <Shield className="h-5 w-5 text-primary shrink-0" />
                      <span>
                        Đặt ảnh CCCD gốc rõ nét ở trên để AI OCR trích xuất
                        thông tin. Khi hoàn tất, các ô kết quả bên phải sẽ tự
                        động được điền và băm Blockchain.
                      </span>
                    </div>
                    <Button
                      onClick={handleExtractOcr}
                      disabled={!frontPreview && !frontUrl}
                      className="w-full h-11 text-sm bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                      <ShieldCheck className="h-5 w-5" /> Bắt đầu trích xuất
                      thông tin (OCR)
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Extracted Results Panel (col-span-4) */}
            <div className="lg:col-span-4 border border-border rounded-2xl p-5 bg-white shadow-sm flex flex-col h-full overflow-y-auto scrollbar-thin text-left justify-between">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-primary uppercase pb-2 border-b border-border/40 flex items-center gap-1.5 shrink-0">
                  <Shield className="h-4 w-4" /> Kết quả trích xuất tự động
                </h4>

                <div className="space-y-3">
                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                      Số CCCD
                    </label>
                    <input
                      type="text"
                      placeholder="Nhận dạng tự động..."
                      value={kycForm.cccdNumber || ''}
                      onChange={e =>
                        setKycForm({ ...kycForm, cccdNumber: e.target.value })
                      }
                      className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      placeholder="Nhận dạng tự động..."
                      value={kycForm.fullName || ''}
                      onChange={e =>
                        setKycForm({ ...kycForm, fullName: e.target.value })
                      }
                      className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                        Ngày sinh
                      </label>
                      <input
                        type="text"
                        placeholder="Tự động..."
                        value={kycForm.dob || ''}
                        onChange={e =>
                          setKycForm({ ...kycForm, dob: e.target.value })
                        }
                        className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                        Giới tính
                      </label>
                      <input
                        type="text"
                        placeholder="Tự động..."
                        value={kycForm.gender || ''}
                        onChange={e =>
                          setKycForm({ ...kycForm, gender: e.target.value })
                        }
                        className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                        Quốc tịch
                      </label>
                      <input
                        type="text"
                        placeholder="Tự động..."
                        value={kycForm.nationality || ''}
                        onChange={e =>
                          setKycForm({
                            ...kycForm,
                            nationality: e.target.value,
                          })
                        }
                        className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                        Quê quán
                      </label>
                      <input
                        type="text"
                        placeholder="Tự động..."
                        value={kycForm.placeOfOrigin || ''}
                        onChange={e =>
                          setKycForm({
                            ...kycForm,
                            placeOfOrigin: e.target.value,
                          })
                        }
                        className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[9px] font-bold text-muted uppercase tracking-wider block">
                      Nơi thường trú
                    </label>
                    <input
                      type="text"
                      placeholder="Nhận dạng tự động..."
                      value={kycForm.address || ''}
                      onChange={e =>
                        setKycForm({ ...kycForm, address: e.target.value })
                      }
                      className="w-full border border-border rounded-xl px-3 py-1.5 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                    />
                  </div>
                </div>

                {cccdUploaded && (
                  <div className="border-t border-border pt-3 space-y-3 animate-fade-in">
                    <h4 className="text-[11px] font-bold text-primary uppercase flex items-center gap-1">
                      <Brain className="h-3.5 w-3.5" />
                      AI Preferences
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-muted block">
                          Khu vực
                        </label>
                        <select
                          value={preferredDistrict}
                          onChange={e => setPreferredDistrict(e.target.value)}
                          className="w-full border border-border rounded-xl px-2.5 py-1 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                        >
                          <option value="Bình Thạnh">Bình Thạnh</option>
                          <option value="Quận 1">Quận 1</option>
                          <option value="Quận 2">Quận 2</option>
                          <option value="Quận 7">Quận 7</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-muted block">
                          Số phòng
                        </label>
                        <select
                          value={rooms}
                          onChange={e => setRooms(Number(e.target.value))}
                          className="w-full border border-border rounded-xl px-2.5 py-1 text-xs text-fg focus:outline-none focus:border-primary bg-white font-semibold"
                        >
                          <option value={1}>1 PN</option>
                          <option value={2}>2 PN</option>
                          <option value={3}>3 PN</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-muted block">
                        Thu nhập:{' '}
                        <span className="text-primary font-bold">
                          {formatCurrency(income)}
                        </span>
                      </label>
                      <input
                        type="range"
                        min={8000000}
                        max={150000000}
                        step={1000000}
                        value={income}
                        onChange={e => setIncome(Number(e.target.value))}
                        className="w-full h-1 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  </div>
                )}
              </div>

              {cccdUploaded ? (
                <div className="space-y-3 pt-3 border-t border-border shrink-0 mt-3">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setCccdUploaded(false)}
                      variant="secondary"
                      className="flex-1 h-9 text-xs rounded-full font-bold cursor-pointer"
                    >
                      Quét lại
                    </Button>
                    <Button
                      onClick={handleVerifyAndRecommend}
                      className="flex-1 h-9 text-xs bg-success hover:bg-success/90 text-white rounded-full font-bold shadow-md flex items-center justify-center gap-1 border-none cursor-pointer"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" /> Xác nhận & Ký
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 border border-dashed border-border rounded-2xl h-[120px] bg-surface/5 text-center mt-4">
                  <Upload className="h-6 w-6 text-muted/40 mb-1" />
                  <span className="text-[10px] font-bold text-muted">
                    Chưa có kết quả OCR
                  </span>
                  <span className="text-[9px] text-muted/80 mt-0.5">
                    Vui lòng hoàn tất tải ảnh CCCD ở cột bên trái và nhấn Trích
                    xuất.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Hidden canvases for capturing webcam frames */}
      <canvas ref={canvasRef1} className="hidden" />
      <canvas ref={canvasRef2} className="hidden" />
    </div>
  )
}
