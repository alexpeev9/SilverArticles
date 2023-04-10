import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useUserContext } from '../../../contexts/UserContext'

const About = () => {
  const { t } = useTranslation()
  const { userData } = useUserContext()

  return (
    <section id='intro' className='wrapper style1'>
      <div className='title'>{t('home.about.title')}</div>
      <div className='container'>
        <p className='style1'>{t('home.about.subtitle')}</p>
        <p className='style3'>{t('home.about.description')}</p>
        <ul className='actions'>
          <li>
            <Link to='/articles' className='button style3 large'>
              {t('home.about.categories-button')}
            </Link>
          </li>
          <li>
            {!userData ? (
              <Link to='/login' className='button style3 large'>
                {t('home.about.login-button')}
              </Link>
            ) : (
              <Link to='/create' className='button style3 large'>
                {t('home.about.create-button')}
              </Link>
            )}
          </li>
        </ul>
      </div>
    </section>
  )
}

export default About
