import styled from 'styled-components'
import { breakpoints } from '../../../../styles/breakpoints.js'
import Button from '../../../../components/Button/index.jsx'

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: ${breakpoints.tabletMin}) {
    flex-direction: row;
    align-items: center;
  }
`

const SearchWrap = styled.div`
  position: relative;
  flex: 1;
`

const SearchIcon = styled.svg`
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 14px 10px 38px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  font: inherit;
  font-size: 14px;
  color: var(--color-text);
  outline: none;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    border-color: var(--color-accent);
  }
`

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  font: inherit;
  font-size: 14px;
  color: var(--color-text);
  outline: none;
  cursor: pointer;
  min-width: 0;

  @media (min-width: ${breakpoints.tabletMin}) {
    min-width: 200px;
  }

  &:focus {
    border-color: var(--color-accent);
  }
`

function IngredientsToolbar({ search, onSearchChange, category, onCategoryChange, categories, onAdd }) {
  return (
    <Toolbar>
      <SearchWrap>
        <SearchIcon
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </SearchIcon>
        <Input
          type="search"
          placeholder="Buscar ingredientes..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Buscar ingredientes"
        />
      </SearchWrap>
      <Select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filtrar por categoría"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
      <Button type="button" onClick={onAdd}>
        + Agregar ingrediente
      </Button>
    </Toolbar>
  )
}

export default IngredientsToolbar
