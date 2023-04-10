import { useEffect, useState } from 'react'
import InputField from '../../../components/InputField'
import useFetch from '../../../hooks/auth/useFetch'
import { Navigate } from 'react-router-dom'

const RegisterPage = () => {
  const {
    setRequestData,
    responseData: token,
    errors,
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

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setRequestData(user)
  }
  return (
    <section id='form' className='wrapper style'>
      <div className='title'>Join Us Now {token ? <p>{token}</p> : <></>}</div>
      <div className='container'>
        <div className='row form-wrapper'>
          <div className='col-6 col-12-medium'>
            <section>
              <form onSubmit={handleSubmit}>
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
                  <div className='col-12'>
                    <button type='submit' className='style3'>
                      Join Now
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
