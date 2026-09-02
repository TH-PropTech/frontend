'use client'

import * as React from 'react'

export function TaskDoughnutChart(): React.ReactElement {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">
          Phân bổ Công việc
        </h4>
        <p className="text-[11px] text-muted mt-1 font-body">
          Tỷ lệ trạng thái các loại hồ sơ tồn đọng.
        </p>
      </div>

      <div className="flex justify-center items-center py-4 relative">
        <svg width="160" height="160" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="transparent"
            stroke="var(--border)"
            strokeWidth="16"
          />
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="transparent"
            stroke="var(--primary)"
            strokeWidth="18"
            strokeDasharray="235.6 471.2"
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="transparent"
            stroke="var(--success)"
            strokeWidth="18"
            strokeDasharray="164.9 471.2"
            strokeDashoffset="-235.6"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="transparent"
            stroke="var(--danger)"
            strokeWidth="18"
            strokeDasharray="70.7 471.2"
            strokeDashoffset="-400.5"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
          <text
            x="100"
            y="96"
            fill="var(--fg)"
            fontSize="28"
            fontWeight="bold"
            textAnchor="middle"
            className="font-display"
          >
            43
          </text>
          <text
            x="100"
            y="118"
            fill="var(--muted)"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            className="tracking-wider uppercase"
          >
            TÁC VỤ
          </text>
        </svg>
      </div>

      <div className="space-y-2 pt-3 border-t border-border">
        <div className="flex justify-between items-center text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: 'var(--primary)' }}
            />
            <span className="text-muted">Duyệt tin BĐS</span>
          </div>
          <span className="text-fg font-bold">21 căn (50%)</span>
        </div>
        <div className="flex justify-between items-center text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: 'var(--success)' }}
            />
            <span className="text-muted">Định danh KYC</span>
          </div>
          <span className="text-fg font-bold">15 hồ sơ (35%)</span>
        </div>
        <div className="flex justify-between items-center text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: 'var(--danger)' }}
            />
            <span className="text-muted">Tranh chấp cọc</span>
          </div>
          <span className="text-fg font-bold">7 hồ sơ (15%)</span>
        </div>
      </div>
    </div>
  )
}
