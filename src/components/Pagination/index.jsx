import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
`

const Button = styled.button`
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-muted);
  font: inherit;
  font-size: 13px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--color-accent-hover);
    color: var(--color-text);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &.current {
    background: var(--color-accent-soft);
    color: var(--color-accent);
    font-weight: 600;
  }
`

const Ellipsis = styled.span`
  min-width: 32px;
  text-align: center;
  color: var(--color-text-muted);
`

function getPages(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const pages = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) pages.push('...')
  for (let index = start; index <= end; index += 1) pages.push(index)
  if (end < total - 1) pages.push('...')
  pages.push(total)

  return pages
}

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = getPages(page, totalPages)

  return (
    <Nav aria-label="Paginación">
      <Button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Anterior
      </Button>
      {pages.map((item, index) =>
        item === '...' ? (
          <Ellipsis key={`ellipsis-${index}`}>…</Ellipsis>
        ) : (
          <Button
            key={item}
            type="button"
            className={item === page ? 'current' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ),
      )}
      <Button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Siguiente
      </Button>
    </Nav>
  )
}

export default Pagination
