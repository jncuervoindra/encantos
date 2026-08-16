import styled from 'styled-components'

const toneStyles = {
  total: { color: 'var(--color-accent)', background: 'var(--color-accent-soft)' },
  low: { color: 'var(--color-warning)', background: 'var(--color-warning-soft)' },
  out: { color: 'var(--color-danger)', background: 'var(--color-danger-soft)' },
}

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
`

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 9px;
  flex-shrink: 0;
  color: ${({ $tone }) => toneStyles[$tone].color};
  background: ${({ $tone }) => toneStyles[$tone].background};
`

const StatText = styled.div`
  display: flex;
  flex-direction: column;
`

const StatValue = styled.span`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.1;
`

const StatLabel = styled.span`
  font-size: 12px;
  color: var(--color-text-muted);
`

const iconProps = {
  width: 17,
  height: 17,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

function InventorySummary({ total, lowStock, outOfStock }) {
  return (
    <Summary>
      <Stat>
        <Icon $tone="total">
          <svg {...iconProps}>
            <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
            <path d="M3.3 8.3L12 13l8.7-4.7" />
            <line x1="12" y1="22" x2="12" y2="13" />
          </svg>
        </Icon>
        <StatText>
          <StatValue>{total}</StatValue>
          <StatLabel>Ingredientes</StatLabel>
        </StatText>
      </Stat>

      <Stat>
        <Icon $tone="low">
          <svg {...iconProps}>
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
          </svg>
        </Icon>
        <StatText>
          <StatValue>{lowStock}</StatValue>
          <StatLabel>Stock bajo</StatLabel>
        </StatText>
      </Stat>

      <Stat>
        <Icon $tone="out">
          <svg {...iconProps}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </Icon>
        <StatText>
          <StatValue>{outOfStock}</StatValue>
          <StatLabel>Agotados</StatLabel>
        </StatText>
      </Stat>
    </Summary>
  )
}

export default InventorySummary
