import { parseAskTransferMsg } from "./parseAskTransferMsg"
import { parseTransferMsg } from "./parseTransferMsg"
import { parseDepositMsg } from "./parseDepositMsg"
import { isDoneDepositMsg } from "./isDoneDepositMsg"
import { isReceivedCoinMsg } from "./isReceivedCoin"
import { store as saveTransactionToDb } from "../mongodb/transaction"

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
  { func: parseTransferMsg, status: TRANSFERRING_TO_SELLER }
]

export const parseSms = sms => {
  const carry = parseProcesses.reduce((carry, parseProcess) => {
    // Ignore, if successful parse
    if (carry) return carry
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
    default: {
      break
    }
  }

  return Promise.all(tasks)
}
