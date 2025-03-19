import { ICard } from '../types'

const mockCards: ICard[] = [
  {
    id: 1,
    userId: 1,
    balance: 89000,
    currency: 'RUB',
    type: 'Visa',
    cardNumber: '2200565689002242',
  },
  {
    id: 2,
    userId: 1,
    balance: 158000,
    currency: 'RUB',
    type: 'Visa',
    cardNumber: '2200500089001052',
  },
]

const getCards = async (): Promise<ICard[]> => {
  const response = new Promise<ICard[]>((resolve) => {
    setTimeout(() => {
      resolve(mockCards)
    }, 1000)
  })
  return response
}

export default getCards
