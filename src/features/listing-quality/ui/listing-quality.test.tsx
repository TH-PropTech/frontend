import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ImprovementChecklist } from './improvement-checklist'
import { QualityScoreCard } from './quality-score-card'

describe('listing quality UI', () => {
  const result = {
    score: 72,
    maxScore: 100 as const,
    grade: 'good' as const,
    breakdown: [
      { category: 'photos', label: 'Ảnh & Media', score: 20, maxScore: 25 },
      { category: 'freshness', label: 'Độ mới', score: 7, maxScore: 10 },
    ],
    checklist: [],
  }
  it('renders score, grade and every breakdown item', () => {
    render(<QualityScoreCard result={result} />)
    expect(screen.getByText('72')).toBeTruthy()
    expect(screen.getByText('good')).toBeTruthy()
    expect(screen.getByText('Ảnh & Media')).toBeTruthy()
    expect(screen.getByText('Độ mới')).toBeTruthy()
  })
  it('orders incomplete high-priority actions before completed ones', () => {
    render(
      <ImprovementChecklist
        checklist={[
          {
            id: 'done',
            label: 'Đã xong',
            priority: 'low',
            completed: true,
            category: 'x',
          },
          {
            id: 'urgent',
            label: 'Cần làm',
            priority: 'high',
            completed: false,
            category: 'x',
          },
        ]}
      />
    )
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('Cần làm')
  })
})
