import { parseDepositMsg } from "./parseDepositMsg"
import { isDoneDepositMsg } from "./isDoneDepositMsg"
import { parseAskTransferMsg } from "./parseAskTransferMsg"
import { isReceivedCoinMsg } from "./isReceivedCoin"
import { parseTransferringMsg } from "./parseTransferringMsg"
import { parseDoneTransferMsg } from "./parseDoneTransferMsg"
import { store as saveTransactionToDb, find as findTran } from "../mongodb/transaction"

/**
 * Explain meaning for status in Transaction model
 * @link TransactionSchema
 */
import {
  TRANSFERRING_DEPOSIT,
  DONE_DEPOSIT,
  ASK_TRANSFER,
  RECEIVED_COIN,
  TRANSFERRING_TO_SELLER,
  DONE_TRANSFER_TO_SELLER
} from "../mongodb/models/transaction"

const _ = console.log

export const parseProcesses = [
  { func: parseDepositMsg, status: TRANSFERRING_DEPOSIT },
  { func: isDoneDepositMsg, status: DONE_DEPOSIT },
  { func: parseAskTransferMsg, status: ASK_TRANSFER },
  { func: isReceivedCoinMsg, status: RECEIVED_COIN },
  { func: parseTransferringMsg, status: TRANSFERRING_TO_SELLER },
  { func: parseDoneTransferMsg, status: DONE_TRANSFER_TO_SELLER }
]

export const parseSms = async sms => {
  const carry = parseProcesses.reduce((carry, parseProcess) => {
    // Ignore, if successful parse
    if (carry && carry.parsed) return carry
    const { func, status } = parseProcess
    const parsed = func(sms.msg)
    return { parsed, status }
  }, null)
  if (!carry) {
    _("[parseSms] Not our cases")
    return null
  }
  const { parsed, status } = carry
  _("[parseSms][parsed, status]", parsed, status)
  const tasks = []
  switch (status) {
    case TRANSFERRING_DEPOSIT: {
      const tranInfo = parsed && { ...parsed, status: TRANSFERRING_DEPOSIT }
      tasks.push(saveTransactionToDb(tranInfo))
      break
    }
    case DONE_DEPOSIT: {
      const { sellerNumber } = parsed
      const { senderNumber: buyerNumber } = sms
      const tranInfo = { buyerNumber, sellerNumber, status: DONE_DEPOSIT }
      tasks.push(saveTransactionToDb(tranInfo))
      break
    }
    case ASK_TRANSFER: {
      const { buyerNumber, sellerAccNum } = parsed
      const { senderNumber: sellerNumber } = sms
      const tranInfo = { buyerNumber, sellerNumber, status: ASK_TRANSFER }
      tasks.push(saveTransactionToDb(tranInfo))
      break
    }
    case RECEIVED_COIN: {
      const { sellerNumber } = parsed
      const { senderNumber: buyerNumber } = sms
      const tranInfo = { buyerNumber, sellerNumber, status: RECEIVED_COIN }
      tasks.push(saveTransactionToDb(tranInfo))
      break
    }
    case TRANSFERRING_TO_SELLER: {
      const { transactionId: id } = parsed
      const transaction = await findTran(id)
      const tranObj = transaction.toObject()
      const tranInfo = tranObj && { ...tranObj, status: TRANSFERRING_TO_SELLER }
      tasks.push(saveTransactionToDb(tranInfo))
      break
    }
    case DONE_TRANSFER_TO_SELLER: {
      const { transactionId: id } = parsed
      const transaction = await findTran(id)
      const tranObj = transaction && transaction.toObject()
      const tranInfo = tranObj && { ...tranObj, status: DONE_TRANSFER_TO_SELLER }
      tasks.push(saveTransactionToDb(tranInfo))
      break
    }
    default: {
      break
    }
  }

  return Promise.all(tasks)
}
