import useFetch from '../../../hooks/useFetch'
import { useTranslation } from 'react-i18next'

import Spinner from '../../../components/commons/Spinner'
import CategoryCard from '../../../components/categories/CategoryCard'
import { Helmet } from 'react-helmet-async'

const CategoryListPage = () => {
  const { t } = useTranslation()

  const { responseData: categories, loading: loadingCategory } = useFetch({
    method: 'get',
    url: 'categories'
  })

  return loadingCategory ? (
    <Spinner />
  ) : (
    categories && (
      <>
        <Helmet>
          <title>{t('home.second-title')}</title>
        </Helmet>
        <section id='main' className='wrapper style2'>
          <div className='title'>{t('home.second-title')}</div>
          <div className='container'>
            <ul className='style2 grid-x3'>
              {categories.map((category: any, key: number) => (
                <CategoryCard key={key} category={category} />
              ))}
            </ul>
          </div>
        </section>
      </>
    )
  )
}

export default CategoryListPage
