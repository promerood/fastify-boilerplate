import { FastifyInstance } from 'fastify'
import userController from './controller/userController'

export class Routes {
  private fastify: FastifyInstance

  constructor(private fastifyIntance: FastifyInstance) {
    this.fastify = fastifyIntance
    this.api()
  }

  private api() {
    this.fastify.get('/', function (_req: any, _res: any) {
      _res.send('Up!')
    })

    this.fastify.register(userController, { prefix: '/api/user' })
  }
}
