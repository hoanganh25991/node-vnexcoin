import { app } from "./init"

const fcm = app.messaging()
const _ = console.log

const FCM_PUSH_TOPIC_SCOPE = "pushToTopic"
const FCM_PUSH_DEVICE_SCOPE = "pushToDevice"

/**
 * Push payload to topic
 * @link https://goo.gl/EzaNW5
 * @param topic
 * @param payload
 * @returns {boolean}
 */
export const pushToTopic = ({ topic, payload }) => {
  const scope = FCM_PUSH_TOPIC_SCOPE
  const hasData = payload && payload.data

  if (!hasData) {
    _(`${scope} Payload must contain data key`)
    return false
  }

  // Debug push with notification
  const title = "FCM data sent"
  const body = payload.data.msg || JSON.stringify(payload.data)
  payload.notification = { title, body }

  return fcm
    .sendToTopic(topic, payload)
    .then(res => {
      _(`[${scope}] Push success`, res)
      return true
    })
    .catch(function(err) {
      _(`[${scope}] Push fail`, err)
      return false
    })
}

/**
 * Push payload to devices identifed by "Instance Id"
 * @link https://goo.gl/EzaNW5
 * @param deviceInstanceIds
 * @param payload
 * @returns {boolean}
 */
export const pushToDevice = ({ deviceInstanceIds, payload }) => {
  const scope = FCM_PUSH_DEVICE_SCOPE
  const hasData = payload && payload.data

  if (!hasData) {
    _(`${scope} Payload must contain data key`)
    return false
  }

  return fcm
    .sendToDevice(deviceInstanceIds, payload)
    .then(res => {
      _(`[${scope}] Push success`, res)
      return true
    })
    .catch(function(err) {
      _(`[${scope}] Push fail`, err)
      return false
    })
}
