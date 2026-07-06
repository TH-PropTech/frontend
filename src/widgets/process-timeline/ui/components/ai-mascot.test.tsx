import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AiMascot } from './ai-mascot'

describe('AiMascot Component', () => {
  it('renders standard mascot correctly', () => {
    const { container } = render(
      <AiMascot
        isHappy={false}
        armState="idle"
        emotion="neutral"
        mouthShape="line"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders all arm states correctly', () => {
    const states: ('idle' | 'greeting' | 'pointing' | 'thinking' | 'celebrating')[] = [
      'idle',
      'greeting',
      'pointing',
      'thinking',
      'celebrating',
    ]

    states.forEach((armState) => {
      const { container } = render(
        <AiMascot
          isHappy={false}
          armState={armState}
          emotion="neutral"
          mouthShape="line"
        />
      )
      expect(container.firstChild).not.toBeNull()
    })
  })

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(
      <AiMascot
        isHappy={false}
        armState="idle"
        emotion="neutral"
        mouthShape="line"
        onClick={handleClick}
      />
    )

    const botButton = screen.getByRole('button')
    fireEvent.click(botButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
