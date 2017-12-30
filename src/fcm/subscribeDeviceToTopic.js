import { app } from "./init"

const fcm = app.messaging()
const _ = console.log

export const SUBSCRIBE_DEVICE_TO_TOPIC_SCOPE = "subscribeDeviceToTopic"

/**
 * Subscribe devices to topic
 * Device indentified by "Instance Id"
 * @link https://goo.gl/YbNK9p
 * @param deviceInstanceIds
 * @param topic
 * @returns {boolean}
 */
export const subscribeDeviceToTopic = ({ deviceInstanceIds, topic }) => {
  const scope = SUBSCRIBE_DEVICE_TO_TOPIC_SCOPE

  return fcm
    .subscribeToTopic(deviceInstanceIds, topic)
    .then(res => {
      _(`[${scope}] Subscribe success`, res)
      return true
    })
    .catch(err => {
      _(`[${scope}] Subscribe fail`, err)
      return false
    })
}
