import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

let client
let clientPromise

export async function getDb() {
  if (!uri) {
    throw new Error('Missing MONGODB_URI in environment variables.')
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    if (!clientPromise) {
      client = new MongoClient(uri)
      clientPromise = client.connect()
    }
  }

  const connectedClient = await clientPromise
  return connectedClient.db()
}
