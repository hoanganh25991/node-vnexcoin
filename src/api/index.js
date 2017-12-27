export { apiMiddleware } from "./apiMiddleware"
export { errMiddleWare } from "./errMiddleware"
export { injectReqUri } from "./injectUri"

export const REGISTER = "REGISTER"
export const RETRIEVE_CAMPAIGN_PRIZES = "RETRIEVE_CAMPAIGN_PRIZES"
export const CHECK_EMAIL_ELIGIBILITY = "CHECK_EMAIL_ELIGIBILITY"
export const DRAW_PRIZE = "DRAW_PRIZE"
export const SEND_EMAIL = "SEND_EMAIL"

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
    case REGISTER: {
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
