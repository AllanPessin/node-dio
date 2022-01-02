import { Request, Response } from "express"
import { DeleteUserService } from "../services/DeleteUserService"
import { GetAllUserService } from "../services/GetAllUserService"
import { UpdateUserService } from "../services/UpdateUserService"
import { UserService } from "../services/UserServices"

class UserController {
  async createUser(request: Request, response: Response) {
    const userService = new UserService()

    const { id, name, email } = request.body

    if (!name || !email) {
      return response.status(400).json({ message: "Preencha todos os campos" })
    }

    const user = await userService.create({ id, name, email })

    return response.status(200).json(user)
  }

  async getAllUser(request: Request, response: Response) {
    const getAllUserService = new GetAllUserService()
    const users = await getAllUserService.getAll()

    return response.status(200).json(users)
  }

  async updateUser(request: Request, response: Response) {
    const updateUserService = new UpdateUserService()
    const { id, name, email } = request.body

    if (!id) {
      return response.status(400).json({ message: "Usuário não encontrado" })
    } else if (!name) {
      return response.status(400).json({ message: "Informe um nome" })
    }

    await updateUserService.updateUser({ id, name, email })

    return response.status(204).json({ message: "Usuário atualizado" })
  }

  async deleteUser(request: Request, response: Response) {
    const deleUserService = new DeleteUserService()
    const { id } = request.params

    if (!id) {
      return response.status(400).json({ message: "Usuário não encontrado" })
    }

    await deleUserService.deleteUser({ id })
    return response.status(204).json()
  }
}

export { UserController }