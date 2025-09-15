import React, { useEffect } from 'react';
import useUserStore from './store/zustand/userStore';
import Login from './features/auth/login';
import { getCurrentUser } from './services/user/user-service';
import { logout } from './services/auth/auth-service';

export default function App() {
  const { user, accessToken } = useUserStore();

  useEffect(() => {
    console.log(user);
    console.log(accessToken);
  }, []);

  const getUser = async () => {
    const response = await getCurrentUser();
    console.log(response);
  };

  const logoutUser = async () => {
    const response = await logout();

    console.log(response);

    if (response.statusCode === 200 && response.success) {
      console.log('User logged out successfully');
      useUserStore.setState({ user: null, accessToken: null, role: null });
    }
  };

  if (user === null) {
    return (
      <div className="items-center justify-center">
        <Login />
      </div>
    );
  }

  return (
    <div className="items-center justify-center flex h-screen flex-col gap-4">
      Welcome {user?.username || 'User'} !
      <button
        onClick={() => {
          logoutUser();
        }}
        type="submit"
        className="bg-lime-500 h-9 px-4 py-2 rounded-full text-white hover:bg-lime-300"
      >
        Log Out
      </button>
      <button
        onClick={() => {
          getUser();
        }}
        type="submit"
        className="bg-fuchsia-600 h-9 px-4 py-2 rounded-full text-white hover:bg-fuchsia-500"
      >
        Get User
      </button>
    </div>
  );
}
