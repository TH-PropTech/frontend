'use client'

import * as React from 'react'

interface KycRecordData {
  cccdNumber: string
  name: string
  dob: string
  hometown: string
  address: string
}

interface CccdMockupCardProps {
  record: KycRecordData
  side: 'front' | 'back'
}

export function CccdMockupCard({
  record,
  side,
}: CccdMockupCardProps): React.ReactElement {
  if (side === 'front') {
    return (
      <div className="relative aspect-[1.58/1] w-full max-w-sm mx-auto bg-gradient-to-tr from-sky-100 to-indigo-50 border border-indigo-200/80 rounded-xl p-4 shadow-sm overflow-hidden flex flex-col justify-between">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, #1e1b4b 2px, transparent 0)',
            backgroundSize: '12px 12px',
          }}
        />
        <div className="relative flex justify-between items-start">
          <div className="text-[8px] font-bold text-indigo-950 font-body leading-tight">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            <br />
            Độc lập - Tự do - Hạnh phúc
          </div>
          <span className="text-[9px] font-bold text-indigo-900 border border-indigo-300 px-1 py-0.5 rounded bg-white/50">
            CCCD
          </span>
        </div>

        <div className="relative flex gap-3 my-2 items-center">
          {/* Simulated avatar */}
          <div className="h-14 w-11 bg-slate-300 rounded border border-indigo-300 flex items-center justify-center text-slate-500 font-mono text-[8px]">
            ảnh 3x4
          </div>
          {/* Key identity text */}
          <div className="text-[8px] space-y-1 font-body text-indigo-950">
            <div>
              <span className="text-slate-500">Số/No:</span>{' '}
              <strong className="font-mono text-[10px]">
                {record.cccdNumber}
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Họ và tên/Full name:</span>{' '}
              <strong>{record.name}</strong>
            </div>
            <div>
              <span className="text-slate-500">Ngày sinh/Date of birth:</span>{' '}
              <strong>{record.dob}</strong>
            </div>
            <div>
              <span className="text-slate-500">Quê quán/Place of origin:</span>{' '}
              <strong>{record.hometown}</strong>
            </div>
          </div>
        </div>

        <div className="text-[6px] text-slate-500 font-body text-right border-t border-indigo-200 pt-1.5">
          CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-[1.58/1] w-full max-w-sm mx-auto bg-gradient-to-tr from-sky-100 to-indigo-50 border border-indigo-200/80 rounded-xl p-4 shadow-sm overflow-hidden flex flex-col justify-between">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #1e1b4b 2px, transparent 0)',
          backgroundSize: '12px 12px',
        }}
      />
      <div className="relative flex justify-between items-start">
        <span className="text-[7px] text-indigo-900 font-body">
          MẶT SAU / BACK SIDE
        </span>
        <span className="text-[8px] font-mono text-indigo-950">
          MRZ ZONE CODE
        </span>
      </div>

      <div className="relative flex gap-4 my-2 items-center">
        {/* Fingerprint block */}
        <div className="h-10 w-10 border border-dashed border-indigo-400 bg-white/40 rounded flex items-center justify-center text-[6px] text-indigo-800 font-body">
          vân tay
        </div>
        {/* Address info */}
        <div className="text-[8px] font-body text-indigo-950 flex-1 space-y-0.5">
          <div>
            <span className="text-slate-500">Nơi thường trú:</span>
            <br />
            <strong>{record.address}</strong>
          </div>
        </div>
      </div>

      {/* MRZ bar */}
      <div className="bg-slate-200 p-1 rounded font-mono text-[7px] text-indigo-950 tracking-wider">
        I<span className="text-indigo-600">VNM</span>
        {record.cccdNumber}
        &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        <br />
        0208154M&lt;&lt;&lt;&lt;&lt;&lt;&lt;VNM&lt;&lt;&lt;&lt;&lt;&lt;&lt;NGUYEN&lt;&lt;VAN&lt;A
      </div>
    </div>
  )
}
