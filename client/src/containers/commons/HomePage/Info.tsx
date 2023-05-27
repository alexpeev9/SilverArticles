import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import image from '../../../assets/images/common/footer.jpg'

const Info = () => {
  const { t } = useTranslation()
  return (
    <article className='box post'>
      <h2>{t('home.info.title')}</h2>
      <p>{t('home.info.description')}</p>
      <Link to='/' className='image featured'>
        <img src={image} alt='' />
      </Link>
    </article>
  )
}

export default Info
