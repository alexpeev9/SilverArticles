import { BrowserRouter } from 'react-router-dom'
import Router from './Router'

import { UserProvider } from '../../../contexts/UserContext'
import { ErrorProvider } from '../../../contexts/ErrorContext'

import Header from './Header'

const Layout = () => {
  return (
    <ErrorProvider>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </UserProvider>
    </ErrorProvider>
  )
}

export default Layout
