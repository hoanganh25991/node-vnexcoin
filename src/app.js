import cors from "cors"
import path from "path"
import helmet from "helmet"
import logger from "morgan"
import dotenv from "dotenv"
import express from "express"
import favicon from "serve-favicon"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { apiRoute } from "./routers/api"
import { welcomeRoute } from "./routers/welcome"
import { connect, loadModels } from "./mongodb/connect"
import { cronCleanUp as cronCleanToken } from "./token/index"
import { errMiddleWare, apiMiddleware, injectReqUri } from "./api/index"

// Common use
dotenv.config()
const { MONGO_DB_NAME: dbName } = process.env
const _ = console.log

// Init app
const app = express()

// Connect Mongo
connect(dbName)
loadModels()

// Common middleware
app.use(cors())
app.use(helmet())
app.use(logger("dev"))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(favicon(path.join(__dirname, "public", "favicon.ico")))

// Welcome page
app.use("/welcome", welcomeRoute)

// Api route
app.use("/api", injectReqUri)
app.use("/api", errMiddleWare)
app.use("/api", apiMiddleware)
app.use("/api", apiRoute)

// Cron token
cronCleanToken()

module.exports = app
