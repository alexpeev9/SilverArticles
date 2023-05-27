import useFetch from '../../../hooks/useFetch'

import ArticleCard from '../../../components/articles/ArticleCard'
import { useTranslation } from 'react-i18next'

const ArticleListPage = () => {
  const { t } = useTranslation()

  const { responseData: articles } = useFetch({
    method: 'get',
    url: 'articles'
  })

  return (
    articles && (
      <section id='main' className='wrapper style2'>
        <div className='title'>{t('articles.all.title')}</div>
        <div className='container'>
          <ul className='style2 grid-x3'>
            {articles.map((article: any, key: number) => (
              <div className='col-6 col-12-small' key={key}>
                <ArticleCard article={article} />
              </div>
            ))}
          </ul>
        </div>
      </section>
    )
  )
}

export default ArticleListPage
