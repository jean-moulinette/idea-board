import { Db } from 'mongodb';
import * as dotenv from 'dotenv';

import {
  buildDatabaseConn,
  getDatabaseSession,
} from './db-utils';

dotenv.config();

type Core = {
  db: Db
  conn: string,
};

class DbFactory {
  public core: Core;
  public connected: boolean;

  public constructor() {
    this.connected = false;    
    this.connect();
  }
  
  private async connect() {
    const conn = buildDatabaseConn();
    let db;

    try {
      db = await getDatabaseSession(conn);
    } catch (e) {
      console.log(`\nCould not connect to database: ${conn}`);
      console.log(e.message);
      throw e;
    }

    this.core = {
      conn,
      db,
    };

    this.connected = true;
  }
  
  public async findIn(collectionName: string, query: Object) {
    const collection = await this.findCollection(collectionName);
    const cursor = await collection.find(query);
    try {
      return await cursor.toArray();
    } catch (e) {
      return null;
    }
  }

  public async findOneIn(collectionName: string, query: Object) {
    const collection = await this.findCollection(collectionName);
    const result = await collection.findOne(query);
    return result;
  }

  private findCollection = async (name: string) => {
    const collection = await this.core.db.collection(name);
    return collection;
  }
}

export default new DbFactory();
