import mongoose from "mongoose"

const _ = console.log
export const PLATFORM = "PLATFORM"
export const MULTIPLY = "MULTIPLY"

const ratio = 1.35
const availablePlatforms = ["ios", "android", "web"]

export const getAll = () => {
  const Answer = mongoose.model("Answer")
  return Answer.find({})
    .exec()
    .catch(err => err)
}

export const findAns = sessionId => {
  const Answer = mongoose.model("Answer")
  return Answer.findOne({ sessionId })
    .exec()
    .catch(err => err)
}

export const updateAns = data => {
  const Answer = mongoose.model("Answer")
  const { sessionId } = data
  return Answer.update({ sessionId }, data, { upsert: true, new: true })
    .exec()
    .catch(err => err)
}

export const computeSummary = answers => {
  // Find platform answer
  const platformAns = answers.filter(ans => ans.type === PLATFORM).map(ans => ans.multiply)
  const rootMultiply = platformAns.reduce((carry, multiply) => ({ ...carry, ...multiply }), {})

  // Not choosen platform as 0 value
  availablePlatforms.forEach(platform => {
    const notChoosen = typeof rootMultiply[platform] === "undefined"
    if (notChoosen) rootMultiply[platform] = 0
  })

  // Find multiply answer
  const multiplyAns = answers.filter(ans => ans.type === MULTIPLY).map(ans => ans.multiply)

  // Combine all multiply value
  const combinedMultiply = multiplyAns.reduce((carry, multiply) => {
    const { ios: li = 1, android: la = 1, web: lw = 1 } = carry
    const { ios: ni = 1, android: na = 1, web: nw = 1 } = multiply
    return { ios: li * ni, android: la * na, web: lw * nw }
  }, rootMultiply)

  const multiplyTotal = Object.values(combinedMultiply).reduce((a, b) => a + b, 0)

  _("combinedMultiply, multiplyTotal", combinedMultiply, multiplyTotal)

  // Normal answer with pay & fixed_pay
  const normalAns = answers.filter(ans => ans.type !== PLATFORM && ans.type !== MULTIPLY)
  // Do compute logic with answer
  return normalAns.reduce((carry, ans) => {
    const { pay, fixed_pay } = ans
    return carry + fixed_pay + pay * multiplyTotal
  }, 0)
}

export const getSummary = async sessionId => {
  const Answer = mongoose.model("Answer")
  const answer = await Answer.findOne({ sessionId })
    .exec()
    .catch(err => err)

  const answers = (answer && answer.answers) || []
  const summary = computeSummary(answers)
  return { summary, ratio }
}

/**
 * Return current choosen platforms
 * Which helps filtering out answers in question
 * @param answers
 * @returns {*}
 */
export const findChoosenPlatforms = answers => {
  // Find platform answer
  const platformAns = answers.filter(ans => ans.type === PLATFORM).map(ans => ans.multiply)
  const rootMultiply = platformAns.reduce((carry, multiply) => ({ ...carry, ...multiply }), {})

  // Not choosen platform as 0 value
  availablePlatforms.forEach(platform => {
    const notChoosen = typeof rootMultiply[platform] === "undefined"
    if (notChoosen) rootMultiply[platform] = 0
  })

  return rootMultiply
}

export const getChoosenPlatforms = async sessionId => {
  const Answer = mongoose.model("Answer")
  const answer = await Answer.findOne({ sessionId })
    .exec()
    .catch(err => err)

  const answers = (answer && answer.answers) || []
  const platforms = findChoosenPlatforms(answers)
  return { platforms }
}
