import { app } from "./init"

export const topic = "vnexcoin_sms"
const fcm = app.messaging()
const _ = console.log

export const FCM_PUSH_SCOPE = "fcm.push"
export const push = payload => {
  fcm
    .sendToTopic(topic, payload)
    .then(res => {
      _(`[${FCM_PUSH_SCOPE}] Push success`, res)
      return true
    })
    .catch(function(err) {
      _(`[${FCM_PUSH_SCOPE}] Push fail`, err)
      return false
    })
}
