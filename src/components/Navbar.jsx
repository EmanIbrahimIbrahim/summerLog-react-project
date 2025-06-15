import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import "../css/navbar.css";
function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate();

  const isActiveLink = ({ isActive }) =>
    isActive ? 'active' : '';


  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate('/');
    }, 0);
  };
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full navbar">
          <div className="lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2  px-2 navbar-logo">SummerLog</div>
          <div className="hidden  lg:block ">
            <ul className="menu menu-horizontal">
              <li><NavLink to="/home" end className={isActiveLink}>All Posts</NavLink></li>
              <li><NavLink to="/home/myPosts" className={isActiveLink}>My Posts</NavLink></li>
              <li><NavLink to="/home/AddPost" className={isActiveLink}>Add New Post</NavLink></li>
            </ul>
          </div>
          <div>
            <button onClick={handleLogout} className='btn  btn-neutral w-[5em]'>Logout</button>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li><NavLink to="/home" end className={isActiveLink}>All Posts</NavLink></li>
          <li><NavLink to="/home/myPosts" className={isActiveLink}>My Posts</NavLink></li>
          <li><NavLink to="/home/AddPost" className={isActiveLink}>Add New Post</NavLink></li>

        </ul>

      </div>
    </div>
  )
}

export default Navbar
