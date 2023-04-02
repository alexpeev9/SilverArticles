import { useErrorContext } from '../../../../contexts/ErrorContext'

const ErrorModal = () => {
  const { errors, setErrors } = useErrorContext()

  const handleClick = () => {
    setErrors(null)
  }
  return errors ? (
    <div>
      <section>
        {errors.map((error: string, key: string) => (
          <div key={key}>{error}</div>
        ))}
        <div>
          <button onClick={handleClick}>X</button>
        </div>
      </section>
    </div>
  ) : (
    <></>
  )
}

export default ErrorModal
