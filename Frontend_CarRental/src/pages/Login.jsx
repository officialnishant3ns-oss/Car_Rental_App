import React from 'react'
import { useState } from 'react'
import api from '../api/api.js'
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { AppContext } from "../context/AppContext"


const Login = ({setShowLogin}) => {
const { setToken } = useContext(AppContext)


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
      setToken(res.data.Token)
      setUser(res.data.user)
      localStorage.setItem("token", res.data.Token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      setShowLogin(false) 
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
    <div
      onClick={()=>{setShowLogin(false)}}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <form
        onClick={(e)=>e.stopPropagation()}
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-scaleIn"
      >

        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login to continue</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            required
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="password"
            value={password}
            required
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            onClick={()=>{setShowLogin(false)}}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>

        <button
          disabled={Loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] transition disabled:opacity-60"
        >
          {Loading ? "Logging In..." : "Login"}
        </button>

      </form>
     
    </div>
  )
}

export default Login
