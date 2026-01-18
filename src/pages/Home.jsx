import useUserStore from '../store/zustand/userStore';
import {
  getCurrentUser,
  getUserDecrypted,
} from '../services/user/user-service';
import Toast from '../components/Toast';

export default function Home() {
  const { user } = useUserStore();

  const getUser = async () => {
    const response = await getUserDecrypted();
    console.log(response);
  };

  return (
    <>
      <Toast />
      <div className="items-center justify-center flex h-screen flex-col gap-4">
        <div className="font-serif text-4xl">
          Welcome {user?.username || 'User'} !
        </div>

        <button
          onClick={() => {
            getUser();
          }}
          type="submit"
          className="bg-fuchsia-600 h-9 px-4 rounded-full text-white hover:bg-fuchsia-500"
        >
          Get User
        </button>
      </div>
    </>
  );
}
