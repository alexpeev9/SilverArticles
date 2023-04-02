import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import image1 from './assets/images/pic01.jpg'

const Info = () => {
  const { t } = useTranslation()
  return (
    <article className='box post'>
      <h2>{t('home.info.title')}</h2>
      <p>{t('home.info.description')}</p>
      <Link to='/' className='image featured'>
        <img src={image1} alt='' />
      </Link>
    </article>
  )
}

export default Info
