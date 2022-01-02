import { getRepository } from "typeorm"
import { User } from "../models/User"

interface IUser {
  id?: string
  name: string,
  email?: string
}

class UserService {
  async create({ name, email }: IUser) {

    const user = await getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name: name, email: email },
      ])
      .execute()

    return user
  }
}

export { UserService }