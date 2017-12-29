import { getHistory } from "../sms"
import { connect, loadModels, closeConnection } from "../connection"

const _ = console.log
connect("vnexcoin")
loadModels()

_("")
;(async () => {
  const TEST_CASE = "Get History SMSes"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const query = { senderNumber: "0903865657" }
    const res = await getHistory(query)
    _("[res]", res)
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    await closeConnection()
    pass ? _(PASS) : _(FAIL)
  }
})()
