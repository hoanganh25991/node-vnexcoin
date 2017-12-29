import fs from "fs"
import path from "path"
import { parseTransferMsg } from "../parseTransferMsg"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "Parse Transfer Message"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const msg = fs.readFileSync(path.join(__dirname, "transferMsg.txt")).toString()
    const parsed = parseTransferMsg(msg)
    const { transactionId } = parsed
    const expectedTransactionId = "5a4611dc411508295438bec0"
    pass = transactionId === expectedTransactionId
    _("[parsed]", parsed)
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    pass ? _(PASS) : _(FAIL)
  }
})()
