import * as React from 'react'

/** Khối trình bày dùng chung cho các bài Cẩm nang (giữ một kiểu chữ / khoảng cách duy nhất). */
export function Prose({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="space-y-4 text-xs md:text-sm text-muted leading-relaxed">
      {children}
    </div>
  )
}

export function Lead({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <p className="font-bold text-fg text-sm">{children}</p>
}

export function H3({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <h3 className="font-bold text-fg text-sm mt-6">{children}</h3>
}

export function Steps({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <ol className="list-decimal pl-5 space-y-3">{children}</ol>
}

export function Bullets({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <ul className="list-disc pl-5 space-y-2">{children}</ul>
}

export function Note({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="pl-4 border-l-2 border-primary mt-6">
      <span className="font-bold text-primary text-xs block mb-1">{title}</span>
      {children}
    </div>
  )
}
