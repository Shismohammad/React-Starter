import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Login from './features/auth/login.jsx';
import NavBar from './components/NavBar.jsx';
import useUserStore from './store/zustand/userStore.js';

export default function App() {
  const { user } = useUserStore();
  const userData = localStorage.getItem('user');

  if (!userData) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
