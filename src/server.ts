/* eslint-disable @typescript-eslint/no-var-requires */
import Fastify, { FastifyInstance } from 'fastify'
import { BRANCH_NAME, WHITELIST } from './helpers/env'
import fastifyCors from 'fastify-cors'
import logProviders from './utils/logs/logProviders'
import log from 'pino'
import { Routes } from './routes'
enum EBRANCH_NAME {
  LOCAL = 'local',
  DEV = 'develop',
  UAT = 'uat',
  STAGING = 'staging',
  MASTER = 'master',
  PREVIEW = 'preview',
}

const IS_LOCAL = BRANCH_NAME === EBRANCH_NAME.LOCAL

export class Server {
  private fastify: FastifyInstance
  private port: number

  constructor(port: number) {
    this.fastify = Fastify({
      logger: log({
        level: IS_LOCAL ? 'info' : 'error',
        prettyPrint: {
          levelFirst: IS_LOCAL,
          suppressFlushSyncWarning: IS_LOCAL,
          ignore: 'hostname,reqId',
          singleLine: true,
          crlf: true,
          colorize: true,
        },
      }),
    })
    logProviders.initialize()
    this.port = port
    this.config()
    new Routes(this.fastify)
  }

  public start = async () => {
    try {
      await this.fastify.listen(this.port, '0.0.0.0')
    } catch (err) {
      this.fastify.log.error(err)
      process.exit(1)
    }
  }

  private config() {
    //CORS
    this.fastify.register(fastifyCors, function () {
      return (req: any, callback: any) => {
        let corsOptions
        const origin = req.headers.origin
        let whitelist: any[] = ['*']
        if (WHITELIST) {
          try {
            const arrayParams = WHITELIST.split(',')
            whitelist = [...whitelist, ...arrayParams]
          } catch (e) {
            if (typeof WHITELIST === 'string') {
              whitelist.push(WHITELIST)
            }
          }
        }
        const isAllowed: boolean = whitelist.indexOf(origin) !== -1

        // do not include CORS headers for requests from localhost
        if (isAllowed) {
          callback(new Error('Not allowed by CORS'))
        } else {
          corsOptions = { origin: true, methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE' }
          callback(null, corsOptions) // callback expects two parameters: error and options
        }
      }
    })

    //SWAGGER
    this.fastify.register(require('fastify-swagger'), {
      swagger: {
        info: {
          title: 'MS-API',
          description: 'MS-API description API to test',
          version: '0.0.1',
        },
        url: 'https://swagger.io',
        description: 'Find more info here',
        // host: String,
        // schemes: [String],
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        // tags: [Object],
        // securityDefinitions: Object,
      },
      exposeRoute: true, //BRANCH_NAME !== EBRANCH_NAME.MASTER,
      routePrefix: '/docs',
    })

    //SENTRY
    this.fastify.addHook('onError', (_request, _reply, error, done) => {
      // Only send Sentry errors when not in development
      logProviders.logError(error)
      done()
    })
  }
}
