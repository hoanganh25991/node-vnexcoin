import { decode } from "../decode"
import fs from "fs"
import path from "path"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "Decode"
  let pass = true

  const base64 = fs.readFileSync(path.join(__dirname, "encrypted2.txt")).toString()

  _("[base64]", base64)

  try {
    decode(base64)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`) : _(`\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`)
  }
})()
