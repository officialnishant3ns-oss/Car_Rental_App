import React from 'react'
import { useState } from 'react'
import api from '../api/api.js'
import { Link } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post("/user/login", {
        email,
        password
      })
      console.log("Login success:", res.data)
      localStorage.setItem("token", res.data.Token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      setEmail('')
      setPassword('')
      console.log("submited")
    } catch (err) {
      console.log("Login failed:", err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className=" flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <input
          type="email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          placeholder="Enter your Email"
          className="border-2 border-gray-400 p-4 outline-none rounded-xl w-full font-semibold focus:border-amber-400"
        />

        <input
          type="password"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          placeholder="Enter your Password"
          className="border-2 border-gray-400 p-4 outline-none rounded-xl w-full font-semibold focus:border-amber-400"
        />

        <p className="text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </p>
        <button
          disabled={Loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl w-full mt-2"
        >
          {Loading ? "Logging In" : "Login"}
        </button>

      </form>
    </div>
  )
}

export default Login
