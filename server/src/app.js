const { bootstrapServer } = require('src/bootstrap/server')
const { getConfig } = require('utils/config')

async function main() {
  global.config = await getConfig()
  bootstrapServer()
}

main()
