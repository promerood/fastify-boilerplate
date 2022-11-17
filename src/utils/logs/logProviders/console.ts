/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
const initialize = (): void => {
  //do nothing
}

const hook = (): void => {
  //do nothing
}

const logMessage = (message: any): void => {
  console.info(message)
}

const logError = (error: any): void => {
  console.error(error)
}

// module.exports = { initialize, logMessage, logError, hook }
export default { initialize, logMessage, logError, hook }
