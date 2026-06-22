'use client'

import * as React from 'react'
import { Card } from '@/shared/ui/card'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { DEMO_LANDLORD_ALERTS } from '../model/mock-data'
import { Appointment } from '../model/types'

interface LandlordAlertsProps {
  appointments?: Appointment[]
}

export function LandlordAlerts({
  appointments = [],
}: LandlordAlertsProps): React.ReactElement {
  // Count actual pending appointments
  const pendingCount = appointments.filter(a => a.status === 'pending').length

  // Construct dynamic alerts list based on DEMO_LANDLORD_ALERTS
  const activeAlerts = React.useMemo(() => {
    return DEMO_LANDLORD_ALERTS.map(alert => {
      if (alert.id === 'alert-3') {
        // Adjust third alert dynamically
        if (pendingCount === 0) return null
        return {
          ...alert,
          message: `${pendingCount} lịch hẹn xem nhà mới chờ xác nhận`,
        }
      }
      return alert
    }).filter(Boolean) as typeof DEMO_LANDLORD_ALERTS
  }, [pendingCount])

  if (activeAlerts.length === 0) return <></>

  return (
    <div className="space-y-3 text-left">
      {activeAlerts.map(alert => (
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
