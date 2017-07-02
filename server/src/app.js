const { bootstrapServer } = require('src/bootstrap/server')
const { getConfig } = require('utils/config')

getConfig().then((config) => {
  process.config = config
  bootstrapServer()
})

