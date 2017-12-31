import { initApp, VNEXCOIN_TOPIC } from "./init"
import dotenv from "dotenv"

const fbApp = initApp("fbApp")
dotenv.config()
const { FIREBASE_BRANCH: mainBranch } = process.env
const _ = console.log

const FIREBASE_UPDATE_BRANCH_SCOPE = "updateBranchX"

/**
 * Directly save val to data branch
 * Force override existed data
 * This is the simple version of PUSH NOTIFICATION on web
 * @param mainBranch
 * @param dataBranch
 * @param val
 */
export const updateBranchX = ({ mainBranch, dataBranch, val }) => {
  const scope = FIREBASE_UPDATE_BRANCH_SCOPE
  const saveWait = db.ref(`${mainBranch}/${dataBranch}`).set(val)
  return saveWait
    .then(() => {
      _(`[${scope}] ${dataBranch} saved`)
      return true
    })
    .catch(err => {
      _(`[${scope}] Fail to save to ${dataBranch}`, err)
      return null
    })
}

/**
 * Simple push to web through firebase
 * @param dataBranch
 * @param payload
 */
export const pushToWeb = ({ topic: dataBranch = VNEXCOIN_TOPIC, payload }) => {
  const val = JSON.stringify(payload)
  return updateBranchX({ mainBranch, dataBranch, val })
}
