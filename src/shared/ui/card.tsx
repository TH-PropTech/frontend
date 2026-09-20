import * as React from 'react'

import { cn } from '@/shared/lib/utils'

export type CardDensity = 'comfortable' | 'compact'

const CardContext = React.createContext<CardDensity>('compact')

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: CardDensity
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, density = 'compact', children, ...props }, ref) => (
    <CardContext.Provider value={density}>
      <div
        ref={ref}
        className={cn(
          'rounded-xl border bg-card text-card-foreground shadow-sm transition-all',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const density = React.useContext(CardContext)
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col',
        density === 'comfortable' ? 'space-y-1.5 p-6' : 'space-y-1 p-4',
        className
      )}
      {...props}
    />
  )
})
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const density = React.useContext(CardContext)
  return (
    <div
      ref={ref}
      className={cn(
        'font-semibold tracking-tight',
        density === 'comfortable'
          ? 'text-2xl leading-none'
          : 'text-lg leading-snug',
        className
      )}
      {...props}
    />
  )
})
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const density = React.useContext(CardContext)
  return (
    <div
      ref={ref}
      className={cn(
        density === 'comfortable' ? 'p-6 pt-0' : 'p-4 pt-0',
        className
      )}
      {...props}
    />
  )
})
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const density = React.useContext(CardContext)
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center',
        density === 'comfortable' ? 'p-6 pt-0' : 'p-4 pt-0',
        className
      )}
      {...props}
    />
  )
})
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
