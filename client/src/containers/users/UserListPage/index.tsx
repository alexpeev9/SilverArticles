import { Link } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import useFetch from '../../../hooks/useFetch'

const UserListPage = () => {
  const { responseData: users } = useFetch({
    method: 'get',
    url: 'users'
  })

  return users ? (
    <div>
      {users.map((u: any, key: string) => (
        <Link key={key} to={u.username}>
          {u.username}
        </Link>
      ))}
    </div>
  ) : (
    <Spinner />
  )
}

export default UserListPage
