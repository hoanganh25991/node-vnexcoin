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
  if (!tranInfo) {
    _("[transaction.store] No tranInfo to save")
    return null
  }
  const Model = getModel()
  const { buyerNumber, sellerNumber } = tranInfo
  const modelWait = Model.findOne({ buyerNumber, sellerNumber, status: { $ne: DONE_TRANSFER_TO_SELLER } })
  const saveWait = modelWait.then(transaction => {
    const curr = (transaction && transaction.amount) || 0
    transaction = transaction || tranInfo
    const { amount: addUp } = transaction
    const amount = curr + addUp
    const updatedTransaction = { ...transaction, amount }
    const model = new Model(updatedTransaction)
    return model.save()
  })
  return saveWait.catch(err => err)
}, "transaction.store")
