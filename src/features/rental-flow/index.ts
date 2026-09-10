/**
 * Public composition boundary for the v4 rental flow.
 * Domain slices stay isolated while consumers import one stable feature barrel.
 */
export * from '@/features/rental-application'
export * from '@/features/contracts'
export * from '@/features/payments'
