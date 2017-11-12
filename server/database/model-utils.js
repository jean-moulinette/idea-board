exports.createUniqueDocumentIndex = ({
  collection,
  name,
  field,
}) => collection.createIndex(name, { [field]: 1 }, { unique: true })
