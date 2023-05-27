import { Link, useParams, useNavigate } from 'react-router-dom'
import Spinner from '../../../components/commons/Spinner'
import useFetch from '../../../hooks/useFetch'
import ArticleCard from '../../../components/articles/ArticleCard'
import { useTranslation } from 'react-i18next'

import fallbackImage from '../../../assets/images/fallbacks/category.png'
import ImageHolder from '../../../components/elements/ImageHolder'
import Info from '../../commons/HomePage/Info'
import { useUserContext } from '../../../contexts/UserContext'
import { roleIds } from '../../../env'
import { Helmet } from 'react-helmet-async'

const CategoryPage = () => {
  const { t } = useTranslation()

  const { slug } = useParams()
  const { userData } = useUserContext()
  const navigate = useNavigate()

  const { responseData: category, loading: loadingCategory } = useFetch({
    method: 'get',
    url: `categories/${slug}`
  })

  const { setRequestData: setDeleteAction, responseData: isDeleted } = useFetch(
    {
      method: 'delete',
      url: `categories/remove/${slug}`
    }
  )

  let image
  if (category && category.image) {
    try {
      image = category.image.startsWith('https://')
        ? category.image
        : require(`../../../assets/images/categories/${category.image}`)
    } catch (err) {
      image = fallbackImage
    }
  }

  const onClickRedirect = (url: string) => {
    navigate(url)
  }

  if (isDeleted) {
    navigate('/')
  }

  const onClickDelete = () => {
    let confirmed = window.confirm(
      'Are you sure you want to delete this article?'
    )
    if (confirmed) {
      setDeleteAction(true)
    }
  }

  return loadingCategory ? (
    <Spinner />
  ) : (
    category && (
      <>
        <Helmet>
          <title>{category.title}</title>
        </Helmet>
        <section id='main' className='wrapper style2'>
          <div className='title'>{category.title}</div>
          <div className='container'>
            <article className='box post'>
              <div className='image small left'>
                <ImageHolder
                  imageAddress={image}
                  fallbackImage={fallbackImage}
                  altName={category.title}
                />
              </div>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </article>
            {userData && userData.roleId === roleIds.adminId && (
              <section className='buttons-wrapper clear pt-1'>
                <button
                  className='style3'
                  onClick={() =>
                    onClickRedirect(`/categories/edit/${category.slug}`)
                  }
                >
                  {t('category.edit')}
                </button>
                <button className='style3' onClick={onClickDelete}>
                  {t('category.delete')}
                </button>
              </section>
            )}
            {category.articles.length !== 0 ? (
              <ul className='style2 grid-x3'>
                {category.articles.map((article: any, key: number) => (
                  <div className='col-6 col-12-small' key={key}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </ul>
            ) : (
              <section className='box clear pt-1'>
                <h2>{t('category.no-articles')}</h2>
                <Link to='/articles/create' className='button style1'>
                  {t('category.write-one')}
                </Link>
                <Info />
              </section>
            )}
          </div>
        </section>
      </>
    )
  )
}

export default CategoryPage
