import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import History from '../pages/History'
import Home from '../pages/Home'
import Login from '../pages/Login'
import BetweenTransfer from '../pages/Payment/BetweenTransfer'
import MobileTransfer from '../pages/Payment/MobileTransfer'
import P2pTransfer from '../pages/Payment/P2pTransfer'
import Transfer from '../pages/Payment/Transfer'
import Profile from '../pages/Profile'
import useAuthState from '../store/auth'

interface ProtectedRoutesProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
  const { token } = useAuthState()
  return token ? <>{children}</> : <Navigate to="/login" />
}

const AppRoute: React.FC = () => {
  const { token } = useAuthState()

  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate
                to="/"
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/between-accounts"
          element={
            <ProtectedRoute>
              <BetweenTransfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/mobile-phone"
          element={
            <ProtectedRoute>
              <MobileTransfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/p2p"
          element={
            <ProtectedRoute>
              <P2pTransfer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default AppRoute
