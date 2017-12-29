import { model } from "mongoose"
import { debugEnhance } from "../utils/index"
import moment from "moment"

export const DEFAULT_HISTORY_QUERY_TIME = 1800 // 30 minutes
export const DEFAULT_HISTORY_LIMIT = 20 // 30 minutes

export const getAll = () => {
  const Sms = model("Sms")
  return Sms.find({})
    .exec()
    .catch(err => err)
}

export const storeSms = debugEnhance(smsInfo => {
  const Sms = model("Sms")
  const { senderNumber, receiverNumber, timestamp } = smsInfo
  return Sms.update({ senderNumber, receiverNumber, timestamp }, smsInfo, { upsert: true, new: true })
    .exec()
    .catch(err => err)
}, "storeSms")

export const getSmsHistory = debugEnhance(queryInfo => {
  const Sms = model("Sms")
  const { senderNumber, queryTime = DEFAULT_HISTORY_QUERY_TIME, queryLimit = DEFAULT_HISTORY_LIMIT } = queryInfo
  const queryTimestamp = +moment()
    .subtract(queryTime, "seconds")
    .format("X")
  return Sms.find({ senderNumber, timestamp: { $lt: queryTimestamp } })
    .limit(queryLimit)
    .exec()
    .catch(err => err)
})
