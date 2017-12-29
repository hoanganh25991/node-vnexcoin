import { parseDepositMsg } from "../parseDepositMsg"
import fs from "fs"
import path from "path"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "Parse Bundle Deposit Msg"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const bundleMsg = fs.readFileSync(path.join(__dirname, "bundleMsg.txt")).toString()
    const msgs = bundleMsg.split(/\r?\n/)
    msgs.forEach(msg => {
      const parsed = parseDepositMsg(msg)
      _("[parsed]", parsed)
    })
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    pass ? _(PASS) : _(FAIL)
  }
})()
