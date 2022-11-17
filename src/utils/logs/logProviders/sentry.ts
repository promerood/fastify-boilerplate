/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv'
import * as Sentry from '@sentry/node'

dotenv.config()

/**
 * Call this at the start of your application
 */
const initialize = (): void => {
  try {
    const SENTRY_DSN = process.env.SENTRY_DSN
    if (SENTRY_DSN) {
      Sentry.init({
        dsn: SENTRY_DSN,
        debug: false,
        release: process.env.BRANCH_NAME || 'local',
        environment: (process.env.BRANCH_NAME || 'local').toLowerCase(),
      })
    } else {
      console.log('SENTRY_DSN was not provided...')
    }
  } catch (e: any) {
    console.log(`Error logging Sentry: ${e.toString()}`)
  }
}

/**
 * Generic method where you can pass anything in
 * @param {*} config { name:string, settings: object }
 */
const hook = (config: any): void => {
  try {
    const app = config.settings.app
    app.use(Sentry.Handlers.errorHandler())
  } catch (e: any) {
    console.log(`Error logging Sentry: ${e.toString()}`)
  }
}

/**
 * Log generic messages here
 * @param {*} message
 */
const logMessage = (message: any) => {
  try {
    Sentry.captureMessage(message)
  } catch (e: any) {
    console.log(`Error logging Sentry: ${e.toString()}`)
  }
}

/**
 * Log generic messages here
 * @param {*} message string || Error
 */
const logError = (error: string | Error) => {
  try {
    if (typeof error === 'string') {
      Sentry.captureException(new Error(error))
      return
    }
    Sentry.captureException(error)
  } catch (e: any) {
    console.log(`Error logging Sentry: ${e.toString()}`)
  }
}

// module.exports = { initialize, logMessage, logError, hook }
export default { initialize, logMessage, logError, hook }
