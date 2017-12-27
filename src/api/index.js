export { apiMiddleware } from "./apiMiddleware"
export { errMiddleWare } from "./errMiddleware"
export { injectReqUri } from "./injectUri"

export const TRANSFER_SMS_MSG = "TRANSFER_SMS_MSG"
export const OTP_SMS_MSG = "OTP_SMS_MSG"

const _ = console.log

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
    case TRANSFER_SMS_MSG: {
      const { msg } = reqBody
      resData = { received: true, msg }
      break
    }
    case OTP_SMS_MSG: {
      const { msg } = reqBody
      resData = { received: true, msg }
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
