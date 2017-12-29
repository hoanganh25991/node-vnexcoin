import m from "mongoose"
import moment from "moment"

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
    type: Number,
    default: () => +moment().format("X")
  },
  updatedAt: {
    type: Number,
    default: () => +moment().format("X")
  }
})

SmsSchema.pre("save", function(done) {
  this.updatedAt = +moment().format("X")
  done()
})

m.model("Sms", SmsSchema, "smses")
