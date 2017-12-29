import moment from "moment"

export const VCB_DATE_FORMAT = "DD-MM-YYYY HH:mm:ss"

/**
 * mPHM: map pattern hole meaning
 * / (/d+) /: Hole inside pattern
 * @type {{amount: number, vcbTime: number, buyerNumber: number, sellerNumber: number}}
 */
export const mPHM = {
  amount: 1,
  vcbTime: 2,
  buyerNumber: 3,
  sellerNumber: 4
}

export const parseDepositMsg = msg => {
  const pattern = /So du TK VCB.+thay doi \+([A-Za-z0-9,]+) VND.+luc (\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}).+Ref.+\.(\d{10,}) - (\d{10,})\./
  const matches = msg.match(pattern)
  if (!matches) return null
  return mapDepositMatches(matches)
}

export const mapDepositMatches = matches => {
  try {
    const rawAmount = matches[mPHM.amount]
    const amount = +rawAmount.replace(/,/g, "")
    const vcbTime = matches[mPHM.vcbTime]
    const buyerNumber = matches[mPHM.buyerNumber]
    const sellerNumber = matches[mPHM.sellerNumber]
    const vcbTimeMObj = moment(vcbTime, VCB_DATE_FORMAT)

    // Recheck
    const isNumBuyer = /^\d+$/.test(buyerNumber)
    const isNumerSeller = /^\d+$/.test(sellerNumber)
    const validTime = vcbTimeMObj.isValid()

    const lookFine = isNumBuyer && isNumerSeller && validTime
    if (!lookFine) return null

    return {
      amount,
      buyerNumber,
      sellerNumber,
      vcbTime: +vcbTimeMObj.format("X")
    }
  } catch (err) {
    _("[mapTransferringMatches][ERR]", err)
    return null
  }
}
