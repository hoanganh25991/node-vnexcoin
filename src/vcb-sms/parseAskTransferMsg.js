export const parseAskTransferMsg = msg => {
  const pattern = /DONE (\d+)/
  const matches = msg.match(pattern)
  if (!matches) return null
  const accountNumber = matches[1]
  const isNumAcc = /^\d+/.test(accountNumber)
  if (!isNumAcc) return null
  return { accountNumber }
}
