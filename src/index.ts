/* eslint-disable @typescript-eslint/no-var-requires */
import { Server } from './server'
import { PORT } from './helpers/env'

export const server = new Server(PORT)

server.start()
