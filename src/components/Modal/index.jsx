import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { breakpoints } from '../../styles/breakpoints.js'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);

  @media (min-width: ${breakpoints.tabletMin}) {
    align-items: center;
    padding: 24px;
  }
`

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 520px;
  max-height: 92vh;
  background: var(--color-surface);
  border-radius: 16px 16px 0 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);

  @media (min-width: ${breakpoints.tabletMin}) {
    border-radius: 12px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
`

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
`

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;

  &:hover {
    background: var(--color-accent-hover);
    color: var(--color-text);
  }
`

const Body = styled.div`
  padding: 20px;
  overflow-y: auto;
`

function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <Overlay onClick={onClose}>
      <Panel
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Title>{title}</Title>
          <CloseButton type="button" onClick={onClose} aria-label="Cerrar">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
        </Header>
        <Body>{children}</Body>
      </Panel>
    </Overlay>,
    document.body,
  )
}

export default Modal
