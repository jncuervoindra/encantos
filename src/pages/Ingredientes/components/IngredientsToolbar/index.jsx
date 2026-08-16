import Button from '../../../../components/Button/index.jsx'
import { Toolbar, SearchWrap, SearchIcon, Input, Select } from './styles.js'

/**
 * Barra de herramientas de ingredientes (búsqueda, filtro y alta).
 *
 * @param {object} props - Propiedades de la barra.
 * @param {string} props.search - Texto de búsqueda actual.
 * @param {Function} props.onSearchChange - Callback al cambiar la búsqueda.
 * @param {string} props.category - Categoría seleccionada.
 * @param {Function} props.onCategoryChange - Callback al cambiar la categoría.
 * @param {string[]} props.categories - Categorías disponibles.
 * @param {Function} props.onAdd - Callback al agregar un ingrediente.
 * @returns {JSX.Element} Barra de herramientas.
 */
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
