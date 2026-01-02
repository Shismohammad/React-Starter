import useUserStore from '../../store/zustand/userStore';
import { login } from '../../services/auth/auth-service';

export default function Login() {
  const { setUser, setAccessToken } = useUserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await login({
        username: username,
        password: password,
      });
      setUser(response);
      setAccessToken(response.accessToken);
      console.log('User Login successfully');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="h-screen justify-center items-center flex">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="space-y-4 w-72"
      >
        <>
          <label className="block">
            <span>Email</span>
            <input
              className="flex h-9 w-full rounded-md border-fuchsia-500 border shadow-md mt-1 px-3"
              type="text"
              name="username"
              autoComplete="username"
            />
          </label>

          <label className="block">
            <span>Password</span>
            <input
              className="flex h-9 w-full rounded-md border-fuchsia-500 border shadow-md mt-1 px-3"
              type="password"
              name="password"
              autoComplete="current-password"
            />
          </label>

          <div className="justify-center flex flex-col gap-4">
            <button
              type="submit"
              className="bg-fuchsia-600 h-9 rounded-full text-white hover:bg-fuchsia-500"
            >
              Log in
            </button>

            <button className="h-9 rounded-full text-fuchsia-600 hover:text-fuchsia-400 border-fuchsia-600 border">
              Register
            </button>
          </div>
        </>
      </form>
    </div>
  );
}
