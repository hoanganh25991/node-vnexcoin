import moment from "moment"

export const VCB_DATE_FORMAT = "DD-MM-YYYY HH:mm:ss"

export const parseDepositMsg = msg => {
  const pattern = /So du TK VCB.+luc (\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}).+Ref.+\.(\d{10,}) - (\d{10,})\./
  const matches = msg.match(pattern)
  if (!matches) return null
  return mapDepositMatches(matches)
}

export const mapDepositMatches = matches => {
  try {
    const vcbTime = matches[1]
    const buyerNumber = matches[2]
    const sellerNumber = matches[3]
    const vcbTimeMObj = moment(vcbTime, VCB_DATE_FORMAT)

    // Recheck
    const isNumBuyer = /^\d+$/.test(buyerNumber)
    const isNumerSeller = /^\d+$/.test(sellerNumber)
    const validTime = vcbTimeMObj.isValid()

    const lookFine = isNumBuyer && isNumerSeller && validTime
    if (!lookFine) return null

    return {
      buyerNumber,
      sellerNumber,
      vcbTime: +vcbTimeMObj.format("X")
    }
  } catch (err) {
    _("[mapTransferMatches][ERR]", err)
    return null
  }
}
