
import { BrowserRouter, Route, Routes } from '../node_modules/react-router-dom/dist/index'
import './App.css'
import Contato from './components/contato/contato'
import Footer from './components/footer/footer'
import Navbar from './components/navbar/navbar'
import { AuthProvider } from './contexts/authContext'
import Cadastro from './paginas/cadastro/cadastro'

import Home from './paginas/home/home'
import Login from './paginas/login/login'
import TelaProprietario from './paginas/proprietario/telaProprietario'





function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        <Navbar/>
          <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/proprietario" element={<TelaProprietario />} />
          </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
