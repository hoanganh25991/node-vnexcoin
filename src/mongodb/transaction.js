import m from "mongoose"
import { debugEnhance } from "../utils/index"

export const getModel = modelName => {
  modelName = modelName || "Transaction"
  return m.model(modelName)
}

export const getAll = debugEnhance(() => {
  const Model = getModel()
  return Model.find({})
    .exec()
    .catch(err => err)
}, "transaction.getAll")

export const store = debugEnhance(smsInfo => {
  const Model = getModel()
  const { senderNumber, receiverNumber, timestamp } = smsInfo
  return Model.update({ senderNumber, receiverNumber, timestamp }, smsInfo, { upsert: true, new: true })
    .exec()
    .catch(err => err)
}, "transaction.store")
