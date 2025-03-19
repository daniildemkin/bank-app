import Card from '../components/Card'
import useAuthState from '../store/auth'

const Profile: React.FC = () => {
  const { user } = useAuthState()
  return (
    <div className="container mx-auto px-4 py-8">
      <Card hover={false}>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Личный кабинет</h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Ваши данные:</h2>

            <p>Имя: {user?.name}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
export default Profile
