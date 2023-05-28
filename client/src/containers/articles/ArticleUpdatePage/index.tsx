import { Navigate, useParams } from 'react-router-dom'

import useFetch from '../../../hooks/useFetch'

import ArticleForm from '../../../components/articles/ArticleForm'
import { useUserContext } from '../../../contexts/UserContext'
import Spinner from '../../../components/commons/Spinner'
import { roleIds } from '../../../env'

const ArticleUpdatePage = () => {
  const { slug } = useParams()
  const { userData } = useUserContext()

  const { responseData: article, loading: loadingArticle } = useFetch({
    method: 'get',
    url: `articles/${slug}`
  })

  return loadingArticle ? (
    <Spinner />
  ) : (
    article &&
      userData &&
      (userData.username === article.author.username ||
      userData.roleId === roleIds.moderatorId ||
      userData.roleId === roleIds.adminId ? (
        <ArticleForm
          article={{ ...article, category: article.category.slug }}
          requestData={{
            method: 'put',
            url: `articles/${slug}`
          }}
        />
      ) : (
        <Navigate to='/not-authorized' />
      ))
  )
}

export default ArticleUpdatePage
