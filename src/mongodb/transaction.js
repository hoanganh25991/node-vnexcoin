import m from "mongoose"
import { debugEnhance } from "../utils/index"
import { DONE_TRANSFER_TO_SELLER } from "./models/transaction"

const _ = console.log

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

export const store = debugEnhance(tranInfo => {
  const scope = "transaction.store"
  if (!tranInfo) {
    _(`[${scope}] No tranInfo to save`)
    return null
  }
  const Model = getModel()
  const { buyerNumber, sellerNumber } = tranInfo
  const modelWait = Model.findOne({ buyerNumber, sellerNumber, status: { $ne: DONE_TRANSFER_TO_SELLER } })
  const saveWait = modelWait
    .then(existTran => {
      const curr = (existTran && existTran.amount) || 0
      const addUp = tranInfo.amount
      const amount = curr + addUp
      const transaction = existTran || new Model(tranInfo)
      transaction.amount = amount
      return transaction.save()
    })
    .catch(err => err && _(`[${scope}][ERR] Fail to find`, err))
  return saveWait.catch(err => err && _(`[${scope}][ERR] Fail to update`, err))
}, "transaction.store")
