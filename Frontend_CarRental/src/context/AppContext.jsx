import React, { useEffect, useState } from 'react'
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1"
})
const AppContext = ({ children }) => {

    const [token, setTokens] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)
    const [car, setCar] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`
            localStorage.setItem("token", token)
            setIsLoggedIn(true);
            getUser();
        }
    }, []
    )


    const getUser = async () => {
        try {
            const { data } = await api.get("/user/getuser");
            setUser(data)
            if (data.role === "owner") {
                setIsOwner(true);
            } else {
                setIsOwner(false)
            }

        } catch (error) {
            logout();
        }
    }

    return (
        <AppContext.Provider value={{ token, user }}>{children}</AppContext.Provider>
    )
}

export default AppContext
