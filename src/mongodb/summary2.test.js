import { computeSummary, PLATFORM, MULTIPLY } from "./answer"

const _ = console.log

const TEST_CASE = "Compute summary, not all platforms choosen"

const ansArr1 = [
  {
    type: PLATFORM,
    multiply: { ios: 1 }
  },
  {
    type: PLATFORM,
    multiply: { android: 1 }
  },
  {
    type: MULTIPLY,
    multiply: { ios: 1.6 }
  },
  {
    pay: 500,
    fixed_pay: 1000
  },
  {
    pay: 400,
    fixed_pay: 1400
  }
]

const expectedMultiplyTotal = 2.6
// const expectedSummary = 1000 + 500 * 2.6 + (1400 + 400 * 2.6)
const expectedSummary = 4740

const summary = computeSummary(ansArr1)

const pass = expectedSummary === summary

_("summary", summary)

pass ? _(`\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`) : _(`\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`)
