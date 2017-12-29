import { decrypt } from "../encryptPayload"
import fs from "fs"
import path from "path"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "Decode"
  let pass = true
  const paylodToken = fs.readFileSync(path.join(__dirname, "encrypted.txt")).toString()

  try {
    const payload = decrypt(paylodToken)
    _("[payload]", payload)
    const expectedName = "anh"
    pass = payload.name === expectedName
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`) : _(`\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`)
  }
})()
