import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="items-center justify-center flex h-screen flex-col gap-4">
      <div>404 - Page Not Found</div>

      <Link to={'/home'}>
        <button className="bg-fuchsia-600 h-9 px-4 rounded-full text-white hover:bg-fuchsia-500">
          Go to homepage
        </button>
      </Link>
    </div>
  );
}
