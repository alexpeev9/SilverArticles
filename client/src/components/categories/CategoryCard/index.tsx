import { Link } from 'react-router-dom'

import ImageHolder from '../../elements/ImageHolder'

import fallbackImage from '../../../assets/images/fallbacks/category.png'

const CategoryCard = ({ category }: any) => {
  let image
  try {
    image = category.image.startsWith('https://')
      ? category.image
      : require(`../../../assets/images/categories/${category.image}`)
  } catch (err) {
    image = fallbackImage
  }

  return (
    <li className='my3 clear'>
      <article className='box post-excerpt'>
        <Link to={`/categories/${category.slug}`} className='image left'>
          <ImageHolder
            imageAddress={image}
            fallbackImage={fallbackImage}
            altName={category.title}
          />
        </Link>
        <h3>
          <Link to={`/categories/${category.slug}`}>{category.title}</Link>
        </h3>
        {category.articles ? (
          <p>
            {category.articles.map((article: any, key: number) => {
              return (
                <span key={key}>
                  {article.title}
                  {key + 1 !== category.articles.length ? ', ' : '.'}
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
