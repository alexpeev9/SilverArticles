import { Navigate, useParams } from 'react-router-dom'

import useFetch from '../../../hooks/useFetch'

import ArticleForm from '../../../components/ArticleForm'
import { useUserContext } from '../../../contexts/UserContext'
import Spinner from '../../../components/Spinner'

const ArticleUpdatePage = () => {
  const { slug } = useParams()
  const { userData } = useUserContext()

  const { responseData: article } = useFetch({
    method: 'get',
    url: `articles/${slug}`
  })
  console.log(article && article)
  return article && userData ? (
    userData.username === article.author.username ? (
      <ArticleForm
        article={{ ...article, category: article.category.slug }}
        requestData={{
          method: 'put',
          url: `articles/update/${slug}`
        }}
      />
    ) : (
      <Navigate to='/not-authorized' />
    )
  ) : (
    <Spinner />
  )
}

export default ArticleUpdatePage
