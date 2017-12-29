/**
 * mPHM: map pattern hole meaning
 * / (/d+) /: Hole inside pattern
 * @type {{amount: number, vcbTime: number, buyerNumber: number, sellerNumber: number}}
 */
export const mPHM = {
  sellerNumber: 1
}

export const isDoneDepositMsg = msg => {
  const pattern = /CK XONG (\d+)/
  const matches = msg.match(pattern)
  if (!matches) return null
  const sellerNumber = matches[mPHM.sellerNumber]
  return { sellerNumber }
}
