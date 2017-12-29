import fs from "fs"
import path from "path"
import mongoose from "mongoose"

export const connect = dbName => {
  mongoose.Promise = global.Promise
  return mongoose.connect(`mongodb://127.0.0.1/${dbName}`, { useMongoClient: true })
}

export const loadModels = () => {
  const dir = path.join(__dirname, "models")
  const files = fs.readdirSync(dir)
  files.forEach(file => require(path.join(__dirname, "models", file)))
}

export default connect
