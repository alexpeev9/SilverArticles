import axios from 'axios'
import { useEffect, useState } from 'react'

import { apiUrl } from '../../env'

const useFetch = ({
  method,
  url
}: {
  method: 'get' | 'post' | 'put' | 'delete'
  url: string
}) => {
  const [errors, setErrors] = useState<Array<string> | null>(null)
  const [requestData, setRequestData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [responseData, setResponseData] = useState<any | null>(null)

  useEffect(() => {
    if (requestData) {
      setLoading(true)
      axios
        .post(`${apiUrl}/api/${url}`, requestData, { withCredentials: true })
        .then((res) => {
          console.log(res)
          setResponseData(res.data)
          setRequestData(null)
        })
        .catch((err: any) => {
          if (err.response) {
            setErrors(err.response.data.errors)
          } else {
            console.log('Database Error Try Later') // TODO Global Error
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [requestData, url, method])

  return { setRequestData, responseData, errors, loading }
}

export default useFetch
