import { pushToWeb, fbApp } from "../pushToWeb"
import { VNEXCOIN_TOPIC } from "../init"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "Push To Web"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const topic = VNEXCOIN_TOPIC
    const payload = { name: "anh" }
    const pushed = await pushToWeb({ topic, payload })
    _("[pushed]", pushed)
    pass = pushed
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    await fbApp.delete()
    pass ? _(PASS) : _(FAIL)
  }
})()
