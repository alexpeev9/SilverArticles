import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react'
import useFetch from '../hooks/useFetch'
import jwtDecode from 'jwt-decode'

type Props = {
  children: ReactNode
}

const UserContext = createContext<any | null>({})

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState(null)

  const { responseData: token } = useFetch({
    method: 'get',
    url: 'auth/verify'
  })

  const decodeToken = (token: any) => {
    const decodedData: any = jwtDecode(token)
    if (decodedData) {
      setUserData(decodedData)
    }
  }

  useEffect(() => {
    if (token) {
      decodeToken(token)
    }
  }, [token])

  return (
    <UserContext.Provider value={{ userData, setUserData, decodeToken }}>
      {children}
    </UserContext.Provider>
  )
}
