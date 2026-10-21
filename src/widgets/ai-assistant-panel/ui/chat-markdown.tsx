import * as React from 'react'

/**
 * Renders the small markdown subset the assistant writes: **bold**, *italic*, `code`, [text](https://…),
 * bare http(s) links, "- " / "1. " lists, "#" headings and simple pipe tables. It builds React elements
 * only (no HTML injection) and links are limited to http(s), so model or scraped text cannot run script.
 */

const INLINE_RE =
  /(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s<)]+|\*[^*\s][^*\n]*\*)/g

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  let last = 0
  let index = 0
  for (const match of text.matchAll(INLINE_RE)) {
    const token = match[0]
    const start = match.index ?? 0
    if (start > last) out.push(text.slice(last, start))
    const key = `${keyPrefix}-${index++}`
    if (token.startsWith('**')) {
      out.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('`')) {
      out.push(
        <code
          key={key}
          className="rounded bg-zinc-200/70 px-1 py-0.5 text-[0.85em] dark:bg-zinc-700"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else if (token.startsWith('[')) {
      const label = token.slice(1, token.indexOf(']('))
      const url = token.slice(token.indexOf('](') + 2, -1)
      out.push(<ExternalLink key={key} href={url} label={label} />)
    } else if (token.startsWith('http')) {
      out.push(<ExternalLink key={key} href={token} label={token} />)
    } else {
      out.push(<em key={key}>{token.slice(1, -1)}</em>)
    }
    last = start + token.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function ExternalLink({
  href,
  label,
}: {
  href: string
  label: string
}): React.ReactElement {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-all text-[#C65A3A] underline underline-offset-2"
    >
      {label}
    </a>
  )
}

type Block =
  | { kind: 'paragraph'; lines: string[] }
  | { kind: 'heading'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'table'; rows: string[][] }

const BULLET_RE = /^\s*[-*•]\s+(.*)$/
const ORDERED_RE = /^\s*\d+[.)]\s+(.*)$/
const HEADING_RE = /^\s*#{1,4}\s+(.*)$/
const TABLE_ROW_RE = /^\s*\|?.+\|.+\|?\s*$/
const TABLE_RULE_RE = /^\s*\|?[\s:|-]+\|?\s*$/

export function parseChatMarkdown(text: string): Block[] {
  const blocks: Block[] = []
  const lines = text.replace(/\r\n?/g, '\n').split('\n')
  let paragraph: string[] = []
  const flush = (): void => {
    if (paragraph.length > 0) {
      blocks.push({ kind: 'paragraph', lines: paragraph })
      paragraph = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? ''
    if (line.trim() === '') {
      flush()
      continue
    }
    const heading = HEADING_RE.exec(line)
    if (heading) {
      flush()
      blocks.push({ kind: 'heading', text: heading[1] ?? '' })
      continue
    }
    if (TABLE_ROW_RE.test(line) && (line.match(/\|/g)?.length ?? 0) >= 2) {
      flush()
      const rows: string[][] = []
      while (i < lines.length && TABLE_ROW_RE.test(lines[i] ?? '')) {
        const row = lines[i] ?? ''
        if (!TABLE_RULE_RE.test(row) || !row.includes('-')) {
          rows.push(
            row
              .trim()
              .replace(/^\||\|$/g, '')
              .split('|')
              .map(cell => cell.trim())
          )
        }
        i++
      }
      i--
      blocks.push({ kind: 'table', rows })
      continue
    }
    const bullet = BULLET_RE.exec(line)
    const ordered = ORDERED_RE.exec(line)
    if (bullet || ordered) {
      flush()
      const isOrdered = !bullet
      const items: string[] = []
      while (i < lines.length) {
        const current = lines[i] ?? ''
        const m = (isOrdered ? ORDERED_RE : BULLET_RE).exec(current)
        if (!m) break
        items.push(m[1] ?? '')
        i++
      }
      i--
      blocks.push({ kind: 'list', ordered: isOrdered, items })
      continue
    }
    paragraph.push(line)
  }
  flush()
  return blocks
}

export function ChatMarkdown({ text }: { text: string }): React.ReactElement {
  const blocks = parseChatMarkdown(text)
  return (
    <div className="space-y-1.5 leading-relaxed">
      {blocks.map((block, i) => {
        const key = `b${i}`
        if (block.kind === 'heading') {
          return (
            <p key={key} className="font-semibold">
              {renderInline(block.text, key)}
            </p>
          )
        }
        if (block.kind === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul'
          return (
            <Tag
              key={key}
              className={`ml-4 space-y-0.5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}
            >
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
              ))}
            </Tag>
          )
        }
        if (block.kind === 'table') {
          const [head, ...body] = block.rows
          return (
            <div key={key} className="overflow-x-auto">
              <table className="min-w-full border-collapse text-xs">
                <thead>
                  <tr>
                    {(head ?? []).map((cell, j) => (
                      <th
                        key={`${key}-h${j}`}
                        className="border border-zinc-300/70 px-2 py-1 text-left font-semibold dark:border-zinc-600"
                      >
                        {renderInline(cell, `${key}-h${j}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((row, r) => (
                    <tr key={`${key}-r${r}`}>
                      {row.map((cell, c) => (
                        <td
                          key={`${key}-r${r}c${c}`}
                          className="border border-zinc-300/70 px-2 py-1 align-top dark:border-zinc-600"
                        >
                          {renderInline(cell, `${key}-r${r}c${c}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        return (
          <p key={key}>
            {block.lines.map((line, j) => (
              <React.Fragment key={`${key}-${j}`}>
                {j > 0 && <br />}
                {renderInline(line, `${key}-${j}`)}
              </React.Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}
