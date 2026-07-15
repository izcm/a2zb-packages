export const parts = (ts: number) => {
  const d = new Date(ts)

  return {
    month: d.toLocaleString('en-US', { month: 'short' }),
    day: String(d.getDate()).padStart(2, '0'),
    yy: String(d.getUTCFullYear()).slice(-2),
    mm: String(d.getUTCMonth() + 1).padStart(2, '0'),
    dd: String(d.getUTCDate()).padStart(2, '0'),
    hh: String(d.getUTCHours()).padStart(2, '0'),
    min: String(d.getUTCMinutes()).padStart(2, '0'),
    time: d.toTimeString().slice(0, 5),
  }
}
