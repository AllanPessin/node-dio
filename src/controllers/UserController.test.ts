import createConnection from "../database";
import { UserController } from "./UsersControler"
import { Request } from "express";
import { makeMockResponse } from "../utils/mocks/mockReponse";

describe("UserController", () => {
  it('Deve ser retornado o id do usuairo criado', async () => {
    const connection = await createConnection()
    await connection.runMigrations()

    const userController = new UserController()
    const request = {
      body: {
        name: "Usuario",
        email: "allan@email.com"
      }
    } as Request
    
    const response = makeMockResponse()

    const result =  await userController.createUser(request, response)
  })
})