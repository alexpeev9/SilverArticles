import Spinner from '../components/commons/Spinner'
import LoginPage from '../containers/auth/LoginPage'
import { useUserContext } from '../contexts/UserContext'

const useAuthVerifier = (page: any) => {
  const { userData, userLoading } = useUserContext()
  return !userLoading ? userData ? page : <LoginPage /> : <Spinner />
}

export default useAuthVerifier
