import { encode } from "../decode"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "Encode"
  let pass = true

  try {
    const base64 = encode("hello world")
    // _("[base64]", base64)
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`) : _(`\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`)
  }
})()
