import { getConnection } from "typeorm";
import createConnection from '../database';
import { FakeData } from "../utils/mocks/fakeData/FakeData";
import { UpdateUserService } from "./UpdateUserService";

describe('Update user service', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })  
  afterAll(async () => {
    const connection = await getConnection()
    await connection.query('DELETE FROM user')
    await connection.close()
  })

  const fakeData = new FakeData()

  it('deve editar o nome do usuario', async () => {
    const mockUser = await fakeData.createuser()
    const updateUserService = new UpdateUserService()
    const result = await updateUserService.updateUser({
      id: mockUser.id,
      name: "outro nome",
      email: "teste@email.com"
    })
    
    expect(result).toHaveLength(0)
  })
})