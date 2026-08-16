import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../styles/breakpoints.js'
import { useIngredients } from '../../hooks/useIngredients.js'
import { createIngredient, updateIngredient, updateIngredientActive } from '../../services/ingredients.js'
import IngredientsToolbar from './components/IngredientsToolbar/index.jsx'
import IngredientsCards from './components/IngredientsCards/index.jsx'
import IngredientsList from './components/IngredientsList/index.jsx'
import InventorySummary from './components/InventorySummary/index.jsx'
import ViewToggle from './components/ViewToggle/index.jsx'
import IngredientForm from './components/IngredientForm/index.jsx'
import Modal from '../../components/Modal/index.jsx'
import Pagination from '../../components/Pagination/index.jsx'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1160px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.01em;

  @media (max-width: ${breakpoints.mobileMax}) {
    font-size: 20px;
  }
`

const Count = styled.p`
  font-size: 13px;
  color: var(--color-text-muted);
`

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`

const StateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 56px 16px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 14px;
`

const Spinner = styled.span`
  width: 22px;
  height: 22px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const RetryButton = styled.button`
  padding: 8px 18px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: var(--color-accent-hover);
  }
`

const Toast = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--color-text);
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
`

function Ingredientes() {
  const {
    status,
    items,
    totalItems,
    page,
    totalPages,
    search,
    category,
    categories,
    summary,
    hasFilters,
    setSearch,
    setCategory,
    setPage,
    setItemActive,
    reload,
  } = useIngredients()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [view, setView] = useState('cards')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [confirmation, setConfirmation] = useState(null)
  const [togglingId, setTogglingId] = useState(null)

  useEffect(() => {
    if (!confirmation) return undefined

    const timer = setTimeout(() => setConfirmation(null), 3000)
    return () => clearTimeout(timer)
  }, [confirmation])

  const openCreateModal = () => {
    setEditing(null)
    setSubmitError(null)
    setModalOpen(true)
  }

  const openEditModal = (ingredient) => {
    setEditing(ingredient)
    setSubmitError(null)
    setModalOpen(true)
  }

  const closeModal = () => {
    if (submitting) return
    setModalOpen(false)
    setEditing(null)
    setSubmitError(null)
  }

  const handleSubmit = async (payload) => {
    setSubmitting(true)
    setSubmitError(null)

    try {
      if (editing) {
        await updateIngredient({ ...payload, id: editing.id })
        setConfirmation('Ingrediente actualizado')
      } else {
        await createIngredient(payload)
        setConfirmation('Ingrediente agregado')
      }

      setModalOpen(false)
      setEditing(null)
      reload()
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleActive = async (ingredient, active) => {
    setItemActive(ingredient.id, active)
    setTogglingId(ingredient.id)

    try {
      await updateIngredientActive(ingredient.id, active)
    } catch {
      reload()
    } finally {
      setTogglingId(null)
    }
  }

  let content

  if (status === 'loading') {
    content = (
      <StateWrap>
        <Spinner role="status" aria-label="Cargando" />
        <span>Cargando ingredientes…</span>
      </StateWrap>
    )
  } else if (status === 'error') {
    content = (
      <StateWrap>
        <span>No se pudieron cargar los ingredientes.</span>
        <RetryButton type="button" onClick={reload}>
          Reintentar
        </RetryButton>
      </StateWrap>
    )
  } else if (totalItems === 0) {
    content = (
      <StateWrap>
        <span>
          {hasFilters
            ? 'No se encontraron ingredientes con los criterios indicados.'
            : 'No hay ingredientes registrados.'}
        </span>
      </StateWrap>
    )
  } else {
    content = (
      <>
        <ContentHeader>
          <Count>
            {totalItems} {totalItems === 1 ? 'ingrediente' : 'ingredientes'}
          </Count>
          <ViewToggle view={view} onChange={setView} />
        </ContentHeader>
        {view === 'cards' ? (
          <IngredientsCards
            items={items}
            onEdit={openEditModal}
            onToggleActive={handleToggleActive}
            togglingId={togglingId}
          />
        ) : (
          <IngredientsList
            items={items}
            onEdit={openEditModal}
            onToggleActive={handleToggleActive}
            togglingId={togglingId}
          />
        )}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </>
    )
  }

  return (
    <>
      <Page>
        <Title>Ingredientes</Title>
        {status === 'success' && (
          <>
            <IngredientsToolbar
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
              onAdd={openCreateModal}
            />
            <InventorySummary
              total={summary.total}
              lowStock={summary.lowStock}
              outOfStock={summary.outOfStock}
            />
          </>
        )}
        {content}
      </Page>

      <Modal
        open={modalOpen}
        title={editing ? 'Editar ingrediente' : 'Agregar ingrediente'}
        onClose={closeModal}
      >
        <IngredientForm
          initialValues={editing}
          categories={categories}
          submitting={submitting}
          submitError={submitError}
          submitLabel={editing ? 'Guardar cambios' : 'Guardar ingrediente'}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      {confirmation && (
        <Toast role="status">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {confirmation}
        </Toast>
      )}
    </>
  )
}

export default Ingredientes
