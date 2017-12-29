import { getAll } from "../sms"
import { closeConnection } from "../connection"

const _ = console.log

_("^^")
;(async () => {
  const TEST_CASE = "Compute summary"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const res = await getAll()
    _("[res]", res)
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    await closeConnection()
    pass ? _(PASS) : _(FAIL)
  }
})()
