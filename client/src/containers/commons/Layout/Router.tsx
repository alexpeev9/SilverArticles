import { Route, Routes } from 'react-router-dom'

import HomePage from '../HomePage'
import LoginPage from '../../auth/LoginPage'
import UserList from '../../users/UserListPage'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/users' element={<UserList />} />
    </Routes>
  )
}

export default Router
