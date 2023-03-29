import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useErrorContext } from '../../contexts/ErrorContext'
import { useUserContext } from '../../contexts/UserContext'

import { apiUrl } from '../../env'

type MethodTypes = 'get' | 'post' | 'put' | 'delete'

const useFetch = ({ method, url }: { method: MethodTypes; url: string }) => {
  const [errors, setErrors] = useState<Array<string> | null>(null)
  const [requestData, setRequestData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [responseData, setResponseData] = useState<any | null>(null)
  const { setUserData } = useUserContext()
  const { setErrors: setGlobalErrors } = useErrorContext()

  const navigate = useNavigate()

  useEffect(() => {
    // if the method is get we want to render it only once and immediately
    const isGetMethod = method === 'get' // check if the http request is GET

    const config: AxiosRequestConfig = {
      method,
      url: `${apiUrl}/api/${url}`,
      data: requestData,
      withCredentials: true
    }

    // if GET render immediately || if no request data don't render
    if (isGetMethod || requestData) {
      setLoading(true)
      axios(config)
        .then((res) => {
          setResponseData(res.data)
          if (!isGetMethod) {
            setRequestData(null)
          }
        })
        .catch((err: any) => {
          if (err.code === 'ERR_NETWORK') {
            navigate('/no-connection')
          } else if (err.response.status === 404) {
            navigate('/not-found')
            setGlobalErrors(err.response.data.errors)
          } else if (err.response.status === 401) {
            localStorage.removeItem('user')
            setUserData(null)
            navigate('/login')
            setGlobalErrors(err.response.data.errors)
          } else if (err.response.status === 403) {
            localStorage.removeItem('user')
            setUserData(null)
            navigate('/not-authorized')
            setGlobalErrors(err.response.data.errors)
          } else {
            setErrors(err.response.data.errors)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [requestData, url, method, setUserData, setGlobalErrors, navigate])

  return { setRequestData, responseData, errors, loading }
}

export default useFetch
