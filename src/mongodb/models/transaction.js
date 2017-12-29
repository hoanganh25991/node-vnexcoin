import m from "mongoose"

const TransactionSchema = new m.Schema({
  buyerNumber: {
    type: String
  },
  sellerNumber: {
    type: String
  },
  timestamp: {
    type: Number
  },
  amount: {
    type: Number
  },
  status: {
    type: String
  },
  uniqueId: {
    type: String
  }
})

m.model("Transaction", TransactionSchema, "transactions")
