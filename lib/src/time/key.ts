import type { TimeUnit } from './constants.js'

// never used for UI display only for charts => always UTC
export const timeKey = (ts: number, unit: TimeUnit) => {
  const d = new Date(ts)

  switch (unit) {
    case 'hour':
      return d.toISOString().slice(0, 13) // 2026-01-16T05
    case 'day':
      return d.toISOString().slice(0, 10) // 2026-01-16
    case 'month':
      return `${d.getUTCFullYear()}-${d.getUTCMonth()}`
  }
}
