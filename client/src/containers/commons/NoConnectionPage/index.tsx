import './assets/style.scss'

const NoConnectionPage = () => {
  return (
    <div className='no-connection'>
      <span className='title '>
        We are sorry, there is no connection to the server api.
      </span>
      <span className='sub-title'>Please try again later.</span>
    </div>
  )
}

export default NoConnectionPage
