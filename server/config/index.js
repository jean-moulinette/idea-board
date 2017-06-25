const fs = require('fs')

exports.getConfig = async () => {
  const configLines = await readConfigFile()
  return createConfigObject(configLines)
}

function readConfigFile() {
  const configFilePath = `${__dirname}/../.config`

  return new Promise((resolve, reject) => {
    fs.readFile(configFilePath, 'utf-8', (err, configFile) => {
      if (err) {
        reject('Unable to read server ".config" file')
      }

      resolve(configFile)
    })
  })
}

function createConfigObject(configLines) {
  const configObject = {}

  configLines.split('\n').forEach((configLine) => {
    if (configLine[0] !== '#') {
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
