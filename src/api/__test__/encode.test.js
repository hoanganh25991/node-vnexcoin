import { encrypt } from "../encryptPayload"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "Encode"
  let pass = true

  try {
    const payloadToken = encrypt({ name: "anh" })
    _("[payloadToken]", payloadToken)
    const expectedToken = "/6yUvTZLkZ1cAS8lUQauwA=="
    pass = payloadToken === expectedToken
  } catch (err) {
    _(err)
    pass = false
  } finally {
    pass ? _(`\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`) : _(`\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`)
  }
})()
