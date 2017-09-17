const TEST_USER = {
  login: 'testuser',
}

const USER = {
  login: 'superuser',
}

const IDEAS_SAMPLE = [
  generateIdea(),
  generateIdea(),
  generateIdea(),
  generateIdea(),
  generateIdea(),
]

const BOARDS_SAMPLE = [
  {
    name: 'My first board',
    ideas: IDEAS_SAMPLE,
  },
]

function generateIdea() {
  return {
    text: 'Hello my friend',
    creationDate: new Date().toISOString(),
  }
}

exports.TEST_USER = TEST_USER
exports.USER = USER
exports.BOARDS_SAMPLE = BOARDS_SAMPLE
exports.IDEAS_SAMPLE = IDEAS_SAMPLE
