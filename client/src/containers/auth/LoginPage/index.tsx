import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../../components/InputField'
import useFetch from '../../../hooks/useFetch'
import { useUserContext } from '../../../contexts/UserContext'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import FormWrapper from '../../../components/FormWrapper'
import useSetFormInputs from '../../../hooks/useSetFormInputs'

const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { userData, decodeToken } = useUserContext()

  const { data: user, onInputChange } = useSetFormInputs({
    email: '',
    password: ''
  })

  const {
    setRequestData: setUserData,
    responseData: token,
    loading
  } = useFetch({
    method: 'post',
    url: 'auth/login'
  })

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
            <FormWrapper
              setRequestData={setUserData}
              data={user}
              loading={loading}
              buttonMessage={t('login.button')}
            >
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
            </FormWrapper>
            <div className='col-6 col-7-medium text-section'>
              <Link to='/register'>
                {t('login.cta-question')}{' '}
                <span className='button-cta'>{t('login.cta-answer')}</span>
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
