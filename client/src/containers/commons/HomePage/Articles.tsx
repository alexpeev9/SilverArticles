import useFetch from '../../../hooks/useFetch'
import Spinner from '../../../components/commons/Spinner'
import ArticleCard from '../../../components/articles/ArticleCard'

const Articles = () => {
  const { responseData: articles, loading: loadingArticles } = useFetch({
    method: 'get',
    url: 'articles/get/2/old'
  })

  return loadingArticles ? (
    <Spinner />
  ) : (
    articles && (
      <div className='row gtr-150'>
        {articles.map((article: any, key: number) => (
          <div className='col-6 col-12-small' key={key}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    )
  )
}

export default Articles
