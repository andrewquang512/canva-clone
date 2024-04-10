import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

// Learn: In Express.js/Nest.js Application, we only need to connect to DB once because the it is usually the backend server - run 24/7
// Learn: In Next.js, connect to database on every request/ server action because Next.js run in a serverless environment - start up to handle request and shut down -> good for scalability and reliability, no need to manage persistent connections
// Learn: In aware that there will be chance that many connections on every action on the server side -> caching connection needed

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

// Learn: this is a good approach for both serverless and traditional server to cache connection for connection
// Learn: Note that these are some disadvantages such as lead to issues such as timeouts, database server-side connection limits reached, overhead of Connection Pooling
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'canva_clone',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
