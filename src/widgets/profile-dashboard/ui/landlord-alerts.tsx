'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { DEMO_LANDLORD_ALERTS } from '../model/mock-data'

export function LandlordAlerts(): React.ReactElement {
  return (
    <div className="space-y-3 text-left">
      {DEMO_LANDLORD_ALERTS.map(alert => (
        <Card
          key={alert.id}
          className={`border rounded-2xl p-4 flex items-start gap-3 shadow-sm ${
            alert.type === 'danger'
              ? 'bg-danger-soft/10 border-danger/25 text-danger'
              : alert.type === 'warning'
                ? 'bg-warning-soft/10 border-warning/25 text-warning'
                : 'bg-primary-soft/10 border-primary/25 text-primary'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {alert.type === 'danger' && (
              <AlertTriangle className="h-4.5 w-4.5" />
            )}
            {alert.type === 'warning' && (
              <AlertCircle className="h-4.5 w-4.5" />
            )}
            {alert.type === 'info' && <Info className="h-4.5 w-4.5" />}
          </div>
          <div className="flex-1 space-y-0.5">
            <p className="text-xs font-bold font-display">
              {alert.propertyName ? `${alert.propertyName}: ` : ''}
              <span className="font-body font-semibold text-fg">
                {alert.message}
              </span>
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
