import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ImageHolder from '../../elements/ImageHolder'
import fallbackImage from '../../../assets/images/fallbacks/article.jpg'

const ArticleCard = ({ article }: any) => {
  const { t } = useTranslation()

  return (
    <section className='box'>
      <header className='header-title'>
        <h2>{article.title}</h2>
      </header>
      <Link to={`/articles/${article.slug}`} className='image featured'>
        <ImageHolder
          imageAddress={article.image}
          fallbackImage={fallbackImage}
          altName={article.title}
        />
      </Link>
      <p>
        {article.description.length > 100
          ? `${article.description.substring(0, 100)}...`
          : article.description}
      </p>
      <Link to={`/articles/${article.slug}`} className='button style1'>
        {t('article.buttons.more')}
      </Link>
    </section>
  )
}

export default ArticleCard
