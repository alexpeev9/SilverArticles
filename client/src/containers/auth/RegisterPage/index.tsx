import { useEffect } from 'react'
import InputField from '../../../components/InputField'
import useFetch from '../../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '../../../contexts/UserContext'
import { Helmet } from 'react-helmet-async'
import FormWrapper from '../../../components/FormWrapper'
import useSetFormInputs from '../../../hooks/useSetFormInputs'

const RegisterPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { userData, decodeToken } = useUserContext()

  const { data: user, onInputChange } = useSetFormInputs({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  })

  const {
    setRequestData: setUserData,
    responseData: token,
    loading
  } = useFetch({
    method: 'post',
    url: 'auth/register'
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
        <title>{t('register.title')}</title>
      </Helmet>
      <FormWrapper
        title={t('register.title')}
        buttonMessage={t('register.button')}
        setRequestData={setUserData}
        data={user}
        loading={loading}
        description={{
          route: '/login',
          question: t('register.cta-question'),
          answer: t('register.cta-answer'),
          info: t('register.description')
        }}
      >
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
      </FormWrapper>
    </>
  )
}

export default RegisterPage
