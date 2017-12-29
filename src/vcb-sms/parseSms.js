import { parseAskTransferMsg } from "./parseAskTransferMsg"
import { parseTransferMsg } from "./parseTransferMsg"
import { parseDepositMsg } from "./parseDepositMsg"
import { isDoneDepositMsg } from "./isDoneDepositMsg"
import { isReceivedCoinMsg } from "./isReceivedCoin"

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

export const parseProcesses = [
  { func: parseDepositMsg, status: TRANSFERRING_DEPOSIT },
  { func: isDoneDepositMsg, status: DONE_DEPOSIT },
  { func: parseAskTransferMsg, status: ASK_TRANSFER },
  { func: isReceivedCoinMsg, status: RECEIVED_COIN },
  { func: parseTransferMsg, status: TRANSFERRING_TO_SELLER }
]

export const parseSms = sms => {
  const { parsed, status } = parseProcesses.reduce(
    (carry, parseProcess) => {
      // Ignore, already successful parse
      if (carry) return carry
      const { func, status } = parseProcess
      const parsed = func(sms)
      return { parsed, status }
    },
    { parsed: null, status: null }
  )

  // Ignore, not our case
  if (!parsed) return null

  switch (status) {
    case TRANSFERRING_DEPOSIT: {
      const { amount, vcbTime, buyerNumber, sellerNumber } = parsed
      break
    }
    default: {
      break
    }
  }
}
