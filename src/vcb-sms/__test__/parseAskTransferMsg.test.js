import fs from "fs"
import path from "path"
import { parseAskTransferMsg } from "../parseAskTransferMsg"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "Parse Ask Transfer Message"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const msg = fs.readFileSync(path.join(__dirname, "askTransfer.txt")).toString()
    const parsed = parseAskTransferMsg(msg)

    _("[parsed]", parsed)
    if (!parsed) {
      _(`Fail to parsed`)
      return (pass = false)
    }

    const { accountNumber } = parsed
    const expectedAccNumber = "0421000495557"
    pass = accountNumber === expectedAccNumber
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    pass ? _(PASS) : _(FAIL)
  }
})()
