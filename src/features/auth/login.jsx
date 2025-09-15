import useUserStore from '../../store/zustand/userStore';
import { login } from '../../services/auth/auth-service';

export default function Login() {
  const { setUser, setAccessToken } = useUserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('Logging in with:', { email, password });

    try {
      const response = await login({ email, password });
      console.log('Login response:', response);
      setUser(response.user);
      setAccessToken(response.accessToken);
      alert('Login successful');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="h-screen justify-center items-center flex">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="space-y-4 w-64"
      >
        <>
          <label className="block">
            <span>Email</span>
            <input
              className="flex h-9 w-full rounded-md border-fuchsia-500 border-1 shadow-md mt-1"
              type="email"
              name="email"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span>Password</span>
            <input
              className="flex h-9 w-full rounded-md border-fuchsia-500 border-1 shadow-md mt-1"
              type="password"
              name="password"
              autoComplete="current-password"
            />
          </label>
          <div className="justify-center flex flex-col gap-4">
            <button
              type="submit"
              className="bg-fuchsia-600 h-9 px-4 py-2 rounded-full text-white hover:bg-fuchsia-500"
            >
              Log in
            </button>
            <button className="font-medium text-blue-600 hover:text-blue-400">
              Register
            </button>
          </div>
        </>
      </form>
    </div>
  );
}
