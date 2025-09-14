import React, { useEffect } from 'react';
import useUserStore from './store/zustand/userStore';
import Login from './features/auth/login';

export default function App() {
  const { user, accessToken } = useUserStore();

  useEffect(() => {
    console.log(user); // Access the user data
    console.log(accessToken); // Access the access token
  }, []);

  if (!user || !accessToken) {
    return (
      <div className="items-center justify-center">
        <Login/>
      </div>
    );
  }

  return (
    <div className="items-center justify-center flex h-screen">
      React Starter project
    </div>
  );
}
