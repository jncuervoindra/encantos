export const STOCK_STATUS_LABELS = {
  normal: 'Normal',
  low: 'Bajo',
  out: 'Agotado',
}

export function getStockStatus(stock, minStock) {
  const value = Number(stock)
  const minimum = Number(minStock)
  const safeValue = Number.isFinite(value) ? value : 0
  const safeMinimum = Number.isFinite(minimum) ? minimum : 0

  let status = 'normal'
  if (safeValue <= 0) {
    status = 'out'
  } else if (safeValue <= safeMinimum) {
    status = 'low'
  }

  let ratio = 1
  if (safeValue <= 0) {
    ratio = 0
  } else if (safeMinimum > 0) {
    ratio = Math.min(1, safeValue / safeMinimum)
  }

  return { status, ratio }
}
