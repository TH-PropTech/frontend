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
  const tabRefs = React.useRef<Map<AiConfigTab, HTMLButtonElement>>(new Map())

  const handleKeyDown = (e: React.KeyboardEvent, index: number): void => {
    let targetIndex = -1
    if (e.key === 'ArrowRight') {
      targetIndex = (index + 1) % TABS.length
    } else if (e.key === 'ArrowLeft') {
      targetIndex = (index - 1 + TABS.length) % TABS.length
    } else if (e.key === 'Home') {
      targetIndex = 0
    } else if (e.key === 'End') {
      targetIndex = TABS.length - 1
    }

    if (targetIndex !== -1) {
      e.preventDefault()
      const next = TABS[targetIndex]
      if (next) {
        setTab(next.id)
        tabRefs.current.get(next.id)?.focus()
      }
    }
  }

  return (
    <div className="space-y-5">
      <div
        role="tablist"
        aria-label="Cấu hình AI"
        className="flex gap-1 border-b border-border"
      >
        {TABS.map((t, idx) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              ref={el => {
                if (el) tabRefs.current.set(t.id, el)
                else tabRefs.current.delete(t.id)
              }}
              type="button"
              role="tab"
              id={`ai-config-tab-${t.id}`}
              tabIndex={active ? 0 : -1}
              aria-selected={active}
              aria-controls={`ai-config-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              onKeyDown={e => handleKeyDown(e, idx)}
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
