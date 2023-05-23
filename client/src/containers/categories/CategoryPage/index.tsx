import { Link, useParams } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import useFetch from '../../../hooks/useFetch'
import ArticleCard from '../../../components/ArticleCard'
import { useTranslation } from 'react-i18next'

import fallbackImage from '../../../assets/images/fallbacks/category.png'
import ImageHolder from '../../../components/ImageHolder'

const CategoryPage = () => {
  const { t } = useTranslation()
  const { slug } = useParams()
  const { responseData: category } = useFetch({
    method: 'get',
    url: `categories/${slug}`
  })

  let image
  if (category && category.slug) {
    try {
      image = require(`../../../assets/images/categories/1${category.slug}.png`)
    } catch (err) {
      image = fallbackImage
    }
  }

  return category ? (
    <>
      <section id='main' className='wrapper style2'>
        <div className='title'>{category.title}</div>
        <div className='container'>
          <article className='box post'>
            <Link to='/' className='image left'>
              <ImageHolder
                imageAddress={category.image ? category.image : image}
                fallbackImage={fallbackImage}
                altName={category.title}
              />
            </Link>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
          </article>
          <ul className='style2 grid-x3'>
            {category.articles.count !== 0 ? (
              category.articles.map((article: any, key: number) => (
                <div className='col-6 col-12-small' key={key}>
                  <ArticleCard article={article} />
                </div>
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </section>
    </>
  ) : (
    <Spinner />
  )
}

export default CategoryPage
