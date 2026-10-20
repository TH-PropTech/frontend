import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { AI_GUIDES } from './ai-guide-data'
import { categories } from './articles-data'

const articles = categories.flatMap(c => c.articles)

// Những câu đã được xác định là sai nghiệp vụ: tiền đi thẳng cho chủ nhà, ký bằng VNPT SmartCA, không có giữ cọc trung gian.
const FORBIDDEN = [
  'ký quỹ',
  'bảo chứng',
  'Techcombank',
  'Fabric CA',
  'X.509',
  'Virtual Account',
  'gas fee',
  'Blacklist',
  'mã hóa đầu cuối',
  '100%',
]

describe('Cẩm nang: bài viết và hướng dẫn', () => {
  it('mỗi bài đều có hướng dẫn và id không trùng', () => {
    const ids = articles.map(a => a.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids)
      expect(AI_GUIDES[id], `thiếu hướng dẫn cho ${id}`).toBeDefined()
    for (const id of Object.keys(AI_GUIDES))
      expect(ids, `hướng dẫn thừa: ${id}`).toContain(id)
  })

  it('mỗi bước có đúng một lời đọc', () => {
    for (const [id, g] of Object.entries(AI_GUIDES)) {
      expect(g.stepTips.length, id).toBe(g.steps.length)
      expect(g.steps.every(Boolean), id).toBe(true)
    }
  })

  it('có bài về VNPT SmartCA và sơ đồ 3D', () => {
    expect(articles.some(a => a.id === 'smartca-sign')).toBe(true)
    expect(articles.some(a => a.id === 'floorplan-3d')).toBe(true)
  })

  it('không còn câu sai nghiệp vụ trong bài lẫn lời đọc', () => {
    const text = [
      ...articles.map(
        a => `${a.title} ${renderToStaticMarkup(<>{a.content}</>)}`
      ),
      ...categories.map(c => `${c.title} ${c.desc}`),
      ...Object.values(AI_GUIDES).flatMap(g => [
        g.title,
        g.summary,
        g.tip,
        ...g.steps,
        ...g.stepTips,
      ]),
    ].join('\n')
    for (const word of FORBIDDEN) expect(text, word).not.toContain(word)
  })
})
