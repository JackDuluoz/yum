const { MongoClient } = require('mongodb');

let dbConnection
let uri = process.env.ATLAS_URI

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db()
        return cb()
      })
      .catch((error) => {
        console.log(error)
        return cb(error)
      })
  },
  getDb: () => dbConnection
};