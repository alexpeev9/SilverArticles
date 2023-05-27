import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useFetch from '../../../hooks/useFetch'
import { useUserContext } from '../../../contexts/UserContext'
import { roleIds } from '../../../env'
import Spinner from '../../../components/commons/Spinner'
import ArticleCard from '../../../components/articles/ArticleCard'

const ProfilePage = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const { username } = useParams()
  const { userData, setUserData } = useUserContext()

  const { responseData: user } = useFetch({
    method: 'get',
    url: `users/${username}`
  })

  const { setRequestData, responseData: logout } = useFetch({
    method: 'post',
    url: 'auth/logout'
  })

  useEffect(() => {
    if (logout) {
      setUserData(null)
      navigate('/')
    }
  }, [logout, navigate, setUserData])

  const handleLogout = (e: React.SyntheticEvent) => {
    setRequestData({})
  }

  return user ? (
    <>
      <Helmet>
        <title>
          {user.username}
          {t('user.profile.helmet')}
        </title>
      </Helmet>
      <>
        <div id='main' className='wrapper style2'>
          <div className='title'>{t('user.profile.title')}</div>
          <div className='container'>
            <div id='content'>
              <article className='box post'>
                <header className='style1'>
                  <h2>{user.username}</h2>
                  <p>
                    {user.firstName} {user.lastName}
                    {' - '}
                    {user.role.title}
                  </p>
                  {userData && userData.username === user.username && (
                    <section className='buttons-wrapper pt-1'>
                      <button className='style3' onClick={handleLogout}>
                        {t('user.profile.logout')}
                      </button>
                      <button
                        className='style3'
                        onClick={() => navigate('/articles/create')}
                      >
                        {t('user.profile.write')}
                      </button>
                      {userData.roleId === roleIds.moderatorId && (
                        <button
                          className='style3'
                          onClick={() => navigate('/articles')}
                        >
                          {t('user.profile.all-articles')}
                        </button>
                      )}
                      {userData.roleId === roleIds.adminId && (
                        <button
                          className='style3'
                          onClick={() => navigate('/categories/create')}
                        >
                          {t('user.profile.add')}
                        </button>
                      )}
                    </section>
                  )}
                </header>
                {user.articles.length !== 0 ? (
                  <ul className='style2 grid-x3'>
                    {user.articles.map((article: any, key: number) => (
                      <div className='col-6 col-12-small' key={key}>
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </ul>
                ) : (
                  <section className='box clear'>
                    <h2>{t('category.no-articles')}</h2>
                  </section>
                )}
              </article>
            </div>
          </div>
        </div>
      </>
    </>
  ) : (
    <Spinner />
  )
}

export default ProfilePage
