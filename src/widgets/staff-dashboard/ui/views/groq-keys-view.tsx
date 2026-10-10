'use client'

import * as React from 'react'
import { GroqKeysManager } from '@/features/groq-keys'

export function GroqKeysView(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold font-marketing text-fg">
          Quản lý API Key AI
        </h1>
        <p className="text-xs text-muted mt-1">
          Các key Groq này được dùng cho chatbot, tư vấn AI và phân tích hình
          ảnh. Khi một key hết token, hệ thống tự đổi sang key khác.
        </p>
      </div>
      <GroqKeysManager />
    </div>
  )
}
