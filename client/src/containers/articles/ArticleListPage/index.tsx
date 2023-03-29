import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/auth/useFetch'

import Spinner from '../../../components/Spinner'

const ArticleListPage = () => {
  const { responseData: articles } = useFetch({
    method: 'get',
    url: 'articles'
  })

  return articles ? (
    <div>
      {articles.map((c: any, key: string) => (
        <Link key={key} to={c.slug}>
          {c.title}
        </Link>
      ))}
    </div>
  ) : (
    <Spinner />
  )
}

export default ArticleListPage
