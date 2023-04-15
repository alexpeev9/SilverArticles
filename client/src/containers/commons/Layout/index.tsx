import { BrowserRouter } from 'react-router-dom'
import Router from './Router'

import { UserProvider } from '../../../contexts/UserContext'
import { ErrorProvider } from '../../../contexts/ErrorContext'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import Header from './Header'

const Layout = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate='%s - SA' defaultTitle='Silver Articles' />
        <ErrorProvider>
          <UserProvider>
            <BrowserRouter>
              <Header />
              <Router />
            </BrowserRouter>
          </UserProvider>
        </ErrorProvider>
      </HelmetProvider>
    </>
  )
}

export default Layout
