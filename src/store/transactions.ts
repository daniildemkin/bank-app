import { create } from 'zustand'
import getTransactions from '../api/transactions'
import { ITransaction } from '../types'

// type FilterType = 'all' | 'income' | 'outcome'

interface TransactionsState {
  transactions: ITransaction[]
  isLoading: boolean
  error: string | null
  userId: number | null
  setTransactions: (transactions: ITransaction[]) => void
  addTransaction: (transaction: ITransaction) => void
  setUserId: (userId: number) => void
  fetchTransactions: () => Promise<void>
  setIsLoading: (isLoading: boolean) => void
}

const useTransactionsStore = create<TransactionsState>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,
  userId: null,
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setUserId: (userId) => set({ userId }),
  fetchTransactions: async () => {
    const userId = get().userId
    if (!userId) return

    set({ isLoading: true, error: null })
    try {
      const transactions = await getTransactions()
      set({
        isLoading: false,
        transactions,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      })
    }
  },
}))

export default useTransactionsStore
