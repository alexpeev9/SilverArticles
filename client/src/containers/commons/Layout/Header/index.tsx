import { Link } from 'react-router-dom'
import { useUserContext } from '../../../../contexts/UserContext'
import ErrorModal from './ErrorModal'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  const { userData } = useUserContext()

  return (
    <>
      <ErrorModal />
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
              <Link to='/articles'>{t('navigation.articles')}</Link>
            </li>
            <li>
              <Link to='/categories'>{t('navigation.categories')}</Link>
            </li>
            <li>
              <Link to='/about'>{t('navigation.about')}</Link>
            </li>
            <li>
              {!userData ? (
                <Link to='/login'>{t('navigation.login')}</Link>
              ) : (
                <Link to={`/users/${userData.username}`}>
                  {t('navigation.profile')}
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}

export default Header
