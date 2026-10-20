'use client'

import * as React from 'react'

interface SpeechSubtitleProps {
  words: string[]
  subscribeWord: (listener: (index: number) => void) => () => void
}

/**
 * Lời hướng dẫn đang được đọc, tô từ hiện tại. Tiến độ nằm trong state riêng của component này
 * nên mỗi từ chỉ vẽ lại các <span> ở đây, không kéo cả khối hướng dẫn vẽ lại.
 */
export const SpeechSubtitle = React.memo(function SpeechSubtitle({
  words,
  subscribeWord,
}: SpeechSubtitleProps): React.ReactElement {
  const [active, setActive] = React.useState(-1)
  React.useEffect(() => subscribeWord(setActive), [subscribeWord])

  return (
    <span aria-live="off">
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span
            className={
              i === active
                ? 'rounded bg-primary px-0.5 font-bold text-white'
                : undefined
            }
          >
            {w}
          </span>{' '}
        </React.Fragment>
      ))}
    </span>
  )
})
