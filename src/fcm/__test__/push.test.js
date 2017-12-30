import { push } from "../push"
import { app } from "../init"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "FCM push"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const payload = {
      data: { name: "anh" }
    }
    const pushed = await push(payload)
    _("[pushed]", pushed)
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    await app.delete()
    pass ? _(PASS) : _(FAIL)
  }
})()
