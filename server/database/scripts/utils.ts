import { MongoClient, IndexOptions } from 'mongodb'

export function getDatabaseHost() {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
  } = process.env

  return `${DATABASE_HOST}:${DATABASE_PORT}`
}

export function getDatabaseURI(databaseName: string) {
  const { DATABASE_HOST, DATABASE_PORT } = process.env
  return `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${databaseName}`
}

type ConstraintConfig = {
  collection: string
  constraints: Array<{
    options: IndexOptions
    field: string
  }>
}

export async function createConstraints(databaseURI: string, constraintsConfig: ConstraintConfig[]) {
  const db = await MongoClient.connect(databaseURI)

  await constraintsConfig.map(async (constraintConfig) => {
    const { collection, constraints } = constraintConfig
    const dbCollection = await db.collection(collection)

    await constraints.map(async (constraint) => {
      const { options, field } = constraint

      await dbCollection.createIndex(field, options)
      db.close()
    })
  })
}
