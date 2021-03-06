import { parseDepositMsg } from "../parseDepositMsg"
import fs from "fs"
import path from "path"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "Parse Deposit Message"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const msg = fs.readFileSync(path.join(__dirname, "depositMsg.txt")).toString()
    const parsed = parseDepositMsg(msg)

    _("[parsed]", parsed)
    if (!parsed) return (pass = false && _(`Fail to parsed`))

    const { buyerNumber } = parsed
    const expectedNumber = "01256654629"
    pass = buyerNumber === expectedNumber
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    pass ? _(PASS) : _(FAIL)
  }
})()
