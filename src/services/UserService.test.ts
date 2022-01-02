import { getConnection } from "typeorm";
import createConnection from '../database'
import { UserService } from "./UserServices";
import { v4 as uuid } from 'uuid';

describe('User Services', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE FROM users')
    await connection.close()
  })

  it('Deve retornar o id do usuario criado', async () => {
    const userService = new UserService()
    const result = await userService.create({
      id: uuid(),
      name: "Allan",
      email: "allan@email.com"
    })

    console.log(result)
    expect(result).toHaveProperty('id')
  })
})