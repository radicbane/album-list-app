import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Albums from './components/albumsList/Albums'
import Layout from './Layout'
import reportWebVitals from './reportWebVitals'
import DetailPage from './screens/DetailPage'
import SimpleReactLightBox from 'simple-react-lightbox'

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightBox>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="albums" element={<Albums />} />
          <Route
            path="album/:id"
            element={
              <Layout>
                <DetailPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </SimpleReactLightBox>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
