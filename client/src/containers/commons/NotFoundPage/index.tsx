import { useTranslation } from 'react-i18next'

import useFetch from '../../../hooks/useFetch'

import CategoryCard from '../../../components/categories/CategoryCard'
import ArticleCard from '../../../components/articles/ArticleCard'

const NotFoundPage = () => {
  const { t } = useTranslation()

  const { responseData: categories } = useFetch({
    method: 'get',
    url: 'categories/get/6'
  })

  const { responseData: articles } = useFetch({
    method: 'get',
    url: 'articles/get/2/old'
  })

  return (
    <>
      <div id='main' className='wrapper style2'>
        <div className='title not-found'>
          We are sorry, the content was not found.
        </div>
        <div className='container'>
          <h3 className='pt-2'>
            Oops! It seems like the page you're looking for doesn't exist. Don't
            worry, we've got plenty of other interesting articles for you to
            explore. Take a moment to browse through our categories and find
            fascinating content that matches your interests. :
          </h3>
          <ul className='style2 grid-x3 pt-1'>
            {categories &&
              categories.map((category: any, key: number) => (
                <CategoryCard key={key} category={category} />
              ))}
          </ul>
          <ul className='style2 grid-x3 pt-1'>
            {articles &&
              articles.map((article: any, key: number) => (
                <div className='col-6 col-12-small' key={key}>
                  <ArticleCard article={article} />
                </div>
              ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
