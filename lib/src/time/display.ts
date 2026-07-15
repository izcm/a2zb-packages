import { months } from './constants'
import { parts } from './parts'

export const tsShort = (ts: number) => {
  const p = parts(ts)
  return `${p.month} ${p.day} ${p.time}`
}

export const tsSuperShort = (ts: number) => {
  const p = parts(ts)
  return `${p.month} ${p.day}`
}

export const tsLong = (ts: number) => {
  const p = parts(ts)
  return `${p.yy}.${p.mm}.${p.dd} ${p.hh}:${p.min}`
}

export const tsMonthNameUTC = (ts: number) => months[new Date(ts).getUTCMonth()]

export const hhmm = (ts: number) => {
  return new Date(ts).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
