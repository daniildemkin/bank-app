import React, { useEffect, useState } from 'react'
import { FaChartLine, FaExchangeAlt, FaWallet } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import getCards from '../api/cards'
import getTransactions from '../api/transactions'
import Card from '../components/Card'
import useAuthState from '../store/auth'
import useCardsStore from '../store/cards'
import useTransactionsStore from '../store/transactions'

const Home: React.FC = () => {
  const { transactions, setTransactions, setUserId } = useTransactionsStore()
  const { user } = useAuthState()
  const { setCards } = useCardsStore()
  const cards = useCardsStore((state) => state.cards)
  const [income, setIncome] = useState(0)
  const [outcome, setOutcome] = useState(0)

  useEffect(() => {
    if (transactions.length === 0 && user?.id) {
      setUserId(user.id)
      getTransactions().then((res) => {
        setTransactions(res)
      })
      getCards().then((res) => {
        setCards(res)
      })
    }
  }, [transactions, cards])

  useEffect(() => {
    setIncome(
      transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
          return acc + transaction.amount
        }
        return acc
      }, 0)
    )
  }, [transactions])

  useEffect(() => {
    setOutcome(
      transactions.reduce((acc, transaction) => {
        if (transaction.type === 'outcome') {
          return acc + transaction.amount
        }
        return acc
      }, 0)
    )
  }, [transactions])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Добро пожаловать{user?.name ? `, ${user.name}` : ''}!
        </h1>
      </div>
      {cards.map((card) => (
        <Card
          className="mb-6"
          key={card.id}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Ваша карта
                <h3 className="text-xs text-gray-500">
                  {' ****'}
                  {card?.cardNumber.slice(12, 16)}
                </h3>
              </h2>

              <p className="text-3xl font-bold mt-2">
                {card?.balance.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaWallet className="text-blue-600 text-2xl" />
              </div>
              <Link
                to="/payment"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg font-semibold hover:from-blue-400 hover:to-blue-500 transition duration-300"
              >
                Платежи
              </Link>
            </div>
          </div>
        </Card>
      ))}

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Доходы за месяц</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {income.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaChartLine className="text-green-600 text-2xl" />
            </div>
          </div>
        </Card>

        <Card hover={false}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Расходы за месяц</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {outcome.toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FaExchangeAlt className="text-red-600 text-2xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Последние транзакции */}
      <Card
        className="mb-6"
        hover={false}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Последние транзакции</h3>
          <Link
            to="/history"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Посмотреть все
          </Link>
        </div>
        <div className="space-y-4">
          {transactions.slice(0, 3).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-800">{transaction.description}</p>
                <p className="text-sm text-gray-500">{new Date().toLocaleDateString('ru-RU')}</p>
              </div>
              <p
                className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {transaction.amount.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Home
