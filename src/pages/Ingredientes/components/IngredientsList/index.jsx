import styled from 'styled-components'
import { breakpoints } from '../../../../styles/breakpoints.js'
import { formatCurrency } from '../../../../utils/format.js'
import Button from '../../../../components/Button/index.jsx'
import Switch from '../../../../components/Switch/index.jsx'
import StockBadge from '../StockBadge/index.jsx'

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Row = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  padding: 12px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  transition: border-color 120ms ease, box-shadow 120ms ease;

  &:hover {
    border-color: var(--color-accent-hover);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  }

  @media (min-width: ${breakpoints.tabletMin}) {
    flex-wrap: nowrap;
  }
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
`

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
`

const Meta = styled.span`
  font-size: 12px;
  color: var(--color-text-muted);
`

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const StockText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  min-width: 52px;
  text-align: right;
  white-space: nowrap;
`

const CostText = styled.span`
  font-size: 13px;
  color: var(--color-text-muted);
  min-width: 68px;
  text-align: right;
  white-space: nowrap;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;

  @media (min-width: ${breakpoints.tabletMin}) {
    width: auto;
    justify-content: flex-end;
    margin-left: auto;
  }
`

function IngredientsList({ items, onEdit, onToggleActive, togglingId }) {
  return (
    <List>
      {items.map((item) => (
        <Row key={item.id ?? item.name}>
          <Main>
            <Name>{item.name}</Name>
            <Meta>
              {item.category} · {item.unit}
            </Meta>
          </Main>
          <Info>
            <StockBadge stock={item.stock} minStock={item.minStock} />
            <StockText>
              {item.stock} {item.unit}
            </StockText>
            <CostText>{formatCurrency(item.cost)}</CostText>
          </Info>
          <Actions>
            <Button variant="ghost" onClick={() => onEdit(item)}>
              Editar
            </Button>
            <Switch
              checked={item.active}
              disabled={togglingId === item.id}
              onChange={(active) => onToggleActive(item, active)}
            />
          </Actions>
        </Row>
      ))}
    </List>
  )
}

export default IngredientsList
