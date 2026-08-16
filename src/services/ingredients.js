import apiRequest from './api.js'

export function listIngredients() {
  return apiRequest('ingredients/list', 'GET')
}

export function createIngredient(data) {
  return apiRequest('ingredients/create', 'POST', data)
}

export function updateIngredient(data) {
  return apiRequest('ingredients/update', 'POST', data)
}

export function updateIngredientActive(id, active) {
  return apiRequest('ingredients/updateActive', 'POST', { id, active })
}
