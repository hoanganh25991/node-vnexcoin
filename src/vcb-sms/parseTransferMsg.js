import moment from "moment"

export const VCB_DATE_FORMAT = "DD-MM-YYYY HH:mm:ss"

export const parseTransferMsg = msg => {
  const pattern = /So du TK VCB.+luc (\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}).+Ref.+\.().+\./
  const matches = msg.match(pattern)
  if (!matches) return null
  return mapTransferMatches(matches)
}

export const mapTransferMatches = matches => {
  try {
    const sentAt = matches[1]
    const buyerNumber = matches[2]
    const sellerNumber = matches[3]
    const sentAtMObj = moment(sentAt, VCB_DATE_FORMAT)

    // Recheck
    const isNumBuyer = /^\d+$/.test(buyerNumber)
    const isNumerSeller = /^\d+$/.test(sellerNumber)
    const validTime = sentAtMObj.isValid()

    const lookFine = isNumBuyer && isNumerSeller && validTime
    if (!lookFine) return null

    return {
      buyerNumber,
      sellerNumber,
      timestamp: +sentAtMObj.format("X")
    }
  } catch (err) {
    _("[mapTransferMatches][ERR]", err)
    return null
  }
}