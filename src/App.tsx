import { Route, Routes } from 'react-router-dom'
import './App.css'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import NotFoundPage from './pages/NotFoundPage'
import PokedexPage from './pages/PokedexPage'
import PokemonDetailPage from './pages/PokemonDetailPage'
import WelcomePage from './pages/WelcomePage'

const App = () => (
  <div className="app-shell">
    <SiteHeader />

    <main className="app-main">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/pokedex" element={<PokedexPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>

    <SiteFooter />
  </div>
)

export default App
