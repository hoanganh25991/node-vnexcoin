import { pushToDevice } from "../push"
import { app } from "../init"

const _ = console.log

_("")
;(async () => {
  const TEST_CASE = "FCM Push To Devices"
  const PASS = `\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`
  const FAIL = `\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`
  let pass = true

  try {
    const payload = { name: "anh" }
    const deviceInstanceIds = [
      "dz5oyQLvWBk:APA91bE8z2cMO1gwzChwxNkxJ09-_LBpESToVUNe8o5KIwajlII2AbZcrZs1KSWk5-iZVlLwG_HSA9V_eG4JAZsxnazo8oHefKS_Y8dJHLOS00Br5WQ9-fLWhLQ7XI5IGfE0dqTsOjuz",
      "fxG3FKemfKY:APA91bHyxHQNn1kgzh945hcLzuqTyD4UdVcdGV9B9w5O0V4r6jLSeIF9r7FTZfb9-wRv7HWyFOhAE6it2gOdtLzOH-wTwYU4bES5aE3YsiGLX2-_WEPOXXMX9diavUy5B8HmX96NgmbQ"
    ]
    const pushed = await pushToDevice({ deviceInstanceIds, payload })
    _("[pushed]", pushed)
    pass = pushed
  } catch (err) {
    _("[ERR]", err)
    pass = false
  } finally {
    await app.delete()
    pass ? _(PASS) : _(FAIL)
  }
})()
