import { useUserContext } from '../../../../contexts/UserContext'
import ErrorModal from './ErrorModal'

const Header = () => {
  const { userData } = useUserContext()

  return (
    <header>
      <ErrorModal />
      {userData ? <p>Hello, {userData.firstName}</p> : <></>}
    </header>
  )
}

export default Header
