import { IUser } from '../types'

const mockUsers: IUser[] = [
  { id: 1, name: 'Daniil Demkin', email: 'demkin@gmail.com' },
  { id: 2, name: 'Ivan Ivanov', email: 'ivanov@gmail.com' },
]

interface ILoginUserProps {
  email: string
}

interface ILoginUserResponse {
  token: string
  user: IUser
}

const loginUser = async ({ email }: ILoginUserProps): Promise<ILoginUserResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((user) => user.email === email)

  if (!user) throw new Error('User is not found')

  return { token: `token-alfa-bank-${user.id}`, user }
}

export default loginUser
