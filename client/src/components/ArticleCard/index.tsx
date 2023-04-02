import { Link } from 'react-router-dom'
import image5 from '../../assets/images/pic05.jpg'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ArticleCard = ({ article }: any) => {
  const { t } = useTranslation()
  const [image, setImage] = useState(article.image)

  function handleImageError() {
    setImage(image5)
  }
  return (
    <section className='box'>
      <header>
        <h2>{article.title}</h2>
      </header>
      <Link to='/' className='image featured'>
        <img onError={handleImageError} src={image} alt={article.title} />
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
