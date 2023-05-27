import { Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import useFetch from '../../../hooks/useFetch'

import CategoryForm from '../../../components/categories/CategoryForm'
import { useUserContext } from '../../../contexts/UserContext'
import Spinner from '../../../components/commons/Spinner'
import { roleIds } from '../../../env'

const CategoryUpdatePage = () => {
  const { t } = useTranslation()

  const { slug } = useParams()
  const { userData } = useUserContext()

  const { responseData: category, loading: loadingCategory } = useFetch({
    method: 'get',
    url: `categories/${slug}`
  })

  return loadingCategory ? (
    <Spinner />
  ) : (
    category &&
      userData &&
      (userData.roleId === roleIds.adminId ? (
        <>
          <Helmet>
            <title>{t('category.edit')}</title>
          </Helmet>
          <CategoryForm
            category={{ ...category }}
            requestData={{
              method: 'put',
              url: `categories/${slug}`
            }}
          />
        </>
      ) : (
        <Navigate to='/not-authorized' />
      ))
  )
}

export default CategoryUpdatePage
