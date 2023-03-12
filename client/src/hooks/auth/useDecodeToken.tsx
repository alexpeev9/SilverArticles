import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useUserContext } from '../../contexts/UserContext'

type decodedTokenType = {
  username: string
  firstName: string
  lastName: string
  roleId: string
  iat: number
  exp: number
}

const useDecodeToken = (token: string | null) => {
  const [decodedToken, setDecodedToken] = useState<decodedTokenType | null>(
    null
  )
  const { setUserData } = useUserContext()

  useEffect(() => {
    try {
      if (token) {
        const decodedData: decodedTokenType = jwtDecode(token)
        if (decodedData) {
          setDecodedToken(decodedData)
          localStorage.setItem('user', JSON.stringify(decodedData))
          setUserData(decodedData)
        }
      }
    } catch (err: any) {
      console.log(err.message) // big error handler
    }
  }, [token, setUserData])

  return { decodedToken }
}

export default useDecodeToken
