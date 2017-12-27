import { tinyToken, decodeToken } from "../token/index"
import { REGISTER, RETRIEVE_CAMPAIGN_PRIZES, SEND_EMAIL } from "./index"

export const noTokenErrRes = reqbody => ({ statusCode: 422, resData: { msg: "Please submit token.", reqbody } })
export const decodeTokenErrRes = err => ({ statusCode: 422, resData: { msg: "Fail to decode token.", err } })

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
