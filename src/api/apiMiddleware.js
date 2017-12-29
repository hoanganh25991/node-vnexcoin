import { tinyToken, decodeToken } from "../token/index"
import { SMS_MSG } from "./index"

/**
 * Parse token & inject in req's body
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
export const apiMiddleware = async (req, res, next) => {
  const { type, payloadToken } = req.body
  const checkCase = type === SMS_MSG
  if (!checkCase) return next()
  if (payloadToken) return next()
  res.status(422)
  res.json({ msg: "Please submit required key: payloadToken", reqBody: req.body })
}
