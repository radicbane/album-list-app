import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import Header from './components/headerList/Header'
import DetailPage from './screens/DetailPage'

const Layout: FunctionComponent = () => {
  return (
    <div>
      <Link to="/">
        <Header />
      </Link>
      <DetailPage />
    </div>
  )
}

export default Layout
