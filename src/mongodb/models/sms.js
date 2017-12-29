import m from "mongoose"

const SmsSchema = new m.Schema({
  senderNumber: {
    type: String
  },
  receiverNumber: {
    type: String
  },
  timestamp: {
    type: Number
  },
  msg: {
    type: String
  },
  IMEI: {
    type: String
  }
})

m.model("Sms", SmsSchema, "smses")
