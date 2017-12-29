import { Schema, model } from "mongoose"

const SmsSchema = new Schema({
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

model("Sms", SmsSchema, "smses")
