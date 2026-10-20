'use client'

import * as React from 'react'
import {
  Info,
  Lightbulb,
  Calculator,
  Sigma,
  BookOpen,
  AlertTriangle,
  Target,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import type { StrategyExplainer } from '../model/strategy-explainers'

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <section className="space-y-2">
      <h3 className="flex items-center gap-2 text-sm font-bold text-fg">
        <span className="text-primary">{icon}</span>
        {title}
      </h3>
      <div className="text-[13px] text-muted leading-relaxed">{children}</div>
    </section>
  )
}

export function StrategyExplainerDialog({
  explainer,
  triggerLabel,
}: {
  explainer: StrategyExplainer
  /** Nhãn cho trình đọc màn hình của nút "i". */
  triggerLabel: string
}): React.ReactElement {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={triggerLabel}
          title="Xem giải thích, công thức và nguồn"
          onClick={e => e.stopPropagation()}
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary-soft/40 text-primary transition-colors hover:bg-primary hover:text-on-control focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </DialogTrigger>
      <DialogContent
        onClick={e => e.stopPropagation()}
        className="bg-surface border-border text-fg max-w-2xl max-h-[85vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-fg font-marketing pr-6">
            {explainer.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted">
            Giải thích dễ hiểu, ví dụ, công thức và nguồn tham khảo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <Section
            icon={<Lightbulb className="h-4 w-4" />}
            title="Nói đơn giản"
          >
            <ul className="list-disc space-y-1.5 pl-5">
              {explainer.plain.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Section>

          <Section
            icon={<Calculator className="h-4 w-4" />}
            title={explainer.example.title}
          >
            <ol className="list-decimal space-y-1.5 rounded-xl border border-border bg-surface-muted/40 p-3 pl-8">
              {explainer.example.steps.map(s => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </Section>

          <Section
            icon={<Target className="h-4 w-4" />}
            title="Khi nào nên dùng"
          >
            <p>{explainer.whenToUse}</p>
          </Section>

          <Section icon={<AlertTriangle className="h-4 w-4" />} title="Lưu ý">
            <ul className="list-disc space-y-1.5 pl-5">
              {explainer.caveats.map(c => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Section>

          <Section
            icon={<Sigma className="h-4 w-4" />}
            title="Công thức (dành cho người kỹ thuật)"
          >
            <div className="space-y-1 rounded-xl border border-border bg-surface-muted/40 p-3">
              {explainer.formula.map(f => (
                <p
                  key={f}
                  className="font-mono text-[12px] text-fg break-words"
                >
                  {f}
                </p>
              ))}
            </div>
            <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
              {explainer.symbols.map(s => (
                <React.Fragment key={s.symbol}>
                  <dt className="font-mono text-[12px] font-semibold text-fg">
                    {s.symbol}
                  </dt>
                  <dd>{s.meaning}</dd>
                </React.Fragment>
              ))}
            </dl>
          </Section>

          <Section
            icon={<BookOpen className="h-4 w-4" />}
            title="Nguồn tham khảo"
          >
            <ol className="list-decimal space-y-2.5 pl-5">
              {explainer.references.map(r => (
                <li key={r.citation}>
                  <p className="text-fg">
                    {r.url ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline"
                      >
                        {r.citation}
                      </a>
                    ) : (
                      r.citation
                    )}
                  </p>
                  {r.locator && (
                    <p className="text-[12px]">Vị trí: {r.locator}</p>
                  )}
                  <p className="text-[12px]">Dùng cho: {r.usedFor}</p>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[11px]">
              Công thức được đối chiếu với mã nguồn{' '}
              <code className="font-mono">
                backend/src/modules/properties/recommendations/engine/naive-bayes.engine.ts
              </code>
              .
            </p>
          </Section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
