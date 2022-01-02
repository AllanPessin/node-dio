import createConnection from "../database";
import { UserController } from "./UsersControler"
import { Request } from "express";
import { makeMockResponse } from "../utils/mocks/mockReponse";
import { getConnection } from "typeorm";

describe("UserController", () => {

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
        email: "allan@email.com"
      }
    } as Request

    await userController.createUser(request, response)

    expect(response.state.status).toBe(200)
  })

  it('Deve retornar status 400 quando nome não for informado', async () => {
    const request = {
      body: {
        name: "",
        email: "allan@email.com"
      }
    } as Request

    await userController.createUser(request, response)

    expect(response.state.status).toBe(400)
  })

  it('Deve retornar status 400 quando email não for informado', async () => {
    const request = {
      body: {
        name: "Allan",
        email: ""
      }
    } as Request

    await userController.createUser(request, response)

    expect(response.state.status).toBe(400)
  })
})