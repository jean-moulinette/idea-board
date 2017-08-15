const fs = require('fs')

exports.config = getConfig()

function getConfig() {
  const configLines = readConfigFile()
  return createConfigObject(configLines)
}

function readConfigFile() {
  const configFilePath = `${__dirname}/../../.config`

  return fs.readFileSync(configFilePath, 'utf-8')
}

function createConfigObject(configLines) {
  const configObject = {}

  configLines.split('\n').forEach((configLine) => {
    if (configLine.length > 0 && configLine[0] !== '#') {
      const { key, value } = parseLine(configLine)
      configObject[key] = value
    }
  })

  return configObject
}

function parseLine(line) {
  const index = line.indexOf('=')
  const key = line.substr(0, index)
  const value = line.substr(index + 1, line.length)

  return {
    key,
    value,
  }
}
