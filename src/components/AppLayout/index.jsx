import { useState } from 'react'
import { Outlet } from 'react-router'
import styled from 'styled-components'
import Sidebar from '../Sidebar/index.jsx'
import { breakpoints } from '../../styles/breakpoints.js'

const Layout = styled.div`
  display: flex;
  min-height: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 100vh;
`

const Header = styled.header`
  display: none;

  @media (max-width: ${breakpoints.mobileMax}) {
    display: flex;
    align-items: center;
    gap: 10px;
    height: var(--header-height);
    flex-shrink: 0;
    padding: 0 16px;
    background: var(--color-sidebar);
    border-bottom: 1px solid var(--color-border);
  }
`

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;

  &:hover {
    background: var(--color-accent-hover);
  }
`

const HeaderBrand = styled.span`
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-text);
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  background: rgba(0, 0, 0, 0.32);

  @media (min-width: ${breakpoints.tabletMin}) {
    display: none;
  }
`

const Main = styled.main`
  flex: 1;
  min-width: 0;
  min-height: 0;
  padding: 40px 48px;
  overflow-y: auto;

  @media (max-width: ${breakpoints.mobileMax}) {
    padding: 24px 20px;
  }

  @media (min-width: ${breakpoints.tabletMin}) and (max-width: ${breakpoints.tabletMax}) {
    padding: 32px 32px;
  }
`

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const openMenu = () => setMenuOpen(true)

  return (
    <Layout>
      <Sidebar open={menuOpen} onClose={closeMenu} />
      <Column>
        <Header>
          <MenuButton type="button" onClick={openMenu} aria-label="Abrir menú">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </MenuButton>
          <HeaderBrand>Encantos</HeaderBrand>
        </Header>
        <Main>
          <Outlet />
        </Main>
      </Column>
      {menuOpen && <Overlay onClick={closeMenu} />}
    </Layout>
  )
}

export default AppLayout
