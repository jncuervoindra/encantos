import apiRequest from './api.js'

/**
 * Obtiene la lista de ingredientes.
 *
 * @returns {Promise<unknown>} Lista de ingredientes.
 */
export function listIngredients() {
  return apiRequest('ingredients/list', 'GET')
}

/**
 * Crea un nuevo ingrediente.
 *
 * @param {object} data - Datos del ingrediente a crear.
 * @returns {Promise<unknown>} Ingrediente creado.
 */
export function createIngredient(data) {
  return apiRequest('ingredients/create', 'POST', data)
}

/**
 * Actualiza un ingrediente existente.
 *
 * @param {object} data - Datos del ingrediente, incluido su id.
 * @returns {Promise<unknown>} Ingrediente actualizado.
 */
export function updateIngredient(data) {
  return apiRequest('ingredients/update', 'POST', data)
}

/**
 * Activa o desactiva un ingrediente.
 *
 * @param {string|number} id - Identificador del ingrediente.
 * @param {boolean} active - Estado activo deseado.
 * @returns {Promise<unknown>} Resultado de la operación.
 */
export function updateIngredientActive(id, active) {
  return apiRequest('ingredients/updateActive', 'POST', { id, active })
}
