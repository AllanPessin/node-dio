import { UserService } from "../../../services/UserServices"
import { v4 as uuid } from 'uuid'

class FakeData {
  userService = new UserService
  async execute() {
    await this.userService.create({
      id: uuid(),
      name: "usuario",
      email: "usuario@email.com"
    })
    await this.userService.create({
      id: uuid(),
      name: "outro usuario",
      email: "outro.usuario@email.com"
    })
  }

  async createuser() {
    const user = await this.userService.create({
      id: uuid(),
      name: "usuario",
      email: "usuario@email.com"
    })
    
    return user
  }
}

export { FakeData }