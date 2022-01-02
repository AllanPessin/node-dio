import createConnection from "../database";
import { UserController } from "./UsersControler"
import { Request } from "express";
import { makeMockResponse } from "../utils/mocks/mockResponse";
import { getConnection } from "typeorm";
import { FakeData } from "../utils/mocks/fakeData/FakeData";
import { makeMockRequest } from "../utils/mocks/mockRequest";


describe("User Controller create", () => {

  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE from users')
    await connection.close()
  })

  const userController = new UserController()
  const response = makeMockResponse()

  it('Deve ser retornado status 200 quando o usuário for criado', async () => {
    const request = {
      body: {
        name: "Usuario",
        email: "usuario@email.com"
      }
    } as Request

    await userController.createUser(request, response)

    expect(response.state.status).toBe(200)
  })

  it('Deve retornar status 400 quando nome não for informado', async () => {
    const request = {
      body: {
        name: "",
        email: "usuario@email.com"
      }
    } as Request

    await userController.createUser(request, response)

    expect(response.state.status).toBe(400)
  })

  it('Deve retornar status 400 quando email não for informado', async () => {
    const request = {
      body: {
        name: "Usuario",
        email: ""
      }
    } as Request

    await userController.createUser(request, response)

    expect(response.state.status).toBe(400)
  })
})

describe('Get all user function', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE from users')
    await connection.close()
  })

  const fakeData = new FakeData()

  it('Deve retornar statu 200 quando retornar todos os usuarios', async () => {
    await fakeData.execute()

    const userController = new UserController()
    const request = makeMockRequest({})
    const response = makeMockResponse()

    await userController.getAllUser(request, response)

    expect(response.state.status).toBe(200)

  })
})

describe('Update user function', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.query('DELETE from users')
    await connection.close()
  })

  const fakeData = new FakeData()

  it('Deve retornar status 204 quando usuário for editado', async () => {
    const userController = new UserController()
    const mockUser = await fakeData.createuser()
    const request = {
      body: {
        id: mockUser.id,
        name: 'Outro usuário',
        email: "email@email.com"
      }
    } as Request
    const response = makeMockResponse()

    await userController.updateUser(request, response)

    expect(response.state.status).toBe(204)
  })
})

describe('Delete user function', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.close()
  })

  const fakeData = new FakeData()

  it('Deve retornar status 204 quando usuário for deletado', async () => {
    const deletUser = new UserController()
    const mockUser = await fakeData.createuser()
    const request = makeMockRequest({
      params: {
        id: mockUser.id
      }
    })
    const response = makeMockResponse()
    
    await deletUser.deleteUser(request, response)
    expect(response.state.status).toBe(204)
  })
})