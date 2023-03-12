import { BrowserRouter } from 'react-router-dom'
import Router from './Router'

import { UserProvider } from '../../../contexts/UserContext'
import Header from './Header'

const Layout = () => {
  return (
    <>
      <UserProvider>
        <Header />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default Layout
