const FormWrapper = ({
  children,
  setRequestData,
  data,
  loading,
  buttonMessage
}: any) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setRequestData(data)
  }
  return (
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
  )
}

export default FormWrapper
