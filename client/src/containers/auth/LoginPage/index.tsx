import { useState } from 'react'
import InputField from '../../../components/InputField'
import useDecodeToken from '../../../hooks/auth/useDecodeToken'
import useFetch from '../../../hooks/auth/useFetch'

const LoginPage = () => {
  const { setRequestData, responseData, errors, loading } = useFetch({
    method: 'post',
    url: 'auth/login'
  })
  useDecodeToken(responseData)

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

  return (
    <>
      <h2>Login</h2>
      <div className='container bg-dark rounded text-white my-1 py-4 px-5'>
        {responseData ? <p>{responseData.token}</p> : <></>}
        {errors ? (
          errors.map((error: any, key: any) => <p key={key}>{error}</p>)
        ) : (
          <></>
        )}
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
      </div>
    </>
  )
}

export default LoginPage
