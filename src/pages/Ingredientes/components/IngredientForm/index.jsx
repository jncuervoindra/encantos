import { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../../components/Button/index.jsx'

const UNITS = ['kg', 'g', 'l', 'ml', 'unidad']

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
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

  &[aria-invalid='true'] {
    border-color: var(--color-danger);
  }
`

const Select = styled(Input)`
  cursor: pointer;
`

const ErrorText = styled.span`
  font-size: 12px;
  color: var(--color-danger);
`

const FormError = styled.div`
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 13px;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 4px;
`

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

  const setValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

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
