import moment from "moment"

export const VCB_DATE_FORMAT = "DD-MM-YYYY HH:mm:ss"

export const parseSmsMsg = msg => {
  const pattern = /.+luc (\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}).+Ref.+\.(\d{10,}) - (\d{10,}).+\./
  const matches = msg.match(pattern)
  if (!matches) return null
  return mapReceiveMoneyMatches(matches)
}

export const mapReceiveMoneyMatches = matches => {
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
    _("[mapReceiveMoneyMatches][ERR]", err)
    return null
  }
}
