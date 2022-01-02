import { getConnection } from "typeorm";
import createConnection from '../database';
import { FakeData } from "../utils/mocks/fakeData/FakeData";
import { DeleteUserService } from "./DeleteUserService";

describe('Delete user service', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })
  afterAll(async () => {
    const connection = await getConnection()
    await connection.close()
  })

  const fakeData = new FakeData()

  it('Deve deletar o usuário e retornar um array vazio quando for deletado', async () => {
    const mockUser = await fakeData.createuser()
    const deleteUserService = new DeleteUserService()

    const result = await deleteUserService.deleteUser({ id: mockUser.id })
    expect(result).toHaveLength(0)
  })
})