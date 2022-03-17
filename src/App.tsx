import React from 'react'
import './App.css'
import Albums from './components/albumsList/Albums'
import Header from './components/headerList/Header'

const App = () => {
  return (
    <div className="container">
      <Header />
      <Albums />
    </div>
  )
}

export default App
