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

// const milliseconds = 14000

const ErrorContext = createContext<any | null>(null)

export const useErrorContext = () => useContext(ErrorContext)

export const ErrorProvider = ({ children }: Props) => {
  const [errors, setErrors] = useState(null)
  useEffect(() => {
    if (errors) {
      // setTimeout(() => setErrors(null), milliseconds)
    }
  }, [errors])
  return (
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorContext.Provider>
  )
}
