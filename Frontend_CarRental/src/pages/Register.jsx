import api from '../api/api.js'
import { useState } from 'react'

const Register = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post('/user/register', {
        fullname,   
        email,
        password
      })

      console.log('Login success:', res.data)

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      setFullname('')
      setEmail('')
      setPassword('')
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >

        <input
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          type="text"
          placeholder="Enter your Name"
          className="border-2 border-gray-400 p-4 rounded-xl outline-none font-semibold focus:border-amber-400"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your Email"
          className="border-2 border-gray-400 p-4 rounded-xl outline-none font-semibold focus:border-amber-400"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your Password"
          className="border-2 border-gray-400 p-4 rounded-xl outline-none font-semibold focus:border-amber-400"
        />

        <button
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl mt-2"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>
    </div>
  )
}

export default Register
