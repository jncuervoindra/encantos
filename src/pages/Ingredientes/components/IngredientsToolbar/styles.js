import styled from 'styled-components'
import { breakpoints } from '../../../../styles/breakpoints.js'

export const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: ${breakpoints.tabletMin}) {
    flex-direction: row;
    align-items: center;
  }
`

export const SearchWrap = styled.div`
  position: relative;
  flex: 1;
`

export const SearchIcon = styled.svg`
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
`

export const Input = styled.input`
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

export const Select = styled.select`
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
