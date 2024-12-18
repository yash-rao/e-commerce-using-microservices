require('dotenv').config(); // Load .env variables
const { MongoClient } = require('mongodb');

// Debugging logs
console.log('Environment Variables:', process.env);

const connectionString = process.env.MONGO_URI;
const database = process.env.DATABASE;

console.log('Mongo URI:', connectionString); // Should not be undefined
console.log('Database Name:', database);    // Should not be undefined

const client = new MongoClient(connectionString);

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        console.error('Failed to connect to MongoDB:', err);
        return callback(err);
      }

      dbConnection = db.db(database);
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    if (!dbConnection) {
      throw new Error('Database connection not initialized. Call connectToServer first.');
    }
    return dbConnection;
  },
};
