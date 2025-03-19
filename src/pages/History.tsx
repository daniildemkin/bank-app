import 'dayjs/locale/ru'
import { useEffect, useMemo, useState } from 'react'
import useAuthState from '../store/auth'
import useTransactionsStore from '../store/transactions'

const History: React.FC = () => {
  const { transactions, isLoading, fetchTransactions, setUserId } = useTransactionsStore()
  const { user } = useAuthState()
  const [filter, setFilter] = useState<'all' | 'income' | 'outcome'>('all')

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id)
      fetchTransactions()
    }
  }, [user?.id])

  // useEffect(() => {
  //   const filteredTransactions = transactions.filter((t) => {
  //     if (filter === 'all') {
  //       return true
  //     }
  //     return t.type === filter
  //   })
  //   setTransactions(filteredTransactions)
  // }, [filter])
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filter === 'all') {
        return true
      }
      return t.type === filter
    })
  }, [filter, transactions])

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setFilter(value as 'all' | 'income' | 'outcome')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-t-2 border-b-2 border-red-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">История операций</h1>
          </div>
          <div className="flex justify-between items-center">
            <select
              name="sort"
              id="sort"
              className="border border-gray-300 rounded-md px-4 py-2"
              onChange={handleSort}
              value={filter}
            >
              <option value="all">Все</option>
              <option value="income">Доходы</option>
              <option value="outcome">Расходы</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Комментарий
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сумма
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr
                  className="hover:bg-gray-50"
                  key={transaction.id}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      transaction.status === 'completed'
                        ? 'text-green-600'
                        : transaction.status === 'failed'
                          ? 'text-red-600'
                          : 'text-yellow-400'
                    }`}
                  >
                    {transaction.status === 'completed'
                      ? 'Успешно'
                      : transaction.status === 'failed'
                        ? 'Неуспешно'
                        : 'Ожидает'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{' '}
                    {transaction.amount.toLocaleString('ru-RU')} ₽
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Показано {filteredTransactions.length} из {transactions.length} операций
          </div>
        </div>
      </div>
    </div>
  )
}

export default History
