import { useUserContext } from '../contexts/UserContext'
import { Navigate } from 'react-router-dom'

const useAuthVerifier = (page: JSX.Element) => {
  const { userData } = useUserContext()
  return userData ? page : <Navigate to='/login' />
}

export default useAuthVerifier
