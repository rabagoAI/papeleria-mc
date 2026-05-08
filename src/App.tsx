import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Papeleria from './pages/Papeleria'
import Reservas from './pages/Reservas'
import Loteria from './pages/Loteria'
import Contacto from './pages/Contacto'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/papeleria" element={<Papeleria />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/loteria" element={<Loteria />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
