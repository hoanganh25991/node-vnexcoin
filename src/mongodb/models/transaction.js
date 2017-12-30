import m from "mongoose"
import moment from "moment"
import { transformEnhance } from "../utils"

/**
 * VCB sends msg to inform Buyer transferring deposit
 * Ex: "So du TK VCB 0501000155042 thay doi +20,160,000 VND luc 26-12-2017 14:44:29. So du 1,778,825,206 VND. Ref MBVCB26105397.01256654629 - 0909333143.CT tu 01810..."
 * @type {string}
 */
export const TRANSFERRING_DEPOSIT = "TRANSFERRING_DEPOSIT"

/**
 * Buyer sends msg to inform that he finishes transferring deposit
 * Ex: "CK XONG"
 * @type {string}
 */
export const DONE_DEPOSIT = "DONE_DEPOSIT"

/**
 * Seller sends coin to Buyer, when finish, he asks moeny
 * Ex: "DONE 0421000495557"
 * @type {string}
 */
export const ASK_TRANSFER = "ASK_TRANSFER"

/**
 * Buyer received coin from Seller, he confirms
 * Ex: "DONE"
 * @type {string}
 */
export const RECEIVED_COIN = "RECEIVED_COIN"

/**
 * Now we send "deposit" form Buyer to Seller, the transaction finished here
 * @type {string}
 */
export const TRANSFERRING_TO_SELLER = "TRANSFERRING_TO_SELLER"

/**
 * Self detect when finish transfer "deposit" to Seller
 * @type {string}
 */
export const DONE_TRANSFER_TO_SELLER = "DONE_TRANSFER_TO_SELLER"

export const TransactionSchema = new m.Schema({
  buyerNumber: {
    type: String
  },
  sellerNumber: {
    type: String
  },
  amount: {
    type: Number
  },
  status: {
    type: String
  },
  uniqueId: {
    type: String
  },
  createdAt: {
    type: Number,
    default: () => +moment().format("X")
  },
  updatedAt: {
    type: Number,
    default: () => +moment().format("X")
  }
})

TransactionSchema.pre("save", function(done) {
  this.updatedAt = +moment().format("X")
  done()
})

transformEnhance(TransactionSchema)
m.model("Transaction", TransactionSchema, "transactions")
