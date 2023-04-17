import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorContext } from '../contexts/ErrorContext'
import { useUserContext } from '../contexts/UserContext'

import { apiUrl } from '../env'

type MethodTypes = 'get' | 'post' | 'put' | 'delete'

const useFetch = ({ method, url }: { method: MethodTypes; url: string }) => {
  const navigate = useNavigate()

  const [requestData, setRequestData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [responseData, setResponseData] = useState<any | null>(null)
  const { setErrors: setGlobalErrors } = useErrorContext()
  const { setUserData } = useUserContext()

  useEffect(() => {
    // if the method is get we want to render it only once and immediately
    const isGetMethod = method === 'get' // check if the http request is GET

    const config: AxiosRequestConfig = {
      method,
      url: `${apiUrl}/api/${url}`,
      data: requestData,
      withCredentials: true
    }

    // if GET method - render immediately || if no request data don't render
    if (isGetMethod || requestData) {
      setLoading(true)
      axios(config)
        .then((res) => {
          setResponseData(res.data)
        })
        .catch((err: any) => {
          if (err.code === 'ERR_NETWORK') {
            navigate('/no-connection')
          } else if (err.response.status === 404) {
            setGlobalErrors(err.response.data.errors)
            navigate('/not-found')
          } else if (err.response.status === 401) {
            setUserData(null)
            navigate('/login')
          } else if (err.response.status === 403) {
            setGlobalErrors(err.response.data.errors)
            setUserData(null)
            navigate('/not-authorized')
          } else {
            setGlobalErrors(err.response.data.errors)
          }
        })
        .finally(() => {
          if (!isGetMethod) {
            setRequestData(null)
          }
          setLoading(false)
        })
    }
  }, [requestData, url, method, setGlobalErrors, setUserData, navigate])

  return { setRequestData, responseData, loading }
}

export default useFetch
