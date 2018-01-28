import * as dotenv from 'dotenv'
import App from 'src/bootstrap/server'

dotenv.config()

process.on('unhandledRejection', (_, rejectedPromise) => {
  const errorMsg = 'Promise rejection catched in server\'s testing process'
  console.log(`\n${errorMsg}\n Promise: `, rejectedPromise)
})

before(async () => {
  // eslint-disable-next-line no-undef
  App.startServer()
})

after(async () => {
  App.stopServer()
})
