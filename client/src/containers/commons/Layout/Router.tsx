import { Route, Routes } from 'react-router-dom'

import useAuthVerifier from '../../../hooks/useAuthVerifier'

import HomePage from '../HomePage'
import NotAuthorizedPage from '../NotAuthorizedPage'
import NoConnectionPage from '../NoConnectionPage'
import LoginPage from '../../auth/LoginPage'
import RegisterPage from '../../auth/RegisterPage'
import ProfilePage from '../../auth/ProfilePage'
import CategoryListPage from '../../categories/CategoryListPage'
import CategoryCreatePage from '../../categories/CategoryCreatePage'
import CategoryUpdatePage from '../../categories/CategoryUpdatePage'
import CategoryPage from '../../categories/CategoryPage'
import ArticleListPage from '../../articles/ArticleListPage'
import ArticleCreatePage from '../../articles/ArticleCreatePage'
import ArticleUpdatePage from '../../articles/ArticleUpdatePage'
import ArticlePage from '../../articles/ArticlePage'
import NotFoundPage from '../NotFoundPage'

const Router = () => {
  return (
    <Routes>
      {/* Common */}
      <Route path='/' element={<HomePage />} />
      <Route path='/no-connection' element={<NoConnectionPage />} />
      <Route path='/not-found' element={<NotFoundPage />} />
      <Route path='/not-authorized' element={<NotAuthorizedPage />} />

      {/* User */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/users/:username' element={<ProfilePage />} />

      {/* Category */}
      <Route path='/categories' element={<CategoryListPage />} />
      <Route
        path='/categories/create'
        element={useAuthVerifier(<CategoryCreatePage />)}
      />
      <Route
        path='/categories/edit/:slug'
        element={useAuthVerifier(<CategoryUpdatePage />)}
      />
      <Route path='/categories/:slug' element={<CategoryPage />} />

      {/* Article */}
      <Route path='/articles' element={<ArticleListPage />} />
      <Route
        path='/articles/create'
        element={useAuthVerifier(<ArticleCreatePage />)}
      />
      <Route
        path='/articles/edit/:slug'
        element={useAuthVerifier(<ArticleUpdatePage />)}
      />
      <Route path='/articles/:slug' element={<ArticlePage />} />

      {/* Not Found */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default Router
