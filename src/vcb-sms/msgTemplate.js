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
const MSG_TEMPLATE_SCOPE = "msgTemplate"

export const reverseStr = str =>
  str
    .split("")
    .reverse()
    .join("")

export const fVndAmount = amount => {
  // 12345678 > "12345678"
  const amountStr = "" + amount
  // "12345678" > "876,543,21"
  const reversed = reverseStr(amountStr)
    .match(/.{1,3}/g)
    .join(",")
  // "876,543,21" ? "12,345,678"
  return reverseStr(reversed)
}

/**
 * Build msg template to send to buyer & seller
 * @param transaction
 * @param sellerAccNum
 * @return string
 */
export const msgTemplate = ({ transaction, sellerAccNum }) => {
  const scope = MSG_TEMPLATE_SCOPE

  _(`[${scope}][tranasction]`, transaction)

  const { status } = transaction
  if (!status) return `[${scope}] No status to build`

  let msg = ""

  switch (status) {
    case TRANSFERRING_DEPOSIT: {
      const { amount, buyerNumber, sellerNumber } = transaction
      const vndAmount = fVndAmount(amount)
      msg = `Midman.vn da nhan va dang giu ho ${vndAmount} VND cua ${buyerNumber} gui cho ban ${sellerNumber}. Sau khi ban da chuyen khoan day du, vui long gui lai: CK XONG ${sellerNumber}`
      break
    }
    case DONE_DEPOSIT: {
      break
    }
    case ASK_TRANSFER: {
      const { amount } = transaction
      const vndAmount = fVndAmount(amount)
      msg = `Midman.vn se chuyen den tk ${sellerAccNum} so tien ${vndAmount} VND (da tru phi 100k) sau khi nhan dc xac nhan cua nguoi mua`
      break
    }
    case RECEIVED_COIN: {
      break
    }
    case TRANSFERRING_TO_SELLER: {
      break
    }
    case DONE_TRANSFER_TO_SELLER: {
      const { buyerNumber, sellerNumber } = transaction
      msg = `Giao dich cua giua ${buyerNumber} va ${sellerNumber} da hoan tat. Cam on ban da lua chon Midman.vn`
      break
    }
    default: {
      break
    }
  }

  return msg
}
