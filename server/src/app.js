require('dotenv').config()
const { ideaBoard } = require('src/bootstrap/server')

function main() {
  ideaBoard.startServer()
}

main()
