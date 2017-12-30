import dotenv from "dotenv"
import * as admin from "firebase-admin"

dotenv.config()
const { GOOGLE_SERVICE_ACCOUNT: serviceAccStr, FIREBASE_DATABASE_NAME: databaseURL } = process.env
const serviceAccount = JSON.parse(serviceAccStr)
const credential = admin.credential.cert(serviceAccount)

export const app = admin.initializeApp({ databaseURL, credential }, "tinyFCM")
export const VNEXCOIN_TOPIC = "vnexcoin"
