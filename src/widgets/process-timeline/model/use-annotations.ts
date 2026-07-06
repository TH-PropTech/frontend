'use client'

import * as React from 'react'
import type { AnnotationAnchor } from './ai-guide-data'

interface ProcessedSegment {
  text: string
  isKeyword: boolean
  explanation?: string
  relatedStepIndex?: number | undefined
  isGlossary?: boolean | undefined
}

/**
 * Hook to parse text and inject interactive glossary and annotation anchors.
 * Avoids direct DOM mutation for safe, hydration-friendly React rendering.
 */
export function useAnnotations(
  text: string,
  glossary?: Record<string, string>,
  annotations?: AnnotationAnchor[]
) {
  return React.useMemo(() => {
    if (!text) return []

    // Collect all unique keywords
    const keywordsMap = new Map<
      string,
      {
        explanation: string
        relatedStepIndex?: number | undefined
        isGlossary: boolean
      }
    >()

    if (glossary) {
      Object.entries(glossary).forEach(([term, desc]) => {
        keywordsMap.set(term.toLowerCase(), {
          explanation: desc,
          isGlossary: true,
        })
      })
    }

    if (annotations) {
      annotations.forEach(anno => {
        keywordsMap.set(anno.keyword.toLowerCase(), {
          explanation: anno.explanation,
          relatedStepIndex: anno.relatedStepIndex,
          isGlossary: false,
        })
      })
    }

    const keywords = Array.from(keywordsMap.keys()).sort(
      (a, b) => b.length - a.length
    )
    if (keywords.length === 0) {
      return [{ text, isKeyword: false }] as ProcessedSegment[]
    }

    // Escape regex characters
    const escapedKeywords = keywords.map(k =>
      k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    )
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi')

    const parts = text.split(regex)
    const segments: ProcessedSegment[] = []

    parts.forEach(part => {
      const lowerPart = part.toLowerCase()
      const match = keywordsMap.get(lowerPart)
      if (match) {
        segments.push({
          text: part,
          isKeyword: true,
          explanation: match.explanation,
          relatedStepIndex: match.relatedStepIndex,
          isGlossary: match.isGlossary,
        })
      } else {
        if (part) {
          segments.push({ text: part, isKeyword: false })
        }
      }
    })

    return segments
  }, [text, glossary, annotations])
}
