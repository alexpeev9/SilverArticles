import { Route, Routes } from 'react-router-dom'

import HomePage from '../HomePage'
import LoginPage from '../../auth/LoginPage'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default Router
