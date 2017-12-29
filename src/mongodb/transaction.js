import m from "mongoose"
import { debugEnhance } from "../utils/index"
import { DONE_TRANSFER_TO_SELLER } from "./models/transaction"
import moment from "moment"

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
  const now = +moment().format("X")
  const createdAt = now
  const updatedAt = now
  const { buyerNumber, sellerNumber } = smsInfo
  return Model.findOneAndUpdate(
    { buyerNumber, sellerNumber, status: { $ne: DONE_TRANSFER_TO_SELLER } },
    { ...smsInfo, updatedAt, $setOnInsert: { createdAt } },
    { upsert: true, new: true }
  )
    .exec()
    .catch(err => err)
}, "transaction.store")
