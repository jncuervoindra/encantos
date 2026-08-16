import { API_BASE_URL } from '../config.js'

/**
 * Realiza una petición a la API de Google Apps Script.
 *
 * @param {string} route - Ruta del endpoint que se va a invocar.
 * @param {string} [method='GET'] - Método HTTP de la petición.
 * @param {unknown} [data] - Cuerpo de la petición (se serializa a JSON).
 * @returns {Promise<unknown>} Los datos devueltos por la API.
 * @throws {Error} Si la API no está configurada, falla la red, la respuesta no es JSON o la API reporta un error.
 */
async function apiRequest(route, method = 'GET', data) {
  if (!API_BASE_URL) {
    throw new Error('API no configurada: define SCRIPT_ID en src/config.js')
  }

  const url = new URL(API_BASE_URL)
  url.searchParams.set('route', route)

  const options = { method, redirect: 'follow' }

  if (data !== undefined) {
    options.headers = { 'Content-Type': 'text/plain;charset=utf-8' }
    options.body = JSON.stringify(data)
  }

  let response
  try {
    response = await fetch(url.toString(), options)
  } catch (error) {
    throw new Error(`Error de red (${route}): ${error.message}`, { cause: error })
  }

  let payload
  try {
    payload = await response.json()
  } catch (error) {
    throw new Error(`Respuesta no-JSON (${route}): ${error.message}`, { cause: error })
  }

  if (payload.ok === false) {
    throw new Error(payload.error || `Error en ${route}`)
  }

  return payload.data
}

export default apiRequest
