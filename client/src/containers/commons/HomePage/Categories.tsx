import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useFetch from '../../../hooks/auth/useFetch'

import Spinner from '../../../components/Spinner'
import CategoryCard from '../../../components/CategoryCard'

const Categories = () => {
  const { t } = useTranslation()
  const { responseData: categories } = useFetch({
    method: 'get',
    url: 'categories/get/2'
  })

  return (
    <>
      <div className='col-4 col-12-medium'>
        <div id='sidebar'>
          <section className='box'>
            <header>
              <h2>{t('home.categories.title')}</h2>
            </header>
            <p>{t('home.categories.description')}</p>
            <Link to='/' className='button style1'>
              {t('home.categories.button')}
            </Link>
          </section>
          <ul className='style2'>
            {categories ? (
              categories.map((category: any, key: number) => (
                <CategoryCard key={key} category={category} />
              ))
            ) : (
              <Spinner />
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Categories
