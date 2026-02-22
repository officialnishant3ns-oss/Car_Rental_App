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
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common["Authorization"]
    }
  }, [token])


  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) setToken(storedToken)
  }, [])

  useEffect(() => {
    if (token) getUser()
  }, [token])

  const getUser = async () => {
    try {
      const { data } = await api.get("/user/getuser")

      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))

      if (data?.role === "owner") setIsOwner(true)

    } catch (error) {
      console.log("GetUser Error:", error)
      toast.error("Session expired. Please login again")
      logout()
    }
  }
  const logout = () => {
    setToken(null)
    setUser(null)
    setIsOwner(false)

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    toast.info("Logged out successfully")
  }

  const getCars = async () => {
    try {
      const { data } = await api.get("/car/getallcar")

      if (data?.status) {
        setCar(data.data) 
      } else {
        setCar([])
      }

    } catch (error) {
      console.log("Cars Error:", error)
      toast.error("Failed to fetch cars")
    }
  }
  useEffect(() => {
    getCars()
  }, [])

  const changeRole = async () => {
    try {
      const { data } = await api.patch(
        "/user/change-role",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setIsOwner(true)
      if (data?.success) {
        toast.success(data.message)
      } else {
        toast.error(data?.message || "Role update failed")
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      )
    }
  }



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
        api,
        changeRole,
        getCars
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
