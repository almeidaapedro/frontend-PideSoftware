
import { BrowserRouter, Route, Routes } from '../node_modules/react-router-dom/dist/index'
import './App.css'
import Footer from './components/footer/footer'
import Navbar from './components/navbar/navbar'
import Cadastro from './paginas/cadastro/cadastro'
import Home from './paginas/home/home'
import Login from './paginas/login/login'



function App() {
  return (
    <>
    <div className='fundo-tela'>
      <BrowserRouter> 
      <Navbar/>
        <div className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
