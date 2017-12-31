import m from "mongoose"
import { debugEnhance } from "../utils/index"
import { DONE_TRANSFER_TO_SELLER } from "./models/transaction"

export const STORE_SCOPE = "store"
export const FIND_SCOPE = "find"

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

/**
 * Update transaction info
 * Unique indentify by
 * 1. buyerNumber
 * 2. sellerNumber
 * 3. status (not DONE)
 * @param info
 * @return Object<Transaction>|null
 */
export const store = debugEnhance(info => {
  const scope = STORE_SCOPE

  if (!info) {
    _(`[${scope}] No tranInfo to save`)
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
    .catch(err => {
      _(`[${scope}][ERR] Fail to find`, err)
      return null
    })

  return saveWait.catch(err => {
    _(`[${scope}][ERR] Fail to save`, err)
    return null
  })
}, STORE_SCOPE)

/**
 * Find transaction by ObjectId
 * @param id
 * @return Object<Transaction>|null
 */
export const find = debugEnhance(id => {
  const scope = FIND_SCOPE

  if (!id) {
    _(`[${scope}] No id to find`)
    return null
  }
  const Model = getModel()
  return Model.findById(id).catch(err => {
    _(`[${scope} Fail to find]`, err)
    return null
  })
}, FIND_SCOPE)
