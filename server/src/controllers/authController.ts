import IUser from '../interfaces/entities/IUser'
import authService from '../services/authService'

const register = async (req: any, res: any) => {
  try {
    const response: IUser = await authService.register(req.body)
    return res.status(200).json(response)
  } catch (err: any) {
    const errorMessage = err.message
    return res.status(500).json(errorMessage)
  }
}

export default { register }
