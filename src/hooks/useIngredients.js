import { useEffect, useMemo, useState } from 'react'
import { listIngredients } from '../services/ingredients.js'
import { getStockStatus } from '../utils/stock.js'

const PAGE_SIZE = 10

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export function useIngredients() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [requestId, setRequestId] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    let cancelled = false

    listIngredients()
      .then((data) => {
        if (cancelled) return
        setItems(data)
        setStatus('success')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [requestId])

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b)),
    [items],
  )

  const summary = useMemo(() => {
    let lowStock = 0
    let outOfStock = 0

    items.forEach((item) => {
      const { status } = getStockStatus(item.stock, item.minStock)
      if (status === 'low') lowStock += 1
      else if (status === 'out') outOfStock += 1
    })

    return { total: items.length, lowStock, outOfStock }
  }, [items])

  const filtered = useMemo(() => {
    const query = normalize(search.trim())

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        normalize(item.name).includes(query) ||
        normalize(item.category).includes(query)
      const matchesCategory = !category || item.category === category

      return matchesSearch && matchesCategory
    })
  }, [items, search, category])

  const totalItems = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const pageItems = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  )

  return {
    status,
    items: pageItems,
    totalItems,
    page: currentPage,
    totalPages,
    search,
    category,
    categories,
    summary,
    hasFilters: search.trim() !== '' || category !== '',
    setSearch: (value) => {
      setSearch(value)
      setPage(1)
    },
    setCategory: (value) => {
      setCategory(value)
      setPage(1)
    },
    setPage,
    setItemActive: (id, active) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, active } : item)),
      )
    },
    reload: () => {
      setStatus('loading')
      setRequestId((id) => id + 1)
    },
  }
}
