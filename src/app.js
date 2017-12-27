import cors from "cors"
import path from "path"
import helmet from "helmet"
import logger from "morgan"
import express from "express"
import favicon from "serve-favicon"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { apiRoute } from "./routers/api"
import { welcomeRoute } from "./routers/welcome"
import { cronCleanUp as cronCleanToken } from "./token/index"
import { errMiddleWare, apiMiddleware, injectReqUri } from "./api/index"

const _ = console.log
const app = express()

app.use(cors())
app.use(helmet())
app.use(logger("dev"))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(favicon(path.join(__dirname, "public", "favicon.ico")))

// Welcome page to inform server is running
app.use("/welcome", welcomeRoute)

// Router
app.use("/api", injectReqUri)
app.use("/api", errMiddleWare)
app.use("/api", apiMiddleware)
app.use("/api", apiRoute)

// Cron
cronCleanToken()

module.exports = app
