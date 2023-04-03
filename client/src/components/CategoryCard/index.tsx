import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

const CategoryCard = ({ category }: any) => {
  const { t } = useTranslation()
  let [image, setImage] = useState()

  useEffect(() => {
    try {
      setImage(require(`../../assets/images/categories/${category.slug}.png`))
    } catch (err) {
      setImage(require(`../../assets/images/categories/default.jpg`))
    }
  }, [category.slug])

  return (
    <li className='my3'>
      <article className='box post-excerpt'>
        <Link to={`/categories/${category.slug}`} className='image left'>
          <img src={image} alt={category.title} />
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
