import { create } from 'zustand'
import { listIngredients } from '../services/ingredients.js'

export const useIngredientsStore = create((set) => ({
  items: [],
  status: 'loading',
  search: '',
  category: '',
  page: 1,

  /**
   * Carga los ingredientes desde la API y actualiza el estado de la solicitud.
   *
   * @returns {Promise<void>}
   */
  load: async () => {
    set({ status: 'loading' })
    try {
      const items = await listIngredients()
      set({ items, status: 'success' })
    } catch {
      set({ status: 'error' })
    }
  },

  /**
   * Actualiza el texto de búsqueda y vuelve a la primera página.
   *
   * @param {string} search - Texto de búsqueda.
   */
  setSearch: (search) => set({ search, page: 1 }),

  /**
   * Actualiza la categoría seleccionada y vuelve a la primera página.
   *
   * @param {string} category - Categoría seleccionada.
   */
  setCategory: (category) => set({ category, page: 1 }),

  /**
   * Cambia la página actual de la lista.
   *
   * @param {number} page - Número de página.
   */
  setPage: (page) => set({ page }),

  /**
   * Actualiza localmente el estado activo de un ingrediente.
   *
   * @param {string|number} id - Identificador del ingrediente.
   * @param {boolean} active - Nuevo estado activo.
   */
  setItemActive: (id, active) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, active } : item)),
    })),
}))
