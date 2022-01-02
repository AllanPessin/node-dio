import { Request, Response, Router } from "express";
import { UserController } from "./controllers/UsersControler";

const router = Router()

const userController = new UserController()

router.get('/', (request: Request, response: Response) => {
  return response.json({
    message: 'DIO nodejs'
  })
})

router.post('/users', userController.createUser)
router.get('/users', userController.getAllUser)

export { router }