import { useUserContext } from '../../../contexts/UserContext'

const Header = () => {
  const { userData } = useUserContext()
  return <header>Hello {userData ? userData.firstName : null}</header>
}

export default Header
