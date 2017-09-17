const {
  buildDatabaseConn,
  getDatabaseSession,
} = require('./database-utils')

function databaseFactory() {
  const core = {
    db: null,
    conn: null,
  }

  const findCollection = async (name) => {
    const collection = await core.db.collection(name)
    return collection
  }

  return {
    connected: false,

    async connect() {
      core.conn = buildDatabaseConn()
      try {
        core.db = await getDatabaseSession(core.conn)
      } catch (e) {
        console.log(`\nCould not connect to database: ${core.conn}`)
        console.log(e.message)
      }

      this.connected = true
    },

    async findIn(collectionName, query) {
      const collection = await findCollection(collectionName)
      const cursor = await collection.find(query)

      try {
        return await cursor.toArray()
      } catch (e) {
        return null
      }
    },

    async findOneIn(collectionName, query) {
      const collection = await findCollection(collectionName)
      const result = await collection.findOne(query)
      return result
    },
  }
}

module.exports.Database = databaseFactory()
