import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import "../css/loginPage.css"
import dotenv from 'dotenv'

function Login() {
  dotenv.config()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${baseURL}/login`, { email, password })
    login(res.data.user, res.data.accessToken)
    setEmail('')
    setPassword('')
    navigate('/home')
  }

  return (
    <>
      {/* Back Button */}
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

      {/* Responsive Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen loginPage">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center p-8 bg-white left-section">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Explore and Enjoy, Just Login</h2>
            <form onSubmit={handleSubmit}>
              <fieldset className="bg-base-200 border border-base-300 rounded-lg p-6">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300 mb-4"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300 mb-4"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <button className="btn btn-neutral w-full mt-2 login-btn">Login</button>
              </fieldset>
            </form>

            <div className="text-center mt-4 create-account">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center justify-center p-8 right-section">
          <div className="max-w-lg text-center inside-right-section">
            <h2>Welcome back!</h2>
            <p >
              Summer is calling, let's dive into fun experiences together.
              Share your favorite moments, explore exciting stories, and make this season shine.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

