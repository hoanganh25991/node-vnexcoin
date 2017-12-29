import fs from "fs"
import path from "path"
import mongoose from "mongoose"

const _ = console.log
let connection = null

export const connect = dbName => {
  mongoose.Promise = global.Promise
  if (connection) return connection
  connection = mongoose.connect(`mongodb://127.0.0.1/${dbName}`, { useMongoClient: true })
  return connection
}

export const loadModels = () => {
  const dir = path.join(__dirname, "models")
  const files = fs.readdirSync(dir)
  files.forEach(file => require(path.join(__dirname, "models", file)))
}

export const closeConnection = () => {
  if (!connection) return
  connection
    .close()
    .then(() => _("Mongo connection closed."))
    .catch(() => _("Fail to close mongo connection."))
}

export default connect
