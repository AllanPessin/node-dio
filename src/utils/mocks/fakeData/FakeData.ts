import { UserService } from "../../../services/UserServices"
import { v4 as uuid } from 'uuid'

class FakeData {
  async execute() {
    const userService = new UserService()
    await userService.create({
      id: uuid(),
      name: "usuario",
      email: "usuario@email.com"
    })
    await userService.create({
      id: uuid(),
      name: "outro usuario",
      email: "outro.usuario@email.com"
    })
  }
}

export { FakeData }