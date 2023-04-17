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
        <BrowserRouter>
          <ErrorProvider>
            <UserProvider>
              <Header />
              <Router />
            </UserProvider>
          </ErrorProvider>
        </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

export default Layout
