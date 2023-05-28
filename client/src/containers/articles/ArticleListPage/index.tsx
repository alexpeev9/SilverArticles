import useFetch from '../../../hooks/useFetch'

import ArticleCard from '../../../components/articles/ArticleCard'
import { useTranslation } from 'react-i18next'
import Spinner from '../../../components/commons/Spinner'

const ArticleListPage = () => {
  const { t } = useTranslation()

  const { responseData: articles, loading: loadingArticles } = useFetch({
    method: 'get',
    url: 'articles'
  })

  return loadingArticles ? (
    <Spinner />
  ) : (
    articles && (
      <div id='main' className='wrapper style2'>
        <div className='title'>{t('article.all.title')}</div>
        <div className='container'>
          <div id='content'>
            <article className='box post'>
              <ul className='style2 grid-x3'>
                {articles.map((article: any, key: number) => (
                  <div className='col-6 col-12-small' key={key}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    )
  )
}

export default ArticleListPage
