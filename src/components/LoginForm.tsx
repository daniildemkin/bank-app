import { useForm } from 'react-hook-form'
import Input from './UI/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuthState from '../store/auth'
import { useState } from 'react'
import loginUser from '../api/auth'
import Button from './UI/Button'

const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
})

type TypeLoginSchema = z.infer<typeof loginSchema>

const LoginForm: React.FC = () => {
  const { setToken, setUser } = useAuthState()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeLoginSchema>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: TypeLoginSchema) => {
    try {
      setError(null)
      const response = await loginUser({ email: data.email })
      setToken(response.token)
      setUser(response.user)
    } catch (e) {
      setError('Пользователь не найден')
    }
  }

  return (
    <form
      className="w-full max-w-sm p-6 bg-red-600 rounded-lg shadow-md text-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
      <div className="space-y-4">
        <Input
          {...register('email')}
          error={errors.email?.message}
          label="Email"
          type="email"
          placeholder="example@mail.com"
          className="text-black"
        />
        {error && <span className="text-white">{error}</span>}
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
        >
          Войти
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
