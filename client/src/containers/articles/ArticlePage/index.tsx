import { useParams } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import useFetch from '../../../hooks/useFetch'

const ArticlePage = () => {
  const { slug } = useParams()

  const { responseData: article } = useFetch({
    method: 'get',
    url: `articles/${slug}`
  })

  return article ? <div>{article.title}</div> : <Spinner />
}

export default ArticlePage
