import { Link } from 'react-router-dom'
import { useUserContext } from '../../../../contexts/UserContext'
import ErrorPopup from './ErrorPopup'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  const { userData } = useUserContext()

  return (
    <>
      <ErrorPopup />
      <section id='header' className='wrapper'>
        <div id='logo'>
          <h1>
            <Link to='/'>{t('navigation.home')}</Link>
          </h1>
          <p>{t('navigation.description')}</p>
        </div>
        <nav id='nav'>
          <ul>
            <li>
              <Link to='/categories'>{t('navigation.categories')}</Link>
            </li>
            <li>
              <Link to='/'>{t('navigation.about')}</Link>
            </li>
            {!userData ? (
              <>
                <li>
                  <Link to='/login'>{t('navigation.login')}</Link>
                </li>
                <li>
                  <Link to='/register'>{t('navigation.register')}</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/articles/create'>{t('navigation.create')}</Link>
                </li>
                <li>
                  <Link to={`/users/${userData.username}`}>
                    {t('navigation.profile')}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>
    </>
  )
}

export default Header
