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

export const STORE_SCOPE = "transaction.store"
export const store = debugEnhance(info => {
  if (!info) {
    _(`[${STORE_SCOPE}] No tranInfo to save`)
    return null
  }

  const Model = getModel()
  const { buyerNumber, sellerNumber } = info
  const findWait = Model.findOne({ buyerNumber, sellerNumber, status: { $ne: DONE_TRANSFER_TO_SELLER } })
  const saveWait = findWait
    .then(existTran => {
      const curr = (existTran && existTran.amount) || 0
      const addUp = info.amount || 0
      const amount = curr + addUp
      const status = info.status || existTran.status
      const transaction = existTran || new Model(info)
      Object.assign(transaction, { amount, status })
      return transaction.save()
    })
    .catch(err => err && _(`[${STORE_SCOPE}][ERR] Fail to find`, err))
  return saveWait.catch(err => err && _(`[${STORE_SCOPE}][ERR] Fail to update`, err))
}, STORE_SCOPE)

export const FIND_SCOPE = "transaction.find"
export const find = debugEnhance(id => {
  if (!id) {
    _(`[${STORE_SCOPE}] No id to find`)
    return null
  }
  const Model = getModel()
  return Model.findById(id).catch(err => err && _(`[${scope} Fail to find]`))
}, "transaction.find")
