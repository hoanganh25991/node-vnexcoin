import path from "path"
import helmet from "helmet"
import logger from "morgan"
import express from "express"
import favicon from "serve-favicon"
import bodyParser from "body-parser"
import { apiRoute } from "./routers/api"
import { welcomeRoute } from "./routers/welcome"
import cookieParser from "cookie-parser"
import { cronCleanUp as cronCleanToken } from "./token/index"
import { errMiddleWare, apiMiddleware, injectReqUri } from "./api/index"
import cors from "cors"

const app = express()
const _ = console.log

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

// Cron
cronCleanToken()

// Router
app.use(injectReqUri)
app.use(errMiddleWare)
app.use("/api", apiMiddleware)
app.use("/api", apiRoute)

module.exports = app
