'use client'

import * as React from 'react'
import { RecommendationEngineView } from './recommendation-engine-view'
import { GroqKeysView } from './groq-keys-view'

type AiConfigTab = 'engine' | 'api-key'

const TABS: readonly { id: AiConfigTab; label: string }[] = [
  { id: 'engine', label: 'Cấu hình AI Engine' },
  { id: 'api-key', label: 'Cấu hình API Key' },
]

export function AiConfigView(): React.ReactElement {
  const [tab, setTab] = React.useState<AiConfigTab>('engine')

  return (
    <div className="space-y-5">
      <div
        role="tablist"
        aria-label="Cấu hình AI"
        className="flex gap-1 border-b border-border"
      >
        {TABS.map(t => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`ai-config-tab-${t.id}`}
              aria-selected={active}
              aria-controls={`ai-config-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-bold -mb-px border-b-2 transition-colors ${
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-fg'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`ai-config-panel-${tab}`}
        aria-labelledby={`ai-config-tab-${tab}`}
      >
        {tab === 'engine' ? <RecommendationEngineView /> : <GroqKeysView />}
      </div>
    </div>
  )
}
