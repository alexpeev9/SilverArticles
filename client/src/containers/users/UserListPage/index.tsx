import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/auth/useFetch'

const UserList = () => {
  const { responseData, errors, loading } = useFetch({
    method: 'get',
    url: 'users'
  })

  return (
    <>
      <Link to='/'>Home</Link>
      {!loading ? (
        !errors ? (
          responseData ? (
            <div>
              {responseData.users.map((u: any, key: string) => (
                <p key={key}>{u.username}</p>
              ))}
            </div>
          ) : (
            <>Not Found</>
          )
        ) : (
          <>{errors}</>
        )
      ) : (
        <>Loading...</>
      )}{' '}
    </>
  )
}

export default UserList
