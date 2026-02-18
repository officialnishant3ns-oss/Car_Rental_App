import React, { useEffect, useState, createContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AppContext = createContext()

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1"
})

const AppContextProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [isOwner, setIsOwner] = useState(false)
  const [car, setCar] = useState([])
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")

    if (storedToken) {
      setToken(storedToken)
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
      getUser(storedToken)
    }
  }, [])

  useEffect(() => {
    console.log("Token state:", token)
    console.log("Stored token:", localStorage.getItem("token"))

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      getUser(token)
    }
  }, [token])

  const getUser = async (authToken) => {
    try {
      const { data } = await api.get("/user/getuser", {
        headers: {
          Authorization: `Bearer ${authToken || token}`
        }
      })

      console.log("User Data:", data)

      setUser(data)
      setIsOwner(data.role === "owner")
      localStorage.setItem("user", JSON.stringify(data))
   
    } catch (error) {
      toast.error("Session expired. Please login again", error)
      console.log("GetUser Error:", error)
      logout()
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setIsOwner(false)

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    delete api.defaults.headers.common["Authorization"]

    toast.info("Logged out successfully")
  }

  const getCars = async () => {
    try {
        const { data } = await api.get("/car/getallcar", {
        headers: {
          Authorization: `Bearer ${authToken || token}`
        }
      })
      console.log("Cars:", data)
      setCar(data)
    } catch (error) {
      console.log("Cars Error:", error)
      toast.error("Failed to fetch cars", error)
    }
  }

  useEffect(() => {
    getCars()
  }, [])

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        car,
        setCar,
        isOwner,
        logout,
        showLogin,
        setShowLogin,
        api
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
