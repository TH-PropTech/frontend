'use client'

import * as React from 'react'

export interface MiniUiPreviewProps {
  articleId: string
  stepIndex: number
}

export function MiniUiPreview({
  articleId,
  stepIndex,
}: MiniUiPreviewProps): React.ReactElement | null {
  // Render small interactive mock UI previews based on the current guide and step
  switch (articleId) {
    case 'post-desktop':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                T
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-800">
                  Nguyen Van A
                </div>
                <div className="text-[8px] text-slate-400">
                  Khách hàng xác thực
                </div>
              </div>
            </div>
            <span className="bg-success/10 text-success text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-success/20">
              ✓ Đã KYC
            </span>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-white animate-in fade-in duration-300 relative overflow-hidden">
            <span className="text-[9px] font-bold tracking-wider text-slate-400">
              TH-PropTech
            </span>
            <div className="flex items-center gap-2 relative">
              <div className="bg-primary hover:bg-primary-hover px-2.5 py-1 rounded text-[8px] font-bold animate-pulse text-white shadow shadow-primary/50">
                Đăng tin +
              </div>
              <svg
                className="absolute -bottom-2 right-1 h-4 w-4 text-slate-100 fill-slate-100"
                viewBox="0 0 24 24"
              >
                <path d="M4 0l16 12.27-7.27 1.56 3.73 7.84-2.88 1.33-3.76-7.88-5.82 5.08z" />
              </svg>
            </div>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[8px] text-slate-400 font-bold block mb-0.5">
                  GIÁ THUÊ (VND)
                </span>
                <div className="bg-white border border-slate-200 rounded p-1 text-[9px] font-bold text-slate-700">
                  12,000,000
                </div>
              </div>
              <div>
                <span className="text-[8px] text-slate-400 font-bold block mb-0.5">
                  TIỀN CỌC (VND)
                </span>
                <div className="bg-white border border-slate-200 rounded p-1 text-[9px] font-bold text-slate-700">
                  24,000,000
                </div>
              </div>
            </div>
          </div>
        )
      }
      if (stepIndex === 3) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-2 justify-around animate-in fade-in duration-300">
            <div className="flex flex-col items-center p-2 bg-white rounded-lg border border-slate-200 flex-1">
              <svg
                className="h-6 w-6 text-red-500 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-[7.5px] font-bold text-slate-700">
                SỔ HỒNG.PDF
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-white rounded-lg border border-slate-200 flex-1">
              <svg
                className="h-6 w-6 text-indigo-500 mb-1 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-[7.5px] font-bold text-slate-700">
                VR TOUR 360°
              </span>
            </div>
          </div>
        )
      }
      break

    case 'post-mobile':
      if (stepIndex === 0) {
        return (
          <div className="w-48 mx-auto bg-slate-900 rounded-2xl p-2 border border-slate-800 text-white flex items-center justify-around animate-in fade-in duration-300">
            <div className="flex flex-col items-center opacity-40">
              <span className="text-[8px]">Khám phá</span>
            </div>
            <div className="flex flex-col items-center text-primary">
              <div className="h-2 w-2 rounded-full bg-primary mb-0.5" />
              <span className="text-[8px] font-bold">Chủ nhà</span>
            </div>
            <div className="flex flex-col items-center opacity-40">
              <span className="text-[8px]">Cá nhân</span>
            </div>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-2 items-center text-center animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-lg p-2 w-full flex justify-between items-center">
              <span className="text-[9px] font-bold text-slate-700">
                Đăng tin mới
              </span>
              <span className="bg-primary text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                Bấm
              </span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 w-full text-[8.5px] text-slate-500 font-medium">
              🔔 Cho phép TH-PropTech truy cập máy ảnh và vị trí của bạn?
            </div>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col items-center relative animate-in fade-in duration-300">
            <div className="border-2 border-dashed border-success/60 rounded-lg w-full h-16 flex items-center justify-center text-success relative">
              <svg
                className="h-6 w-6 text-success animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
              </svg>
              <span className="absolute bottom-1 right-2 text-[7px] text-success/80 font-mono">
                GPS ACTIVE
              </span>
            </div>
          </div>
        )
      }
      if (stepIndex === 3) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1.5 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded p-1.5 text-[8.5px] font-bold text-slate-700">
              Căn hộ 2PN Vinhomes Grand Park
            </div>
            <button className="bg-primary text-white text-[8px] font-bold py-1.5 rounded-lg w-full text-center hover:bg-primary-hover shadow-sm">
              Gửi kiểm duyệt tin đăng
            </button>
          </div>
        )
      }
      break

    case 'kyc-info':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-2 justify-around animate-in fade-in duration-300">
            <div className="border border-slate-300 rounded p-1.5 bg-white relative flex-1 text-center">
              <div className="text-[6.5px] font-bold text-slate-400">
                CCCD MẶT TRƯỚC
              </div>
              <div className="h-6 bg-slate-100 rounded mt-1 flex items-center justify-center">
                <div className="h-3 w-4 bg-slate-300 rounded-sm" />
              </div>
            </div>
            <div className="border border-slate-300 rounded p-1.5 bg-white relative flex-1 text-center">
              <div className="text-[6.5px] font-bold text-slate-400">
                CCCD MẶT SAU
              </div>
              <div className="h-6 bg-slate-100 rounded mt-1 flex items-center justify-center">
                <div className="h-3 w-5 bg-slate-300 rounded-sm" />
              </div>
            </div>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5 animate-in fade-in duration-300">
            <div className="text-[8px] text-slate-400 font-bold">
              KẾT QUẢ AI ĐỌC ĐƯỢC (OCR):
            </div>
            <div className="bg-white border border-slate-200 rounded p-1.5 space-y-1 text-[8px]">
              <div>
                <span className="text-slate-400">Họ và tên:</span>{' '}
                <span className="font-bold text-slate-700">NGUYỄN VĂN A</span>
              </div>
              <div>
                <span className="text-slate-400">Số CCCD:</span>{' '}
                <span className="font-bold text-slate-700">079092001234</span>
              </div>
            </div>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <div className="relative h-12 w-12 rounded-full border-2 border-dashed border-primary flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-success rounded-full flex items-center justify-center text-white text-[7px] font-bold">
                ✓
              </div>
            </div>
            <span className="text-[8px] text-slate-500 font-bold mt-1.5">
              NHÁY MẮT & QUAY ĐẦU CHẬM
            </span>
          </div>
        )
      }
      break

    case 'fabric-ca-cert':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between animate-in fade-in duration-300">
            <span className="text-[9px] font-bold text-slate-700">
              Trạng thái KYC
            </span>
            <span className="bg-success text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
              ĐÃ XÁC MINH ✓
            </span>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white flex flex-col gap-1.5 animate-in fade-in duration-300">
            <div className="text-[7.5px] font-mono text-emerald-400">
              $ fabric-ca-client enroll -u https://user:pwd@ca.org1
            </div>
            <div className="h-5 bg-slate-800 rounded flex items-center px-1.5 justify-between">
              <span className="text-[8px] font-mono text-slate-300">
                fabric-ca-cert.pem
              </span>
              <span className="text-[7.5px] text-emerald-400 font-bold">
                ACTIVE
              </span>
            </div>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="text-[8px] text-slate-400 font-bold mb-1">
              MẬT KHẨU CHỮ KÝ (MÃ PIN 6 SỐ)
            </div>
            <div className="flex gap-1 mb-1.5">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div
                  key={i}
                  className="h-5 w-5 rounded border border-slate-300 bg-white flex items-center justify-center text-[10px] font-bold text-slate-700"
                >
                  *
                </div>
              ))}
            </div>
            <span className="text-[7.5px] text-amber-600 font-bold">
              Ghi nhớ kỹ và không chia sẻ
            </span>
          </div>
        )
      }
      break

    case 'smart-contract':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1.5 animate-in fade-in duration-300">
            <span className="text-[8px] text-slate-400 font-bold">
              SOẠN ĐIỀU KHOẢN HỢP ĐỒNG:
            </span>
            <div className="bg-white border border-slate-200 rounded p-1 text-[8.5px] text-slate-500 font-medium line-clamp-2">
              Bên A cho Bên B thuê căn hộ số 101 với giá thuê là 12,000,000
              đ/tháng...
            </div>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1.5 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded p-2 flex justify-between items-center shadow-sm">
              <span className="text-[8px] font-bold text-slate-700">
                Xác nhận ký số
              </span>
              <button className="bg-primary text-white text-[8.5px] font-bold px-3 py-1.5 rounded hover:bg-primary-hover animate-pulse">
                Nhập PIN & Ký
              </button>
            </div>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col gap-1 text-white animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <span className="text-[8.5px] text-slate-300 font-bold">
                Techcombank Ký quỹ
              </span>
              <span className="bg-amber-500/20 text-amber-400 text-[7px] font-bold px-1.5 py-0.5 rounded border border-amber-500/20">
                ĐANG PHONG TỎA
              </span>
            </div>
            <div className="text-[9px] font-bold text-emerald-400 mt-0.5">
              24,000,000 VND
            </div>
          </div>
        )
      }
      break

    case 'ai-recommender':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5 animate-in fade-in duration-300">
            <span className="text-[8.5px] text-slate-400 font-bold">
              SỞ THÍCH CỦA BẠN:
            </span>
            <div className="flex flex-wrap gap-1">
              <span className="bg-primary-soft text-primary text-[8px] font-bold px-2 py-0.5 rounded-full">
                Quận 9
              </span>
              <span className="bg-primary-soft text-primary text-[8px] font-bold px-2 py-0.5 rounded-full">
                Gần chợ
              </span>
              <span className="bg-primary-soft text-primary text-[8px] font-bold px-2 py-0.5 rounded-full">
                &lt; 15 Tr/tháng
              </span>
            </div>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-2 justify-around animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex flex-col items-center flex-1 text-slate-500 hover:text-slate-800">
              <svg
                className="h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-[7.5px] mt-0.5">Lượt Xem</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex flex-col items-center flex-1 text-slate-500 hover:text-slate-800">
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[7.5px] mt-0.5">Yêu Thích</span>
            </div>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center animate-in fade-in duration-300 shadow-sm bg-gradient-to-r from-amber-50 to-white">
            <div>
              <span className="text-[8px] text-slate-400 font-bold block">
                GỢI Ý HOT
              </span>
              <span className="text-[9px] font-bold text-slate-800 block">
                Vinhomes Grand Park
              </span>
            </div>
            <span className="bg-amber-100 text-amber-700 text-[8.5px] font-bold px-2 py-0.5 rounded-full border border-amber-200 animate-pulse">
              Match 98%
            </span>
          </div>
        )
      }
      break

    case 'payment-guide':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between animate-in fade-in duration-300">
            <div>
              <span className="text-[7.5px] text-slate-400 font-bold block">
                TÀI KHOẢN KÝ QUỸ (VIRTUAL)
              </span>
              <span className="text-[9.5px] font-mono font-bold text-slate-700">
                9020 1234 5678 99
              </span>
            </div>
            <div className="bg-slate-200 p-1.5 rounded">
              <svg
                className="h-6 w-6 text-slate-800"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm15 0h3v3h-3zm-2 2h2v2h-2zm2 2h3v3h-3zm-4 0h2v2h-2zm2-4h2v2h-2zm-2 2h2v2h-2z" />
              </svg>
            </div>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5 animate-in fade-in duration-300">
            <div className="flex justify-between items-center text-[8.5px]">
              <span className="text-slate-400">Số tiền:</span>
              <span className="font-bold text-slate-700">24,000,000 đ</span>
            </div>
            <div className="bg-success-soft border border-success/20 rounded p-1.5 text-[8px] text-success font-bold text-center">
              ✓ Thực hiện chuyển khoản chính xác 100%
            </div>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white flex flex-col gap-1 animate-in fade-in duration-300">
            <span className="text-[8px] text-emerald-400 font-bold font-mono">
              ⚡ TECHCOMBANK WEBHOOK RECEIVED
            </span>
            <div className="bg-slate-800 p-1.5 rounded text-[8px] font-mono text-slate-300 flex justify-between">
              <span>Syncing to Fabric ledger...</span>
              <span className="text-emerald-400 font-bold">OK</span>
            </div>
          </div>
        )
      }
      break

    case 'blockchain-invoice':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1 animate-in fade-in duration-300">
            <span className="text-[8px] text-slate-400 font-bold">
              LỊCH SỬ HÓA ĐƠN
            </span>
            <div className="bg-white border border-slate-200 rounded p-1.5 flex justify-between items-center">
              <div>
                <span className="text-[8.5px] font-bold text-slate-700 block">
                  Tháng 06/2026
                </span>
                <span className="text-[7.5px] text-slate-400 font-mono">
                  TxID: 0x8a92...df21
                </span>
              </div>
              <span className="bg-success-soft text-success text-[7.5px] font-bold px-2 py-0.5 rounded-full border border-success/15">
                Đã thanh toán
              </span>
            </div>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white flex flex-col gap-1 animate-in fade-in duration-300">
            <span className="text-[8px] text-slate-400 font-bold">
              BLOCKCHAIN TRANSACTION
            </span>
            <div className="bg-slate-800 p-1.5 rounded text-[7.5px] font-mono text-slate-300 break-all leading-normal">
              0x8a92b21c456df21a8bd3324f923b7b212356df12efd8312019b88...
            </div>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1 animate-in fade-in duration-300 text-[8px]">
            <div>
              <span className="text-slate-400">Timestamp:</span>{' '}
              <span className="font-bold text-slate-700">
                2026-06-20 10:45:33 UTC
              </span>
            </div>
            <div>
              <span className="text-slate-400">Tenant Signature:</span>{' '}
              <span className="font-mono text-slate-500">
                FabricCA::Tenant_079...
              </span>
            </div>
            <div className="text-[7.5px] text-success font-bold mt-1 text-center">
              ✓ ĐÃ XÁC MINH SỔ CÁI BẤT BIẾN
            </div>
          </div>
        )
      }
      break

    case 'vr-guide':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
            <div className="h-10 w-16 bg-slate-200 rounded border border-slate-300 relative flex items-center justify-center">
              <svg
                className="h-6 w-6 text-slate-500 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 6.57"
                />
              </svg>
              <div className="absolute top-1 left-2 text-[6px] text-slate-400 font-bold">
                Xoay camera 360°
              </div>
            </div>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-center animate-in fade-in duration-300">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-primary/20 border-2 border-primary animate-ping" />
              <div className="absolute top-1 left-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-[9px] font-bold">
                ➔
              </div>
            </div>
            <span className="text-[8px] font-bold text-slate-600 ml-3">
              Chuyển sang nhà bếp
            </span>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between animate-in fade-in duration-300">
            <span className="text-[8px] text-slate-500 font-bold">
              Kính thực tế ảo
            </span>
            <div className="h-8 w-12 bg-slate-900 border border-slate-800 rounded flex items-center justify-around text-white">
              <div className="h-3 w-3 rounded-full bg-slate-700" />
              <div className="h-3 w-3 rounded-full bg-slate-700" />
            </div>
          </div>
        )
      }
      break

    case 'policy-blacklist':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center text-red-700 bg-red-50 border-red-200 animate-in fade-in duration-300">
            <span className="text-[8px] font-bold">⚠️ Phát hiện tin ảo</span>
            <span className="bg-red-200 text-[7.5px] font-bold px-2 py-0.5 rounded-full border border-red-300">
              Bấm Báo cáo
            </span>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center text-slate-700 bg-slate-100 border-slate-300 animate-in fade-in duration-300">
            <div>
              <span className="text-[8.5px] font-bold block text-slate-800">
                Chủ nhà spam
              </span>
              <span className="text-[7px] text-slate-400 block">
                Tài khoản: user_host_99
              </span>
            </div>
            <span className="bg-red-500 text-white text-[7.5px] font-bold px-2 py-0.5 rounded-full animate-pulse">
              KHÓA 30 NGÀY
            </span>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white flex flex-col gap-1.5 animate-in fade-in duration-300">
            <span className="text-[8.5px] text-red-500 font-bold font-mono">
              ☠️ BLOCKCHAIN BLACKLIST
            </span>
            <div className="bg-slate-800 p-1.5 rounded text-[8px] font-mono text-slate-300 flex justify-between">
              <span>FabricCert::user_host_99</span>
              <span className="text-red-500 font-bold">REVOKED</span>
            </div>
          </div>
        )
      }
      break

    case 'policy-privacy':
      if (stepIndex === 0) {
        return (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white flex items-center justify-between animate-in fade-in duration-300">
            <div>
              <span className="text-[7.5px] text-slate-400 font-bold block">
                DỮ LIỆU ĐÃ MÃ HÓA
              </span>
              <span className="text-[9.5px] font-mono font-bold text-emerald-400">
                AES-256 SECURED
              </span>
            </div>
            <svg
              className="h-6 w-6 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        )
      }
      if (stepIndex === 1) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1 animate-in fade-in duration-300">
            <span className="text-[8px] text-slate-400 font-bold">
              MỤC ĐÍCH SỬ DỤNG
            </span>
            <span className="text-[8px] text-slate-700 font-medium leading-normal">
              1. Xác minh định danh KYC.
              <br />
              2. Ký kết hợp đồng blockchain.
            </span>
          </div>
        )
      }
      if (stepIndex === 2) {
        return (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center animate-in fade-in duration-300">
            <span className="text-[8px] font-bold text-slate-700">
              Quyền xóa dữ liệu
            </span>
            <button className="bg-red-500 hover:bg-red-600 text-white text-[8px] font-bold px-2 py-1 rounded">
              Yêu cầu xóa tài khoản
            </button>
          </div>
        )
      }
      break

    default:
      return null
  }

  return null
}
