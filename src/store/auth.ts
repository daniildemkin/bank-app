import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUser } from '../types'

interface AuthState {
  token: string | null
  user: IUser | null
  setToken: (token: string) => void
  logout: () => void
}

export default create<AuthState>()(
  persist(
    (set, get) => ({
      // Добавляем get
      user: null,
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
