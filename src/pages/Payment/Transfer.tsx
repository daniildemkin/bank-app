import React from 'react'
import { Link } from 'react-router-dom'

const Transfer: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Платежи</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Первая секция: быстрые действия */}
        <section className="flex flex-col bg-white shadow-lg rounded-lg h-screen p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Быстрые действия</h2>
          <div className="space-y-4">
            <Link
              to="/payment/between-accounts"
              className="block py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 text-center"
            >
              Перевод между счетами
            </Link>
            <Link
              to="/payment/p2p"
              className="block py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 text-center"
            >
              Перевод другому человеку
            </Link>
            <Link
              to="/payment/mobile-phone"
              className="block py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 text-center"
            >
              Оплата мобильной связи
            </Link>
          </div>
        </section>

        {/* Вторая секция: информационный блок */}
        <section className="bg-red-600 shadow-lg p-6 rounded-lg flex flex-col justify-between items-center">
          <div className="space-y-4">
            <p className="text-white text-center">
              Узнайте про кэшбэк и как получить до 10% на ваши покупки!
            </p>
            <p className="text-white text-center">
              Скачайте мобильное приложение и следите за всеми операциями в реальном времени.
            </p>
            <p className="text-white text-center">
              Получите выгодные предложения по кредитным картам и займам с низкими процентными
              ставками.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Transfer
