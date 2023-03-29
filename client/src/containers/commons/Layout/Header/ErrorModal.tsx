import { useErrorContext } from '../../../../contexts/ErrorContext'

const ErrorModal = () => {
  const { errors, setErrors } = useErrorContext()

  const handleClick = () => {
    setErrors(null)
  }
  return errors ? (
    errors.map((error: string, key: string) => (
      <section key={key}>
        {error}
        <button onClick={handleClick}>X</button>
      </section>
    ))
  ) : (
    <></>
  )
}

export default ErrorModal
