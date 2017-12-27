import mongoose from "mongoose"

const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  text: {
    type: String
  },
  order: {
    type: Number
  },
  answers: []
})

mongoose.model("Question", QuestionSchema, "questions")
