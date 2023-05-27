import { useTranslation } from 'react-i18next'

import useFetch from '../../../hooks/useFetch'

import CategoryCard from '../../../components/categories/CategoryCard'
import ArticleCard from '../../../components/articles/ArticleCard'
import { Link, useNavigate } from 'react-router-dom'

const NotAuthorizedPage = () => {
  const navigate = useNavigate()

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
        <div className='title not-found'>You are not authorized</div>
        <div className='container'>
          <h3>
            You are not authorized to access this page. If you believe this is
            an error, please contact the administrator for assistance. You can
            go back to the homepage or explore other sections of the website.
          </h3>
          <div className='buttons-wrapper main-image pt-2'>
            <button className='style3' onClick={() => navigate('/')}>
              Home Page
            </button>
            <button className='style3' onClick={() => navigate('/login')}>
              Login Page
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotAuthorizedPage
