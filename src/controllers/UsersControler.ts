import { Request, Response } from "express"
import { UserService } from "../services/UserServices"

class UserController {
  async createUser(request: Request, response: Response) {
    const userService = new UserService()

    const {id, name , email } = request.body
    
    if (!name || !email) {
      return response.status(400).json({ message: "Preencha todos os campos" })
    }

    const user = await userService.create({ id, name, email })
    
    return response.status(200).json(user)
  }
}

export { UserController }