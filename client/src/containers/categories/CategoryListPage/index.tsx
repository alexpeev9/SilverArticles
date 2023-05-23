import useFetch from '../../../hooks/useFetch'
import { useTranslation } from 'react-i18next'

import Spinner from '../../../components/Spinner'
import CategoryCard from '../../../components/CategoryCard'

const CategoryListPage = () => {
  const { t } = useTranslation()

  const { responseData: categories } = useFetch({
    method: 'get',
    url: 'categories'
  })

  return categories ? (
    <>
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
  ) : (
    <Spinner />
  )
}

export default CategoryListPage
