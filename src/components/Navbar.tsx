import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import useAuthState from '../store/auth'
import LogoutModal from './LogoutModal'

interface NavbarItem {
  path: string
  label: string
}

interface NavbarItems extends NavbarItem {
  links?: NavbarItem
}

const navbarItems: NavbarItems[] = [
  { path: '/', label: 'Главная' },
  { path: '/history', label: 'История' },
  { path: '/profile', label: 'Личный кабинет', links: { path: '/login', label: 'Выйти' } },
  { path: '/login', label: 'Выйти' },
]

const Navbar: React.FC = () => {
  const location = useLocation()
  const { token, logout } = useAuthState()
  const navigate = useNavigate()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsLogoutModalOpen(false)
    navigate('/login')
  }

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLogoutModalOpen(true)
  }

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/*Logo*/}
            <Link
              to="/"
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold">Альфа Банк</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/*Navigation*/}
            {token
              ? navbarItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={item.path === '/login' ? handleLogoutClick : undefined}
                    className={`flex items-center px-3 py-2 rounded-md text-m font-medium transition-colors duration-300
                      ${
                        location.pathname === item.path
                          ? 'bg-white text-red-600'
                          : 'text-white hover:bg-white hover:text-red-600'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))
              : null}
            {
              // TODO
              // Dropdown Menu
            }
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </nav>
  )
}

export default Navbar
