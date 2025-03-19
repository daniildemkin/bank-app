import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ICard } from '../types'

interface ICardStore {
  cards: ICard[]
  setCards: (cards: ICard[]) => void
  updateCardBalance: (cardNumber: string, amount: number) => void
}

const useCardsStore = create<ICardStore>()(
  persist(
    (set) => ({
      cards: [],
      setCards: (cards: ICard[]) => set({ cards }),
      updateCardBalance: (cardNumber: string, amount: number) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.cardNumber === cardNumber ? { ...card, balance: card.balance + amount } : card
          ),
        }))
      },
    }),
    {
      name: 'cards-storage',
    }
  )
)

export default useCardsStore
