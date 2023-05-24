import { Link, useParams, useNavigate } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import useFetch from '../../../hooks/useFetch'
import ArticleCard from '../../../components/ArticleCard'
import { useTranslation } from 'react-i18next'

import fallbackImage from '../../../assets/images/fallbacks/category.png'
import ImageHolder from '../../../components/ImageHolder'
import Info from '../../commons/HomePage/Info'
import { useUserContext } from '../../../contexts/UserContext'

const CategoryPage = () => {
  const { t } = useTranslation()

  const { slug } = useParams()
  const { userData } = useUserContext()
  const navigate = useNavigate()

  const { responseData: category } = useFetch({
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

  return category ? (
    <>
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
          {userData ? (
            <section className='buttons-wrapper clear pt-1'>
              <button
                className='style3'
                onClick={() =>
                  onClickRedirect(`/categories/edit/${category.slug}`)
                }
              >
                Edit
              </button>
              <button className='style3' onClick={onClickDelete}>
                Delete
              </button>
            </section>
          ) : (
            <>
              <button className='style3' onClick={onClickDelete}>
                Delete
              </button>
            </>
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
                Write one
              </Link>
              <Info />
            </section>
          )}
        </div>
      </section>
    </>
  ) : (
    <Spinner />
  )
}

export default CategoryPage
