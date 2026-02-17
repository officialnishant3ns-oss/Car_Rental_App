import React, { useEffect, useState, createContext } from 'react'
import axios from "axios"

export const AppContext = createContext()

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1"
})

const AppContextProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [car, setCar] = useState('')

    useEffect(() => {
        console.log("Token from state:", token)
        console.log("Token from localStorage:", localStorage.getItem("token"))

        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`
            setIsLoggedIn(true)
            getUser()
        }
    }, [token])   


    const getUser = async () => {
        try {
            const { data } = await api.get("/user/getuser")
             console.log(data)
            setUser(data)
            setIsOwner(data.role === "owner")
        } catch (error) {
            logout()
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem("token")
        delete api.defaults.headers.common["Authorization"]
    }
  const getCars = async () => {
    try {
      const { data } = await api.get("/car/getallcar");
      setCar(data);
      console.log(data)
    } catch (error) {
      console.log(error)
    } 
  }

  useEffect(() => {
    getCars()
  }, [])

    return (
        <AppContext.Provider value={{
            token,
            setToken,
            car,
            setCar,
            user,
            setUser,
            isOwner,
            isLoggedIn,
            logout
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
