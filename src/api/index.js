export { apiMiddleware } from "./apiMiddleware"
export { errMiddleWare } from "./errMiddleware"
export { injectReqUri } from "./injectUri"

export const SMS_MSG = "SMS_MSG"

const _ = console.log

export const checkRequiredKey = reqBody => {
  const { msg, senderNumber, IMEI } = reqBody
  const validated = msg && senderNumber
  const errMsg = validated ? undefined : "Please submit required keys: msg, senderNumber, IMEI"
  return { validated, errMsg }
}

/**
 * Main api handle
 * @param reqBody
 * @returns {Promise.<{resData: {}, statusCode: number}>}
 * @private
 */
export const api = async reqBody => {
  const { type } = reqBody
  let resData = {}
  let statusCode = 200

  switch (type) {
    case SMS_MSG: {
      const { msg, senderNumber, IMEI } = reqBody
      resData = { received: true }
      break
    }
    default: {
      statusCode = 422
      resData = { msg: "UNKNOWN_CASE", data: { reqBody: reqBody } }
      break
    }
  }

  return { resData, statusCode }
}
