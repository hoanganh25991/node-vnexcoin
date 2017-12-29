import m from "mongoose"
import { debugEnhance } from "../utils/index"
import moment from "moment"

export const DEFAULT_HISTORY_QUERY_TIME = 86400 // 1 days
export const DEFAULT_HISTORY_LIMIT = 20 // 30 minutes

export const getModel = modelName => {
  modelName = modelName || "Sms"
  return m.model(modelName)
}

export const getAll = debugEnhance(() => {
  const Model = getModel()
  return Model.find({})
    .exec()
    .catch(err => err)
}, "sms.getAll")

export const store = debugEnhance(smsInfo => {
  const Model = getModel()
  const model = new Model({ ...smsInfo })
  return model.save().catch(err => err)
}, "sms.store")

export const getHistory = debugEnhance(queryInfo => {
  const Model = getModel()
  const { senderNumber, queryTime = DEFAULT_HISTORY_QUERY_TIME, queryLimit = DEFAULT_HISTORY_LIMIT } = queryInfo
  const queryTimestamp = +moment()
    .subtract(queryTime, "seconds")
    .format("X")
  return Model.find({ senderNumber, createdAt: { $lt: queryTimestamp } })
    .limit(queryLimit)
    .exec()
    .catch(err => err)
}, "sms.getHistory")
