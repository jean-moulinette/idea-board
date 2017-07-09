const { PUBLIC_PATH } = require('src/utils/constants')

/**
 * @param {String} fileName a file under public's repository
 * @returns {void}
 */
exports.sendView = function(fileName) {
  return (response) => {
    response.sendFile(fileName, {
      root: PUBLIC_PATH,
    })
  }
}
