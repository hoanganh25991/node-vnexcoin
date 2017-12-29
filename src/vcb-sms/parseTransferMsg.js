import moment from "moment"

const _ = console.log
export const VCB_DATE_FORMAT = "DD-MM-YYYY HH:mm:ss"

export const parseTransferMsg = msg => {
  const pattern = /So du TK VCB.+luc (\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}).+Ref.+\.CKXONG(.{24})\./
  const matches = msg.match(pattern)
  if (!matches) return null
  return mapTransferMatches(matches)
}

export const mapTransferMatches = matches => {
  try {
    const vcbTime = matches[1]
    const transactionId = matches[2]
    const vcbTimeMObj = moment(vcbTime, VCB_DATE_FORMAT)

    // Recheck
    const isObjId = /^[A-Za-z0-9]+$/.test(transactionId)
    const validTime = vcbTimeMObj.isValid()

    const lookFine = isObjId && validTime
    if (!lookFine) return null

    return {
      transactionId,
      vcbTime: +vcbTimeMObj.format("X")
    }
  } catch (err) {
    _("[mapTransferMatches][ERR]", err)
    return null
  }
}
