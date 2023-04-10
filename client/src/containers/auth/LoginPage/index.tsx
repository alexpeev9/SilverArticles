import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../../../components/InputField'
import useFetch from '../../../hooks/auth/useFetch'
import { useUserContext } from '../../../contexts/UserContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const {
    setRequestData,
    responseData: token,
    errors,
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
      {errors ? (
        errors.map((error: any, key: any) => <p key={key}>{error}</p>)
      ) : (
        <></>
      )}
      {!userData ? (
        <form
          onSubmit={handleSubmit}
          className='row d-flex justify-content-center'
        >
          <InputField
            name={'email'}
            label={'Email'}
            type={'text'}
            value={user.email}
            action={onInputChange}
          />

          <InputField
            name={'password'}
            label={'Password'}
            type={'password'}
            value={user.password}
            action={onInputChange}
          />
          <button type='submit' disabled={loading}>
            Login
          </button>
        </form>
      ) : (
        <p>s</p>
      )}
    </>
  )
}

export default LoginPage
