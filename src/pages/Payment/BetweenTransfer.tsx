import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import getCards from '../../api/cards'
import { transferBetweenAccounts } from '../../api/transactions'
import useCardsStore from '../../store/cards'
import { ICard } from '../../types'
const validationSchema = z.object({
  senderAccount: z.string().min(1, 'Выберите счет отправителя'),
  receiverAccount: z.string().min(1, 'Выберите счет получателя'),
  amount: z
    .number()
    .min(1, 'Сумма должна быть больше 0')
    .max(1000000, 'Максимальная сумма перевода 1 000 000 ₽'),
  comment: z.string().optional(),
})

type ValidationSchema = z.infer<typeof validationSchema>

interface BetweenTransferProps {
  cards: ICard[]
}

const BetweenTransfer: React.FC<BetweenTransferProps> = () => {
  const setCards = useCardsStore((state) => state.setCards)
  const cards = useCardsStore((state) => state.cards)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    const loadCards = async () => {
      const res = await getCards()
      setCards(res)
    }

    loadCards()
  }, [setCards])

  if (!cards.length) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    )
  }

  const onSubmit = async (data: ValidationSchema) => {
    console.log(data)
    transferBetweenAccounts(data)
    reset()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Перевод между счетами</h2>
      <form
        className="bg-white shadow-lg p-6 rounded-lg space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Счет отправителя */}
        <div>
          <label
            htmlFor="senderAccount"
            className="block text-gray-700 mb-2"
          >
            Выберите счет отправителя
          </label>
          <select
            value={watch('senderAccount')}
            id="senderAccount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            {...register('senderAccount')}
            required
          >
            <option
              value=""
              disabled
            >
              Выберите счет отправителя
            </option>
            {cards.map((card) => (
              <option
                key={card.id}
                value={card.cardNumber}
              >
                {card.type} (****{card.cardNumber.slice(-4)}) - {card.balance.toLocaleString()} ₽
              </option>
            ))}
          </select>
          {errors.senderAccount && (
            <p className="text-red-500 text-sm">{errors.senderAccount.message}</p>
          )}
        </div>

        {/* Счет получателя */}
        <div>
          <label
            htmlFor="receiverAccount"
            className="block text-gray-700 mb-2"
          >
            Выберите счет получателя
          </label>
          <select
            id="receiverAccount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            {...register('receiverAccount')}
            required
          >
            <option
              value=""
              disabled
            >
              Выберите счет получателя
            </option>
            {cards
              .filter((card) => card.id !== Number(watch('senderAccount')))
              .map((card) => (
                <option
                  key={card.id}
                  value={card.cardNumber}
                >
                  {card.type} (****{card.cardNumber.slice(-4)}) - {card.balance.toLocaleString()} ₽
                </option>
              ))}
          </select>
          {errors.receiverAccount && (
            <p className="text-red-500 text-sm">{errors.receiverAccount.message}</p>
          )}
        </div>

        {/* Сумма перевода */}
        <div>
          <label
            htmlFor="amount"
            className="block text-gray-700 mb-2"
          >
            Сумма перевода
          </label>
          <input
            type="number"
            id="amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Введите сумму"
            {...register('amount', {
              setValueAs: (value) => Number(value),
            })}
            required
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
        </div>

        {/* Комментарий */}
        <div>
          <label
            htmlFor="comment"
            className="block text-gray-700 mb-2"
          >
            Комментарий
          </label>
          <input
            type="text"
            id="comment"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Введите комментарий"
            {...register('comment')}
          />
          {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Перевести
        </button>
      </form>
    </div>
  )
}

export default BetweenTransfer
