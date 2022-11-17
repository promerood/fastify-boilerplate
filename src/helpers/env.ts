import dotenv from 'dotenv'
dotenv.config()

const WHITELIST = process.env.WHITELIST
const BRANCH_NAME = process.env.BRANCH_NAME || 'local'
const portString = process.env.PORT
const PORT = portString && typeof portString === 'string' ? parseInt(portString, 10) : 8080

export { WHITELIST, PORT, BRANCH_NAME }
