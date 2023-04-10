import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import useFetch from '../../../hooks/auth/useFetch'

import Spinner from '../../../components/Spinner'
import { useUserContext } from '../../../contexts/UserContext'

const UserPage = () => {
  const navigate = useNavigate()
  const { username } = useParams()
  const { setUserData } = useUserContext()

  const { responseData: user } = useFetch({
    method: 'get',
    url: `users/${username}`
  })

  const { setRequestData, responseData: logout } = useFetch({
    method: 'post',
    url: 'auth/logout'
  })

  const handleClick = (e: React.SyntheticEvent) => {
    setRequestData({})
  }

  useEffect(() => {
    if (logout) {
      setUserData(null)
      navigate('/')
    }
  }, [logout, navigate, setUserData])

  return user ? (
    <div>
      {user.username}
      <button onClick={handleClick}>Logout</button>
    </div>
  ) : (
    <Spinner />
  )
}

export default UserPage
