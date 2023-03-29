import { useParams } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import useFetch from '../../../hooks/auth/useFetch'

const UserPage = () => {
  const { username } = useParams()

  const { responseData: user } = useFetch({
    method: 'get',
    url: `users/${username}`
  })

  return user ? <div>{user.username}</div> : <Spinner />
}

export default UserPage
