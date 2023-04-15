import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../../components/InputField'
import useFetch from '../../../hooks/useFetch'
import { useUserContext } from '../../../contexts/UserContext'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    setRequestData,
    responseData: token,
    loading
  } = useFetch({
    method: 'post',
    url: 'auth/login'
  })
  const { userData, decodeToken } = useUserContext()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setRequestData(user)
  }

  useEffect(() => {
    if (token && !userData) {
      decodeToken(token)
      navigate('/')
    }
  }, [token, decodeToken, userData, navigate])

  return (
    <>
      <Helmet>
        <title>{t('login.title')}</title>
      </Helmet>
      <section id='form' className='wrapper style1'>
        <div className='title'>{t('login.title')}</div>
        <div className='container'>
          <div className='row form-wrapper'>
            <form onSubmit={handleSubmit} className='col-6 col-12-medium'>
              <div className='row gtr-50'>
                <div className='col-7'>
                  <InputField
                    name={'email'}
                    label={'Email'}
                    type={'text'}
                    value={user.email}
                    action={onInputChange}
                  />
                </div>
                <div className='col-7'>
                  <InputField
                    name={'password'}
                    label={'Password'}
                    type={'password'}
                    value={user.password}
                    action={onInputChange}
                  />
                </div>
                <div className='col-7 center'>
                  <button type='submit' disabled={loading} className='style3'>
                    {t('login.button')}
                  </button>
                </div>
              </div>
            </form>
            <div className='col-6 col-7-medium text-section'>
              <Link to='/register'>
                {t('login.cta-question')}{' '}
                <span className='button-cta'> {t('login.cta-answer')}</span>
              </Link>
              <p>{t('login.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginPage
