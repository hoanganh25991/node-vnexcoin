import { tinyToken, decodeToken } from "../token/index"

const _ = console.log

export const REGISTER = "REGISTER"
export const RETRIEVE_CAMPAIGN_PRIZES = "RETRIEVE_CAMPAIGN_PRIZES"
export const CHECK_EMAIL_ELIGIBILITY = "CHECK_EMAIL_ELIGIBILITY"
export const DRAW_PRIZE = "DRAW_PRIZE"
export const SEND_EMAIL = "SEND_EMAIL"

export const noTokenErrRes = reqbody => ({ statusCode: 422, resData: { msg: "Please submit token.", reqbody } })
export const decodeTokenErrRes = err => ({ statusCode: 422, resData: { msg: "Fail to decode token.", err } })

export const _api = async reqBody => {
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

export const api = async reqBody => {
  try {
    return await _api(reqBody)
  } catch (err) {
    _(err)
    return { statusCode: 422, resData: { err } }
  }
}

export const shouldObmitToken = type => {
  return type === REGISTER || type === RETRIEVE_CAMPAIGN_PRIZES || type === SEND_EMAIL
}

/**
 * Parse token & inject in req's body
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
export const apiMiddleware = async (req, res, next) => {
  const { type, token } = req.body
  const obmitToken = shouldObmitToken(type)
  if (obmitToken) return next()

  const reqBody = req.body
  if (!token) {
    const { statusCode, resData } = noTokenErrRes(reqBody)
    res.status(statusCode)
    res.json(resData)
    return
  }

  const { data, err } = await decodeToken(token)
  if (err) {
    const { statusCode, resData } = decodeTokenErrRes(err)
    res.status(statusCode)
    res.json(resData)
    return
  }

  const { code, email } = data
  req.body.code = code
  req.body.email = email
  return next()
}

/**
 * Handle ERR
 * @warn PLease dont remove "next" in callback
 * express count argv's length
 * to provide req or res or next
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const errMiddleWare = (err, req, res, next) => {
  _(err)
  res.status(err.status || 500)
  res.send("ERR")
}

export const injectReqUri = (req, res, next) => {
  process.reqRoot = req.protocol + "://" + req.get("host")
  next()
}
