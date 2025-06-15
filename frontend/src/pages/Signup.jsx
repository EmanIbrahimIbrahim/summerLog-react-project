import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${baseURL}/register`, { name, email, password })
    navigate('/login')
  }

  return (

    <>
      <div
        className="fixed top-4 left-4 z-50 cursor-pointer text-pink-500 hover:text-pink-700"
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen loginPage">
        <div className='flex flex-col justify-center items-center p-8 bg-white left-section'>
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Better late than never !</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

              <label className="label">Name</label>
              <input type="text" className="input  border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

              <label className="label">Email</label>
              <input type="email" className="input  border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

              <label className="label">Password</label>
              <input type="password" className="input  border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

              <button className="btn btn-neutral mt-4 login-btn">Signup</button>
            </fieldset>
          </form>
          <div className='create-account'>
            <p> have an account <Link to="/login" className='text-blue-500 hover:underline'>Login</Link></p>

          </div>
        </div>
        <div className='hidden lg:flex items-center justify-center p-8 right-section'>
          <div className='max-w-lg text-center inside-right-section'>
            <h2>Summer is here, and the fun is just getting started</h2>
            <p>Join us and share your favorite summer moments, discover cool adventures, and connect with others , Sign up now and make this summer unforgettable</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default Signup
