/**
 * mPHM: map pattern hole meaning
 * / (/d+) /: Hole inside pattern
 * @type {{amount: number, vcbTime: number, buyerNumber: number, sellerNumber: number}}
 */
export const mPHM = {
  buyerNumber: 1,
  sellerAccNum: 2
}

export const parseAskTransferMsg = msg => {
  const pattern = /DONE (\d+) (\d+)/
  const matches = msg.match(pattern)
  if (!matches) return null
  const buyerNumber = matches[mPHM.buyerNumber]
  const sellerAccNum = matches[mPHM.sellerAccNum]
  return { buyerNumber, sellerAccNum }
}
