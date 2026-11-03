'use client'

import * as React from 'react'
import { Badge } from '@/shared/ui/badge'
import { UseProfileReturn } from '../model/use-profile'
import { ShieldCheck, ChevronLeft } from 'lucide-react'
import { KycRecommendations } from './components/kyc-recommendations'
import { KycStep1 } from './components/kyc-step1'
import { KycOcrIssuesDialog } from './components/kyc-ocr-issues-dialog'
import { KycSelfieStep } from './components/kyc-selfie-step'
import { KycStep2 } from './components/kyc-step2'
import { useKycFlow } from './hooks/use-kyc-flow'

interface ModalKycProps {
  profile: UseProfileReturn
}

export function ModalKyc({
  profile,
}: ModalKycProps): React.ReactElement | null {
  const { showKycModal, kycForm, setKycForm } = profile

  const {
    currentStep,
    setCurrentStep,
    isProcessing,
    kycDemoMaintenanceMode,
    fileInputRef1,
    fileInputRef2,
    videoRef1,
    videoRef2,
    canvasRef1,
    canvasRef2,
    frontPreview,
    backPreview,
    isWebcamActive1,
    isWebcamActive2,
    showResults,
    preferredDistrict,
    setPreferredDistrict,
    income,
    setIncome,
    rooms,
    setRooms,
    recommendations,
    feedbackGiven,
    startWebcam,
    takePicture,
    handleFileChange,
    handleExtractOcr,
    handleConfirmAndSubmitKyc,
    handleFeedback,
    handleCloseAll,
    ocrIssues,
    dismissOcrIssues,
    retakeFlaggedCards,
    continueWithManualEdit,
    selfie: {
      videoRef: selfieVideoRef,
      canvasRef: selfieCanvasRef,
      fileInputRef: selfieFileInputRef,
      selfiePreview,
      isCameraActive,
      isVerifying: isSelfieVerifying,
      faceError,
      startCamera,
      capture,
      retake,
      handleFile: handleSelfieFile,
      verify: verifyFace,
    },
  } = useKycFlow(profile)

  if (!showKycModal) return null

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(v)
      .replace('₫', 'đ')

  return (
    <div
      className="fixed inset-0 bg-[#FFFDF9] z-50 overflow-hidden flex flex-col font-sans"
      style={{ backgroundColor: '#FFFDF9' }}
    >
      {/* Sticky Top Header */}
      <header className="shrink-0 border-b border-border bg-[#FFFDF9]/95 backdrop-blur px-6 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3.5">
          <button
            onClick={handleCloseAll}
            className="flex items-center justify-center h-9 w-9 rounded-full border border-border bg-white hover:bg-slate-50 transition-all cursor-pointer text-fg"
            title="Quay lại"
          >
            <ChevronLeft className="h-5 w-5 text-[#9F3F2A]" />
          </button>
          <div>
            <h1 className="font-display text-base font-bold text-fg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#9F3F2A]" /> Xác minh danh
              tính eKYC Tự động
            </h1>
            <p className="text-[11px] text-muted mt-0.5 font-sans">
              Công nghệ AI OCR & Ký CA neo trên Hyperledger Fabric.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted">Trạng thái:</span>
          {isProcessing ? (
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 animate-pulse text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              ĐANG XỬ LÝ...
            </Badge>
          ) : (
            <Badge className="bg-slate-100 text-slate-800 border-slate-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              BƯỚC {currentStep} / 3
            </Badge>
          )}
        </div>
      </header>

      {/* Stepper progress indicator */}
      {!showResults && (
        <div className="shrink-0 bg-white border-b border-border/60 py-4 px-6 md:px-12 flex justify-center">
          <div className="flex items-center w-full max-w-xl justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-slate-200 -translate-y-1/2 z-0" />

            <div
              className="absolute left-0 top-1/2 h-[2px] bg-[#9F3F2A] -translate-y-1/2 transition-all duration-300 z-0"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />

            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 ${
                  currentStep >= 1
                    ? 'bg-[#9F3F2A] border-[#9F3F2A] text-white shadow-md'
                    : 'bg-white border-slate-300 text-slate-500'
                }`}
              >
                1
              </div>
              <span
                className={`text-[10px] mt-1.5 font-bold transition-colors ${currentStep >= 1 ? 'text-[#9F3F2A]' : 'text-slate-500'}`}
              >
                Tải CCCD
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 ${
                  currentStep >= 2
                    ? 'bg-[#9F3F2A] border-[#9F3F2A] text-white shadow-md'
                    : 'bg-white border-slate-300 text-slate-500'
                }`}
              >
                2
              </div>
              <span
                className={`text-[10px] mt-1.5 font-bold transition-colors ${currentStep >= 2 ? 'text-[#9F3F2A]' : 'text-slate-500'}`}
              >
                Chụp Selfie
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 ${
                  currentStep >= 3
                    ? 'bg-[#9F3F2A] border-[#9F3F2A] text-white shadow-md'
                    : 'bg-white border-slate-300 text-slate-500'
                }`}
              >
                3
              </div>
              <span
                className={`text-[10px] mt-1.5 font-bold transition-colors ${currentStep >= 3 ? 'text-[#9F3F2A]' : 'text-slate-500'}`}
              >
                Nộp Hồ Sơ
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Area */}
      <main className="flex-1 overflow-hidden p-6 flex flex-col justify-start bg-slate-50/30">
        {showResults ? (
          <KycRecommendations
            recommendations={recommendations}
            feedbackGiven={feedbackGiven}
            handleFeedback={handleFeedback}
            handleCloseAll={handleCloseAll}
            formatCurrency={formatCurrency}
          />
        ) : (
          <div className="max-w-4xl mx-auto w-full h-full flex flex-col justify-start overflow-hidden">
            {currentStep === 1 && (
              <KycStep1
                isWebcamActive1={isWebcamActive1}
                isWebcamActive2={isWebcamActive2}
                frontPreview={frontPreview}
                backPreview={backPreview}
                videoRef1={videoRef1}
                videoRef2={videoRef2}
                fileInputRef1={fileInputRef1}
                fileInputRef2={fileInputRef2}
                startWebcam={startWebcam}
                takePicture={takePicture}
                handleFileChange={handleFileChange}
                handleExtractOcr={handleExtractOcr}
                isProcessing={isProcessing}
                maintenanceMode={kycDemoMaintenanceMode}
              />
            )}

            {currentStep === 2 && (
              <KycSelfieStep
                selfiePreview={selfiePreview}
                isCameraActive={isCameraActive}
                isVerifying={isSelfieVerifying}
                faceError={faceError}
                maintenanceMode={kycDemoMaintenanceMode}
                videoRef={selfieVideoRef}
                fileInputRef={selfieFileInputRef}
                startCamera={startCamera}
                capture={capture}
                retake={retake}
                handleFile={handleSelfieFile}
                verify={verifyFace}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <KycStep2
                kycForm={kycForm}
                setKycForm={setKycForm}
                preferredDistrict={preferredDistrict}
                setPreferredDistrict={setPreferredDistrict}
                rooms={rooms}
                setRooms={setRooms}
                income={income}
                setIncome={setIncome}
                formatCurrency={formatCurrency}
                isProcessing={isProcessing}
                setCurrentStep={setCurrentStep}
                handleConfirmAndSubmitKyc={handleConfirmAndSubmitKyc}
              />
            )}
          </div>
        )}
      </main>

      <KycOcrIssuesDialog
        issues={ocrIssues}
        onRetake={retakeFlaggedCards}
        onContinue={continueWithManualEdit}
        onDismiss={dismissOcrIssues}
      />

      {/* Hidden canvases for capturing webcam frames */}
      <canvas ref={canvasRef1} className="hidden" />
      <canvas ref={canvasRef2} className="hidden" />
      <canvas ref={selfieCanvasRef} className="hidden" />
    </div>
  )
}
