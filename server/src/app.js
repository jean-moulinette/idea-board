const { bootstrapServer } = require('src/bootstrap/server')
const { getConfig } = require('config')

getConfig().then((config) => {
  process.config = config
  bootstrapServer()
})

