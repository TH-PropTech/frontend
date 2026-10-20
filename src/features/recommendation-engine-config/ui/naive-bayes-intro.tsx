'use client'

import * as React from 'react'
import { BrainCircuit } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'
import {
  NAIVE_BAYES_INTRO,
  NAIVE_BAYES_DATA_SOURCE,
  NAIVE_BAYES_PARTS,
  NAIVE_BAYES_EXAMPLE,
} from '../model/strategy-explainers'

export function NaiveBayesIntro(): React.ReactElement {
  const intro = NAIVE_BAYES_INTRO
  const data = NAIVE_BAYES_DATA_SOURCE
  const parts = NAIVE_BAYES_PARTS
  const example = NAIVE_BAYES_EXAMPLE
  return (
    <Card className="border-border bg-surface shadow-xs">
      <CardContent className="p-4 sm:p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary-soft text-primary shrink-0">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm sm:text-base font-bold text-fg">
              {intro.title}
            </h2>
            <p className="text-xs text-muted leading-relaxed">{intro.lead}</p>
          </div>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {intro.steps.map((s, i) => (
            <li
              key={s.title}
              className="flex gap-3 rounded-xl border border-border bg-surface-muted/30 p-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-on-control">
                {i + 1}
              </span>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-fg">{s.title}</p>
                <p className="text-[11px] text-muted leading-relaxed">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-fg">{data.title}</p>
          <p className="text-[11px] text-muted leading-relaxed">{data.intro}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 rounded-xl border border-border bg-surface-muted/40 p-3 text-[11px]">
            {data.fields.map(f => (
              <li key={f.field} className="flex justify-between gap-2">
                <span className="text-fg">{f.field}</span>
                <span className="font-mono text-muted text-right">
                  {f.example}
                </span>
              </li>
            ))}
          </ul>
          <ul className="list-disc space-y-1 pl-5 text-[11px] text-muted leading-relaxed">
            {data.notes.map(n => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-fg">{intro.formulaTitle}</p>
          <div className="rounded-xl border border-border bg-surface-muted/40 p-3 space-y-1">
            {intro.formula.map(f => (
              <p key={f} className="font-mono text-[12px] text-fg break-words">
                {f}
              </p>
            ))}
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[11px] text-muted leading-relaxed">
            {intro.formulaSymbols.map(s => (
              <React.Fragment key={s.symbol}>
                <dt className="font-mono font-semibold text-fg">{s.symbol}</dt>
                <dd>{s.meaning}</dd>
              </React.Fragment>
            ))}
          </dl>
          <p className="text-[11px] text-muted leading-relaxed">
            {intro.formulaNote}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-fg">{parts.title}</p>
          <ul className="space-y-2">
            {parts.parts.map(p => (
              <li
                key={p.name}
                className="rounded-xl border border-border bg-surface-muted/30 p-3 space-y-1"
              >
                <p className="text-xs font-semibold text-fg">{p.name}</p>
                <p className="font-mono text-[12px] text-fg break-words">
                  {p.words}
                </p>
                <p className="text-[11px] text-muted leading-relaxed">
                  {p.note}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-fg">{example.title}</p>
          <p className="text-[11px] text-muted leading-relaxed">
            {example.setup}
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-[11px]">
              <thead className="bg-surface-muted/60 text-left text-fg">
                <tr>
                  {example.table.columns.map(c => (
                    <th key={c} className="px-3 py-2 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-muted">
                {example.table.rows.map(r => (
                  <tr key={r[0]} className="border-t border-border">
                    {r.map(cell => (
                      <td key={cell} className="px-3 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted leading-relaxed">
            {example.guest}
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-[11px]">
              <thead className="bg-surface-muted/60 text-left text-fg">
                <tr>
                  <th className="px-3 py-2 font-semibold">Bước</th>
                  <th className="px-3 py-2 font-semibold">Căn A</th>
                  <th className="px-3 py-2 font-semibold">Căn B</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {example.steps.map(s => (
                  <tr key={s.label} className="border-t border-border">
                    <td className="px-3 py-2 font-semibold text-fg">
                      {s.label}
                    </td>
                    <td className="px-3 py-2 font-mono">{s.a}</td>
                    <td className="px-3 py-2 font-mono">{s.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="list-disc space-y-1 pl-5 text-[11px] text-fg leading-relaxed">
            {example.result.map(r => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="text-[11px] text-muted leading-relaxed">
            {example.whyPlusOne}
          </p>
          <p className="text-[11px] italic text-muted">{example.note}</p>
        </div>

        <div className="space-y-1 text-[11px] text-muted leading-relaxed">
          <p className="font-semibold text-fg">Nguồn tham khảo</p>
          <ol className="list-decimal space-y-1.5 pl-5">
            {intro.references.map(r => (
              <li key={r.citation}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg hover:text-primary hover:underline"
                >
                  {r.citation}
                </a>
                <p>Dùng cho: {r.usedFor}</p>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
