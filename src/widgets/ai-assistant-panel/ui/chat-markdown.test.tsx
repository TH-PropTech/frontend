import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ChatMarkdown, parseChatMarkdown } from './chat-markdown'
import { chatErrorFromCode, chatErrorFromStatus } from './chat-errors'

describe('ChatMarkdown', () => {
  it('renders bold, italic, inline code and lists', () => {
    const { container } = render(
      <ChatMarkdown
        text={
          '**Đặt cọc** là *thỏa thuận* dùng `HĐ`\n\n- Mục một\n- Mục hai\n\n1. Bước một\n2. Bước hai'
        }
      />
    )
    expect(container.querySelector('strong')?.textContent).toBe('Đặt cọc')
    expect(container.querySelector('em')?.textContent).toBe('thỏa thuận')
    expect(container.querySelector('code')?.textContent).toBe('HĐ')
    expect(container.querySelectorAll('ul li')).toHaveLength(2)
    expect(container.querySelectorAll('ol li')).toHaveLength(2)
  })

  it('shows the raw asterisks of a plain price range instead of eating them', () => {
    const { container } = render(<ChatMarkdown text="Giá 5 * 3 = 15" />)
    expect(container.textContent).toBe('Giá 5 * 3 = 15')
  })

  it('links only http(s) addresses and opens them safely', () => {
    const { container } = render(
      <ChatMarkdown text="[Cổng DVC](https://dichvucong.gov.vn) và [xấu](javascript:alert(1)) và https://example.com/a" />
    )
    const links = [...container.querySelectorAll('a')]
    expect(links.map(a => a.getAttribute('href'))).toEqual([
      'https://dichvucong.gov.vn',
      'https://example.com/a',
    ])
    expect(
      links.every(a => a.getAttribute('rel') === 'noopener noreferrer')
    ).toBe(true)
    expect(links.every(a => a.getAttribute('target') === '_blank')).toBe(true)
    // the unsafe markup stays as inert text; it never becomes a link
    expect(container.querySelector('a[href^="javascript"]')).toBeNull()
    expect(container.textContent).toContain('[xấu](javascript:alert(1))')
  })

  it('never turns text into HTML', () => {
    const { container } = render(
      <ChatMarkdown
        text={'<img src=x onerror=alert(1)> <script>alert(1)</script>'}
      />
    )
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('script')).toBeNull()
    expect(container.textContent).toContain('<script>alert(1)</script>')
  })

  it('renders a pipe table with its header and rows', () => {
    const { container } = render(
      <ChatMarkdown
        text={'| Loại | Mức |\n| --- | --- |\n| Cọc | 1 tháng |\n| Phí | 0 |'}
      />
    )
    expect(
      [...container.querySelectorAll('th')].map(t => t.textContent)
    ).toEqual(['Loại', 'Mức'])
    expect(container.querySelectorAll('tbody tr')).toHaveLength(2)
  })

  it('keeps line breaks inside a paragraph and splits paragraphs on blank lines', () => {
    const blocks = parseChatMarkdown('dòng 1\ndòng 2\n\nđoạn 2')
    expect(blocks).toEqual([
      { kind: 'paragraph', lines: ['dòng 1', 'dòng 2'] },
      { kind: 'paragraph', lines: ['đoạn 2'] },
    ])
  })
})

describe('chat error classification', () => {
  it('maps the backend error code and offers a retry only when it can help', () => {
    expect(chatErrorFromCode(undefined)).toBeNull()
    expect(chatErrorFromCode('quota')).toMatchObject({
      kind: 'quota',
      retryable: true,
    })
    expect(chatErrorFromCode('timeout')?.message).toContain('chậm')
    expect(chatErrorFromCode('config')).toMatchObject({ retryable: false })
    expect(chatErrorFromCode('something-new')).toMatchObject({
      kind: 'upstream',
    })
  })

  it('maps HTTP statuses and a missing status (network) to different messages', () => {
    expect(chatErrorFromStatus(429).kind).toBe('quota')
    expect(chatErrorFromStatus(400)).toMatchObject({
      kind: 'tooLong',
      retryable: false,
    })
    expect(chatErrorFromStatus(500).kind).toBe('upstream')
    expect(chatErrorFromStatus(undefined)).toMatchObject({
      kind: 'network',
      retryable: true,
    })
    const messages = new Set(
      [429, 400, 500, undefined].map(s => chatErrorFromStatus(s).message)
    )
    expect(messages.size).toBe(4)
  })
})
