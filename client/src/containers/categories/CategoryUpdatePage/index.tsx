import { Navigate, useParams } from 'react-router-dom'

import useFetch from '../../../hooks/useFetch'

import CategoryForm from '../../../components/categories/CategoryForm'
import { useUserContext } from '../../../contexts/UserContext'
import Spinner from '../../../components/commons/Spinner'
import { roleIds } from '../../../env'

const CategoryUpdatePage = () => {
  const { slug } = useParams()
  const { userData } = useUserContext()

  const { responseData: category } = useFetch({
    method: 'get',
    url: `categories/${slug}`
  })

  return category && userData ? (
    userData.roleId === roleIds.adminId ? (
      <CategoryForm
        category={{ ...category }}
        requestData={{
          method: 'put',
          url: `categories/update/${slug}`
        }}
      />
    ) : (
      <Navigate to='/not-authorized' />
    )
  ) : (
    <Spinner />
  )
}

export default CategoryUpdatePage
