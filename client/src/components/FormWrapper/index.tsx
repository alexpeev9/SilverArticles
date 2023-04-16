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
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setRequestData(data)
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
          {description ? (
            <DescriptionSection
              route={description.route}
              question={description.question}
              answer={description.answer}
              info={description.info}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  )
}
export default FormWrapper
