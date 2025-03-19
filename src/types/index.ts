export interface IUser {
  id: number
  name: string
  email: string
  avatar?: string
}
/////////////////////////////////////////////

export type TypeCurrency = 'RUB' | 'USD' | 'EUR'
export type TypeAccount = 'checking' | 'savings'

export interface IAccount {
  id: number
  userId: number
  balance: number
  currency: TypeCurrency
  type: TypeAccount
  accountNumber: string
  createdAt: string
}
/////////////////////////////////////////////

export type TypeTransaction = 'income' | 'outcome' | 'between'
export type TypeStatusTransaction = 'pending' | 'completed' | 'failed'

export interface ITransaction {
  id: number
  accountId: number
  type: TypeTransaction
  amount: number
  description?: string
  date: string
  status: TypeStatusTransaction
}

export interface ITransferFormData {
  senderAccount: string
  receiverAccount: string
  amount: number
  description?: string
}

/////////////////////////////////////////////

export type TypeCard = 'Visa' | 'Mastercard'
export interface ICard {
  id: number
  userId: number
  balance: number
  currency: TypeCurrency
  type: TypeCard
  cardNumber: string
}
