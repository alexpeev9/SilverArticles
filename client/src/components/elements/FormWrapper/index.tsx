import { useErrorContext } from '../../../contexts/ErrorContext'
import DescriptionSection from './DescriptionSection'

const FormWrapper = ({
  title,
  buttonMessage,
  description,
  setRequestData,
  data,
  children,
  loading
}: any) => {
  const { setErrors } = useErrorContext()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    // check if all fields are filled
    const errorKeys = Object.entries(data)
      .filter(([key, value]) => value === '' || value === null)
      .map(([key, value]) =>
        (key.charAt(0).toUpperCase() + key.slice(1))
          .split(/(?=[A-Z])/)
          .join(' ')
      )

    if (errorKeys.length > 0) {
      setErrors([`Please fill ${errorKeys.join(', ')}.`])
    } else {
      // Check if there is a confirm password and compare
      if (data.confirmPassword && data.confirmPassword != data.password) {
        setErrors(['Passwords are not the same.'])
      } else {
        setRequestData(data)
      }
    }
  }

  return (
    <section id='form' className='wrapper style1'>
      <div className='title'>{title}</div>
      <div className='container'>
        <div className='row form-wrapper'>
          <form onSubmit={handleSubmit} className='col-6 col-12-medium'>
            <div className='row gtr-50'>
              {children}
              <div className='col-7 center'>
                <button type='submit' disabled={loading} className='style3'>
                  {buttonMessage}
                </button>
              </div>
            </div>
          </form>
          {description && (
            <DescriptionSection
              route={description.route}
              question={description.question}
              answer={description.answer}
              info={description.info}
            />
          )}
        </div>
      </div>
    </section>
  )
}
export default FormWrapper
