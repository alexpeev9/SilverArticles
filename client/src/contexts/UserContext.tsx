import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react'

type Props = {
  children: ReactNode
}

const UserContext = createContext<any | null>(null)

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState(null)
  const token = localStorage.getItem('user')
  useEffect(() => {
    if (token) {
      const data = JSON.parse(token)
      if (data && new Date(data.exp) < new Date()) {
        setUserData(data)
      }
    }
  }, [token])
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}
