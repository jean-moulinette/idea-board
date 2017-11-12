const SUPER_USER_LOGIN = 'superuser'
const TEST_USER_LOGIN = 'testuser'

const USERS = [
  { name: SUPER_USER_LOGIN },
]

const TEST_USERS = [
  { name: TEST_USER_LOGIN },
]

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

exports.SUPER_USER_LOGIN = SUPER_USER_LOGIN
exports.TEST_USER_LOGIN = TEST_USER_LOGIN
exports.TEST_USERS = TEST_USERS
exports.USERS = USERS
exports.BOARDS_SAMPLE = BOARDS_SAMPLE
exports.IDEAS_SAMPLE = IDEAS_SAMPLE
