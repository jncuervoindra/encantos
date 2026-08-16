import styled from 'styled-components'
import { getStockStatus } from '../../../../utils/stock.js'

const statusColors = {
  normal: 'var(--color-success)',
  low: 'var(--color-warning)',
  out: 'var(--color-danger)',
}

const Track = styled.div`
  height: 6px;
  border-radius: 999px;
  background: var(--color-neutral-soft);
  overflow: hidden;
`

const Fill = styled.div`
  height: 100%;
  width: ${({ $ratio }) => `${Math.round($ratio * 100)}%`};
  border-radius: 999px;
  background: ${({ $status }) => statusColors[$status]};
  transition: width 200ms ease, background-color 200ms ease;
`

function StockBar({ stock, minStock }) {
  const { status, ratio } = getStockStatus(stock, minStock)

  return (
    <Track
      role="progressbar"
      aria-label="Nivel de stock"
      aria-valuenow={Math.round(ratio * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <Fill $status={status} $ratio={ratio} />
    </Track>
  )
}

export default StockBar
