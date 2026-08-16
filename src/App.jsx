import { Routes, Route } from 'react-router'
import AppLayout from './components/AppLayout/index.jsx'
import Inicio from './pages/Inicio/index.jsx'
import Ingredientes from './pages/Ingredientes/index.jsx'

/**
 * Componente raíz de la aplicación.
 *
 * @returns {JSX.Element} Las rutas principales del portal.
 */
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Inicio />} />
        <Route path="ingredientes" element={<Ingredientes />} />
      </Route>
    </Routes>
  )
}

export default App
