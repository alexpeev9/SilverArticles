import { useErrorContext } from '../../../../../contexts/ErrorContext'
import CloseIcon from './CloseIcon'

const ErrorPopup = () => {
  const { errors, setErrors } = useErrorContext()

  const handleClick = () => {
    setErrors(null)
  }

  return (
    errors && (
      <div className='popup'>
        {errors.map((error: string, key: string) => (
          <span key={key}>{error}</span>
        ))}
        <button onClick={handleClick}>
          <CloseIcon />
        </button>
      </div>
    )
  )
}

export default ErrorPopup
