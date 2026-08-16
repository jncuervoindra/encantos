import styled from 'styled-components'
import { formatCurrency } from '../../../../utils/format.js'
import Button from '../../../../components/Button/index.jsx'
import Switch from '../../../../components/Switch/index.jsx'
import StockBadge from '../StockBadge/index.jsx'
import StockBar from '../StockBar/index.jsx'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color 120ms ease, box-shadow 120ms ease;

  &:hover {
    border-color: var(--color-accent-hover);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`

const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

const CardName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
`

const CardMeta = styled.span`
  font-size: 13px;
  color: var(--color-text-muted);
`

const StockSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StockLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
`

const StockRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
`

const StockAmount = styled.span`
  font-size: 22px;
  font-weight: 600;
  line-height: 1;
`

const StockUnit = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
`

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const DetailLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
`

const DetailValue = styled.span`
  font-size: 14px;
  color: var(--color-text);
`

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border);
`

function IngredientsCards({ items, onEdit, onToggleActive, togglingId }) {
  return (
    <Grid>
      {items.map((item) => (
        <Card key={item.id ?? item.name}>
          <CardHeader>
            <CardTitle>
              <CardName>{item.name}</CardName>
              <CardMeta>
                {item.category} · {item.unit}
              </CardMeta>
            </CardTitle>
            <StockBadge stock={item.stock} minStock={item.minStock} />
          </CardHeader>

          <StockSection>
            <StockLabel>Stock</StockLabel>
            <StockRow>
              <StockAmount>{item.stock}</StockAmount>
              <StockUnit>{item.unit}</StockUnit>
            </StockRow>
            <StockBar stock={item.stock} minStock={item.minStock} />
          </StockSection>

          <Details>
            <Detail>
              <DetailLabel>Mínimo</DetailLabel>
              <DetailValue>
                {item.minStock} {item.unit}
              </DetailValue>
            </Detail>
            <Detail>
              <DetailLabel>Costo</DetailLabel>
              <DetailValue>{formatCurrency(item.cost)}</DetailValue>
            </Detail>
          </Details>

          <CardFooter>
            <Button variant="ghost" onClick={() => onEdit(item)}>
              Editar
            </Button>
            <Switch
              checked={item.active}
              disabled={togglingId === item.id}
              onChange={(active) => onToggleActive(item, active)}
            />
          </CardFooter>
        </Card>
      ))}
    </Grid>
  )
}

export default IngredientsCards
