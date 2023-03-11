import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

type encodedToken = {
  token: string
}

type decodedToken = {
  username: string
  firstName: string
  lastName: string
  roleId: string
}

const useDecodeToken = (responseData: encodedToken | null) => {
  const [decodedToken, setDecodedToken] = useState<decodedToken | null>(null)

  useEffect(() => {
    try {
      if (responseData) {
        const decodedData: decodedToken = jwtDecode(responseData.token)
        if (decodedData) {
          const { username, firstName, lastName, roleId } = decodedData
          setDecodedToken({ username, firstName, lastName, roleId })
          localStorage.setItem(
            'user',
            JSON.stringify({ username, firstName, lastName, roleId })
          )
        }
      }
    } catch (err: any) {
      console.log(err.message) // big error handler
    }
  }, [responseData])

  return { decodedToken }
}

export default useDecodeToken
