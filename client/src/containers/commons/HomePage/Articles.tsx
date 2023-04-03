import useFetch from '../../../hooks/auth/useFetch'
import Spinner from '../../../components/Spinner'
import ArticleCard from '../../../components/ArticleCard'

const Articles = () => {
  const { responseData: articles } = useFetch({
    method: 'get',
    url: 'articles/get/5/old'
  })

  return (
    <div className='row gtr-150'>
      {articles ? (
        articles.map((article: any, key: number) => (
          <div className='col-6 col-12-small' key={key}>
            <ArticleCard article={article} />
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Articles
