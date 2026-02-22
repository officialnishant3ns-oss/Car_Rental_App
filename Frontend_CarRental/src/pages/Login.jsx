import React, { useState, useContext, useEffect } from "react"
import api from "../api/api.js"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
  const { setToken, setUser,showLogin, setShowLogin, } = useContext(AppContext)
       
  const navigate = useNavigate()
  
  const [mode, setMode] = useState("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setUsername("")
    setEmail("")
    setPassword("")
  }, [mode])

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
     const endpoint = mode === "login" ? "/user/login" : "/user/register"
      const payload = mode === "login"   ? { email, password }: { fullname: username, email, password}

      const res = await api.post(endpoint, payload)

      const token = res.data.Token
      const user = res.data.user
      console.log(res.data)
      setToken(token)
      setUser(user)
      navigate('/')

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      
      setShowLogin(false)
      if(mode === 'login'){
        toast.success("Login successful")
      }else{
         toast.success("Register successful")
      }
      

    } catch (err) {
      toast.error( err.response?.data?.message ||
        err.response?.data?.msg ||
        err.message )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-scaleIn"
      >
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold text-gray-800">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm">
            {mode === "login" ? "Login to continue" : "Sign up to get started"}
          </p>
        </div>

        <div className="space-y-4">
          {mode === "register" && (
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          )}

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>


        <div className="text-sm text-center text-gray-600">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] transition disabled:opacity-60"
        >
          {loading
            ? mode === "login"
              ? "Logging In..."
              : "Creating Account..."
            : mode === "login"
            ? "Login"
            : "Register"}
        </button>
      </form>
    </div>
  )
}

export default Login
