import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useFetch from '../../../hooks/useFetch'

import Spinner from '../../../components/commons/Spinner'
import CategoryCard from '../../../components/categories/CategoryCard'

const Categories = () => {
  const { t } = useTranslation()
  const { responseData: categories, loading: loadingCategories } = useFetch({
    method: 'get',
    url: 'categories/get/2'
  })

  return loadingCategories ? (
    <Spinner />
  ) : (
    categories && (
      <div className='col-4 col-12-medium'>
        <div id='sidebar'>
          <section className='box'>
            <header>
              <h2>{t('home.categories.title')}</h2>
            </header>
            <p>{t('home.categories.description')}</p>
            <Link to='/categories' className='button style1'>
              {t('home.categories.button')}
            </Link>
          </section>
          <ul className='style2'>
            {categories.map((category: any, key: number) => (
              <CategoryCard key={key} category={category} />
            ))}
          </ul>
        </div>
      </div>
    )
  )
}

export default Categories
