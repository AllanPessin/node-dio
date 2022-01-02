import { getRepository } from "typeorm"
import { User } from "../models/User"

class GetAllUserService { 
  async getAll() {
    const users = await getRepository(User)
      .createQueryBuilder('users')
      .select()
      .getMany()
    
    console.log(users)

    return users
  }
}

export { GetAllUserService }