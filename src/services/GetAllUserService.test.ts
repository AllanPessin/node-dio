import { getConnection } from "typeorm";
import createConnection from '../database'
import { UserService } from "./UserServices";
import { GetAllUserService } from "./GetAllUserService";
import { FakeData } from "../utils/mocks/fakeData/FakeData";

describe('Get all user service', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
    
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE FROM users')
    await connection.close()
  })

  const fakeData = new FakeData()

  it('Deve retornar todos os usuarios cadastrados', async () => {
    await fakeData.execute()
    const userService = new UserService()

    const expectedResponse = [
      {
        name: "usuario",
        email: "usuario@email.com"
      },
      {
        name: "outro usuario",
        email: "outro.usuario@email.com"
      }
    ]

    const getAllUserService = new GetAllUserService()
    const result = await getAllUserService.getAll()

    expect(result).toMatchObject(expectedResponse)
  })
})