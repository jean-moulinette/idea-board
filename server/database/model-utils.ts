import { Collection } from 'mongodb';

type CreateIndexParams = {
  collection: Collection
  name: string
  field: string, 
};

export const createUniqueDocumentIndex = ({
  collection,
  name,
  field,
}: CreateIndexParams) => collection.createIndex(name, { [field]: 1, unique: true });
