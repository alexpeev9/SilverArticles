import { useEffect, useState } from 'react'
import InputField from '../../../components/InputField'
import useFetch from '../../../hooks/useFetch'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '../../../contexts/UserContext'
import { Helmet } from 'react-helmet-async'

const RegisterPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    setRequestData,
    responseData: token,
    loading
  } = useFetch({
    method: 'post',
    url: 'auth/register'
  })

  const [user, setUser] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  })

  const { userData, decodeToken } = useUserContext()

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
        <title>{t('register.title')}</title>
      </Helmet>
      <section id='form' className='wrapper style1'>
        <div className='title'>{t('register.title')}</div>
        <div className='container'>
          <div className='row form-wrapper'>
            <form onSubmit={handleSubmit} className='col-6 col-12-medium'>
              <div className='row gtr-50'>
                <div className='col-6 col-12-small'>
                  <InputField
                    name={'email'}
                    label={'Email'}
                    type={'text'}
                    value={user.email}
                    action={onInputChange}
                  />
                </div>
                <div className='col-6 col-12-small'>
                  <InputField
                    name={'username'}
                    label={'Username'}
                    type={'text'}
                    value={user.username}
                    action={onInputChange}
                  />
                </div>
                <div className='col-6 col-12-small'>
                  <InputField
                    name={'firstName'}
                    label={'First Name'}
                    type={'text'}
                    value={user.firstName}
                    action={onInputChange}
                  />
                </div>
                <div className='col-6 col-12-small'>
                  <InputField
                    name={'lastName'}
                    label={'Last Name'}
                    type={'text'}
                    value={user.lastName}
                    action={onInputChange}
                  />
                </div>
                <div className='col-6 col-12-small'>
                  <InputField
                    name={'password'}
                    label={'Password'}
                    type={'password'}
                    value={user.password}
                    action={onInputChange}
                  />
                </div>
                <div className='col-6 col-12-small'>
                  <InputField
                    name={'confirmPassword'}
                    label={'Confirm Password'}
                    type={'password'}
                    value={user.confirmPassword}
                    action={onInputChange}
                  />
                </div>
                <div className='col-12 center'>
                  <button type='submit' className='style3' disabled={loading}>
                    {t('register.button')}
                  </button>
                </div>
                <div className='col-12 text-section'>
                  <Link to='/login'>
                    {t('register.cta-question')}{' '}
                    <span className='button-cta'>
                      {t('register.cta-answer')}
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default RegisterPage
