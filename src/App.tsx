import React from 'react'
import { useState } from 'react'
import './App.css'
import Home from './paginas/home/home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home titulo='Componente Home' descricao='Este é um componente'/>
    </>
  )
}

export default App
