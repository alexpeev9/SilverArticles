import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
      <FormWrapper
        title={t('login.title')}
        buttonMessage={t('login.button')}
        setRequestData={setUserData}
        data={user}
        loading={loading}
        description={{
          route: '/register',
          question: t('login.cta-question'),
          answer: t('login.cta-answer'),
          info: t('login.description')
        }}
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
    </>
  )
}

export default LoginPage
