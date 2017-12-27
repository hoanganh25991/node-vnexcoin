import mongoose from "mongoose"

const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  sessionId: {
    type: String,
    index: true,
  },
  answers: []
})

mongoose.model("Answer", AnswerSchema, "answers")
