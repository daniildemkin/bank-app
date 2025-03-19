import dayjs from 'dayjs'
import useAuthState from '../store/auth'
import useCardsStore from '../store/cards'
import useTransactionsStore from '../store/transactions'
import { ITransaction, ITransferFormData, TypeStatusTransaction, TypeTransaction } from '../types'

const getRandomDate = (minMonths: number, maxMonths: number): string => {
  const now = dayjs()
  const randomMonthOffset = Math.floor(Math.random() * (maxMonths - minMonths + 1)) + minMonths
  const targetMonth = now.subtract(randomMonthOffset, 'month')

  let randomDay
  do {
    randomDay = Math.floor(Math.random() * targetMonth.daysInMonth()) + 1
  } while (!targetMonth.date(randomDay).isValid())

  return targetMonth.date(randomDay).format('YYYY-MM-DD')
}

const mockTransactions: ITransaction[] = [
  ...Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    accountId: 1,
    type: i % 2 === 0 ? 'income' : ('outcome' as TypeTransaction),
    amount: Math.floor(Math.random() * 100000),
    description: Math.random() > 0.1 ? 'Покупка' : 'Оплата',
    date: getRandomDate(1, 12),
    status: Math.random() > 0.1 ? 'completed' : ('pending' as TypeStatusTransaction),
  })),
]

const sortTransactions = (transactions: ITransaction[]) => {
  return [...transactions].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
}

const getTransactions = async (): Promise<ITransaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sortTransactions(mockTransactions))
    }, 1000)
  })
}

export default getTransactions

export const transferBetweenAccounts = async (data: ITransferFormData): Promise<ITransaction> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = useAuthState.getState()
  const { addTransaction } = useTransactionsStore.getState()
  const { updateCardBalance, cards } = useCardsStore.getState()

  const senderAccount = cards.find((card) => card.cardNumber === data.senderAccount)
  const receiverAccount = cards.find((card) => card.cardNumber === data.receiverAccount)

  if (!senderAccount) throw new Error('Карта отправителя не найдена!')
  if (senderAccount.balance < data.amount) throw new Error('Недостаточно средств!')

  const newTransaction: ITransaction = {
    id: Date.now(),
    accountId: Number(user.token), // Используем `token` для ID (если есть)
    type: 'between',
    amount: data.amount,
    description: data.description,
    date: dayjs().format('YYYY-MM-DD'),
    status: 'completed',
  }

  updateCardBalance(senderAccount.cardNumber, -data.amount)
  if (receiverAccount) {
    updateCardBalance(receiverAccount.cardNumber, data.amount)
  }

  addTransaction(newTransaction)

  return newTransaction
}
