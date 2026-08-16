import styled from 'styled-components'

const Group = styled.div`
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  background: var(--color-neutral-soft);
  border: 1px solid var(--color-border);
  border-radius: 10px;
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 7px;
  background: ${({ $active }) => ($active ? 'var(--color-surface)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--color-text)' : 'var(--color-text-muted)')};
  box-shadow: ${({ $active }) => ($active ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none')};
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;

  &:hover {
    color: var(--color-text);
  }
`

const iconProps = {
  width: 15,
  height: 15,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

function ViewToggle({ view, onChange }) {
  return (
    <Group role="group" aria-label="Cambiar vista">
      <Button
        type="button"
        $active={view === 'cards'}
        aria-pressed={view === 'cards'}
        onClick={() => onChange('cards')}
      >
        <svg {...iconProps}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        Tarjetas
      </Button>
      <Button
        type="button"
        $active={view === 'list'}
        aria-pressed={view === 'list'}
        onClick={() => onChange('list')}
      >
        <svg {...iconProps}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        Lista
      </Button>
    </Group>
  )
}

export default ViewToggle
