import { getRepository } from "typeorm"
import { User } from "../models/User"

interface IUser {
  id: string,
  name: string,
  email?: string
}
class UpdateUserService {
  async updateUser({ id, name, email }: IUser) {
    const user = await getRepository(User)
      .createQueryBuilder()
      .update(User)
      .set({
        name: name,
        email: email
      })
      .where("id = :id", { id })
      .execute()
    
      console.log(user.raw)
      return user.raw
  }
}

export { UpdateUserService }