import { pushToTopic } from "../push"
import { app, VNEXCOIN_TOPIC } from "../init"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "FCM Push To Topic"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const topic = VNEXCOIN_TOPIC
    const payload = {
      data: { name: "anh" }
    }
    const pushed = await pushToTopic({ topic, payload })
    _("[pushed]", pushed)
    pass = pushed
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    await app.delete()
    pass ? _(PASS) : _(FAIL)
  }
})()
