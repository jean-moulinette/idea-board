const BOARDS_COLLECTION = 'boards'
const USERS_COLLECTION = 'users'

exports.BOARDS_COLLECTION = BOARDS_COLLECTION
exports.USERS_COLLECTION = USERS_COLLECTION

exports.REPOSITORIES_COLLECTIONS = [
  {
    name: BOARDS_COLLECTION,
  },
  {
    name: USERS_COLLECTION,
    constraints: [
      { name: 'userNameUnique', field: 'name' },
    ],
  },
]
