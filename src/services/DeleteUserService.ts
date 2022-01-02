import { getRepository, ReturningStatementNotSupportedError } from "typeorm";
import { User } from "../models/User";

interface IUser {
  id: string
}

class DeleteUserService {
  async deleteUser({ id }: IUser) {
    const user = await getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute()
    
    console.log(user)
    return user.raw
  }
}

export { DeleteUserService };
