import { useState } from 'react'
import { Link } from 'react-router-dom'

import image10 from '../../assets/images/pic10.jpg'
import { useTranslation } from 'react-i18next'

const CategoryCard = ({ category }: any) => {
  const { t } = useTranslation()
  const [image, setImage] = useState(
    `../../assets/images/categories/${category.slug}.jpg`
  )

  function handleImageError() {
    setImage(image10)
  }

  return (
    <li className='my3'>
      <article className='box post-excerpt'>
        <Link to={`/categories/${category.slug}`} className='image left'>
          <img onError={handleImageError} src={image} alt={category.title} />
        </Link>
        <h3>
          <Link to={`/categories/${category.slug}`}>{category.title}</Link>
        </h3>
        <p>
          {t('category.description')}
          {category.articles.map((article: any, key: number) => {
            return (
              <>
                {' '}
                {article.title}
                {key + 1 !== category.articles.length ? ',' : '.'}
              </>
            )
          })}
        </p>
      </article>
    </li>
  )
}

export default CategoryCard
