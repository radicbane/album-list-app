import React from 'react'
import './App.css'
import Albums from './components/albumsList/Albums'
import Header from './components/headerList/Header'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div className="container">
      <Link to="/">
        <Header />
      </Link>
      <Albums />
    </div>
  )
}

export default App
