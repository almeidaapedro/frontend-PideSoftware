
import { BrowserRouter, Route, Routes } from '../node_modules/react-router-dom/dist/index'
import './App.css'
import Footer from './components/footer/footer'
import Navbar from './components/navbar/navbar'
import Home from './paginas/home/home'
import Login from './paginas/login/login'



function App() {
  return (
    <>
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
    </>
  )
}

export default App
