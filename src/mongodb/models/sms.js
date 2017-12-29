import m from "mongoose"

const SmsSchema = new m.Schema({
  senderNumber: {
    type: String
  },
  receiverNumber: {
    type: String
  },
  msg: {
    type: String
  },
  IMEI: {
    type: String
  },
  createdAt: {
    type: Number
  },
  updatedAt: {
    type: Number
  }
})

m.model("Sms", SmsSchema, "smses")
