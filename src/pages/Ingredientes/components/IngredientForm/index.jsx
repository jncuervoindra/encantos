import { useState } from 'react'
import Button from '../../../../components/Button/index.jsx'
import {
  Form,
  Fields,
  Row,
  Field,
  Label,
  Input,
  Select,
  ErrorText,
  FormError,
  Actions,
} from './styles.js'

const UNITS = ['kg', 'g', 'l', 'ml', 'unidad']

/**
 * Valida que un valor numérico sea obligatorio, numérico y no negativo.
 *
 * @param {string|number|null|undefined} value - Valor a validar.
 * @param {string} label - Nombre del campo (para el mensaje de error).
 * @returns {string|null} Mensaje de error o null si es válido.
 */
function validateNumber(value, label) {
  if (value === '' || value === null || value === undefined) {
    return `${label} es obligatorio.`
  }

  const number = Number(value)
  if (!Number.isFinite(number)) {
    return `${label} debe ser un número válido.`
  }
  if (number < 0) {
    return `${label} no puede ser negativo.`
  }

  return null
}

/**
 * Valida todos los campos del formulario.
 *
 * @param {object} values - Valores del formulario.
 * @returns {object} Errores por campo (vacío si es válido).
 */
function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'El nombre es obligatorio.'
  if (!values.category.trim()) errors.category = 'La categoría es obligatoria.'
  if (!values.unit) errors.unit = 'La unidad es obligatoria.'

  const stockError = validateNumber(values.stock, 'El stock')
  if (stockError) errors.stock = stockError

  const minStockError = validateNumber(values.minStock, 'El stock mínimo')
  if (minStockError) errors.minStock = minStockError

  const costError = validateNumber(values.cost, 'El costo')
  if (costError) errors.cost = costError

  return errors
}

/**
 * Formulario para crear o editar un ingrediente.
 *
 * @param {object} props - Propiedades del formulario.
 * @param {object|null} [props.initialValues] - Valores iniciales (edición).
 * @param {string[]} [props.categories=[]] - Categorías disponibles.
 * @param {boolean} [props.submitting=false] - Indica si hay un envío en curso.
 * @param {string|null} [props.submitError=null] - Error de envío a mostrar.
 * @param {string} [props.submitLabel='Guardar ingrediente'] - Texto del botón de envío.
 * @param {Function} props.onSubmit - Callback al enviar el formulario.
 * @param {Function} props.onCancel - Callback al cancelar.
 * @returns {JSX.Element} Formulario del ingrediente.
 */
function IngredientForm({
  initialValues,
  categories = [],
  submitting = false,
  submitError = null,
  submitLabel = 'Guardar ingrediente',
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(() => ({
    name: initialValues?.name ?? '',
    category: initialValues?.category ?? '',
    unit: initialValues?.unit ?? '',
    stock: initialValues?.stock ?? '',
    minStock: initialValues?.minStock ?? '',
    cost: initialValues?.cost ?? '',
  }))
  const [errors, setErrors] = useState({})

  /**
   * Actualiza un campo del formulario y limpia su error.
   *
   * @param {string} field - Nombre del campo.
   * @param {string} value - Nuevo valor.
   */
  const setValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  /**
   * Valida y envía el formulario.
   *
   * @param {React.FormEvent} event - Evento de envío del formulario.
   */
  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      name: values.name.trim(),
      category: values.category.trim(),
      unit: values.unit,
      stock: Number(values.stock),
      minStock: Number(values.minStock),
      cost: Number(values.cost),
    })
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {submitError && <FormError>{submitError}</FormError>}

      <Fields>
        <Field>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            type="text"
            placeholder="Ej. Harina de trigo"
            value={values.name}
            onChange={(event) => setValue('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="category">Categoría</Label>
          <Input
            id="category"
            type="text"
            list="ingredient-categories"
            placeholder="Ej. Harinas"
            value={values.category}
            onChange={(event) => setValue('category', event.target.value)}
            aria-invalid={Boolean(errors.category)}
          />
          <datalist id="ingredient-categories">
            {categories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
          {errors.category && <ErrorText>{errors.category}</ErrorText>}
        </Field>

        <Field>
          <Label htmlFor="unit">Unidad</Label>
          <Select
            as="select"
            id="unit"
            value={values.unit}
            onChange={(event) => setValue('unit', event.target.value)}
            aria-invalid={Boolean(errors.unit)}
          >
            <option value="" disabled>
              Selecciona una unidad
            </option>
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Select>
          {errors.unit && <ErrorText>{errors.unit}</ErrorText>}
        </Field>

        <Row>
          <Field>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              placeholder="0"
              value={values.stock}
              onChange={(event) => setValue('stock', event.target.value)}
              aria-invalid={Boolean(errors.stock)}
            />
            {errors.stock && <ErrorText>{errors.stock}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="minStock">Stock mínimo</Label>
            <Input
              id="minStock"
              type="number"
              min="0"
              placeholder="0"
              value={values.minStock}
              onChange={(event) => setValue('minStock', event.target.value)}
              aria-invalid={Boolean(errors.minStock)}
            />
            {errors.minStock && <ErrorText>{errors.minStock}</ErrorText>}
          </Field>
        </Row>

        <Field>
          <Label htmlFor="cost">Costo</Label>
          <Input
            id="cost"
            type="number"
            min="0"
            placeholder="0"
            value={values.cost}
            onChange={(event) => setValue('cost', event.target.value)}
            aria-invalid={Boolean(errors.cost)}
          />
          {errors.cost && <ErrorText>{errors.cost}</ErrorText>}
        </Field>
      </Fields>

      <Actions>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando…' : submitLabel}
        </Button>
      </Actions>
    </Form>
  )
}

export default IngredientForm
