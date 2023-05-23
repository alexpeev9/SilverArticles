import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ImageHolder from '../ImageHolder'

import fallbackImage from '../../assets/images/fallbacks/category.png'

const CategoryCard = ({ category }: any) => {
  const { t } = useTranslation()

  let image
  try {
    image = require(`../../assets/images/categories/${category.slug}.png`)
  } catch (err) {
    image = fallbackImage
  }

  return (
    <li className='my3'>
      <article className='box post-excerpt'>
        <Link to={`/categories/${category.slug}`} className='image left'>
          <ImageHolder
            imageAddress={category.image ? category.image : image}
            fallbackImage={fallbackImage}
            altName={category.title}
          />
        </Link>
        <h3>
          <Link to={`/categories/${category.slug}`}>{category.title}</Link>
        </h3>
        {category.articles ? (
          <p>
            {t('category.description')}
            {category.articles.map((article: any, key: number) => {
              return (
                <span key={key}>
                  {' '}
                  {article.title}
                  {key + 1 !== category.articles.length ? ',' : '.'}
                </span>
              )
            })}
          </p>
        ) : (
          <>
            <p>{category.description}</p>
          </>
        )}
      </article>
    </li>
  )
}

export default CategoryCard
