import { Route, Routes } from 'react-router-dom'

import HomePage from '../HomePage'
import LoginPage from '../../auth/LoginPage'
import UserListPage from '../../users/UserListPage'
import UserPage from '../../users/UserPage'
import CategoryListPage from '../../categories/CategoryListPage'
import CategoryPage from '../../categories/CategoryPage'
import NotFoundPage from '../NotFoundPage'
import NotAuthorizedPage from '../NotAuthorizedPage'
import NoConnectionPage from '../NoConnectionPage'
import ArticleListPage from '../../articles/ArticleListPage'
import ArticlePage from '../../articles/ArticlePage'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/users' element={<UserListPage />} />
      <Route path='/users/:username' element={<UserPage />} />
      <Route path='/categories' element={<CategoryListPage />} />
      <Route path='/categories/:slug' element={<CategoryPage />} />
      <Route path='/articles' element={<ArticleListPage />} />
      <Route path='/articles/:slug' element={<ArticlePage />} />
      <Route path='/not-authorized' element={<NotAuthorizedPage />} />
      <Route path='/not-found' element={<NotFoundPage />} />
      <Route path='/no-connection' element={<NoConnectionPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default Router
