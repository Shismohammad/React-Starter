import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import useUserStore from '../store/zustand/userStore';
import { logout } from '../services/auth/auth-service';

export default function NavBar() {
  const navigate = useNavigate();

  const logoutUser = async () => {
    const response = await logout();

    // console.log(response);

    if ((response.statusCode === 200 && response.success) || response.message) {
      console.log('User logged out successfully');
      useUserStore.setState({ user: null, accessToken: null, role: null });
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <>
      <nav className="shadow-lg fixed w-full top-0 left-0 flex flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3 ">
          <img src={logo} className="h-8" alt="Website Logo" />
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            React Starter
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link to="/about" className="py-2 px-3">
                About
              </Link>
            </li>

            <li>
              <Link to="/services" className="py-2 px-3">
                Services
              </Link>
            </li>

            <li>
              <Link to="/contact" className="py-2 px-3">
                Contact
              </Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  logoutUser();
                }}
                className="py-2 px-3"
                aria-current="page"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
