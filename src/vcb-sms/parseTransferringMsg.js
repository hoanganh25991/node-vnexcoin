import moment from "moment"

const _ = console.log
export const VCB_DATE_FORMAT = "DD-MM-YYYY HH:mm:ss"

/**
 * mPHM: map pattern hole meaning
 * / (/d+) /: Hole inside pattern
 * @type {{amount: number, vcbTime: number, buyerNumber: number, sellerNumber: number}}
 */
export const mPHM = {
  vcbTime: 1,
  transactionId: 2
}

export const parseTransferringMsg = msg => {
  const pattern = /So du TK VCB.+luc (\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}).+Ref.+\.TRANSFERRING(.{24})\./
  const matches = msg.match(pattern)
  if (!matches) return null
  return mapTransferringMatches(matches)
}

export const mapTransferringMatches = matches => {
  try {
    const vcbTime = matches[mPHM.vcbTime]
    const transactionId = matches[mPHM.transactionId]
    const vcbTimeMObj = moment(vcbTime, VCB_DATE_FORMAT)

    // Recheck
    const isObjId = /^[A-Za-z0-9]+$/.test(transactionId)
    const validTime = vcbTimeMObj.isValid()

    _("[vcbTime, transactionId]", vcbTime, transactionId)

    const lookFine = isObjId && validTime
    if (!lookFine) return null

    return {
      transactionId,
      vcbTime: +vcbTimeMObj.format("X")
    }
  } catch (err) {
    _("[mapTransferringMatches][ERR]", err)
    return null
  }
}
