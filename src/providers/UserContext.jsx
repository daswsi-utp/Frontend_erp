'use client'
import React, { createContext, useEffect, useState, useContext, useRef, useMemo } from 'react'
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"

const backend_host = process.env.NEXT_PUBLIC_BACKEND_HOST

const UserContext = createContext()

export const UserProvider = ({ children }) => {
 const [authTokens, setAuthTokens] = useState(() => {
  if (typeof window !== "undefined") {
   const tokens = localStorage.getItem("authTokens")
   return tokens ? JSON.parse(tokens) : null
  }
  return null
 })
 const [user, setUser] = useState(() => {
  if (typeof window !== "undefined") {
   const tokens = localStorage.getItem("authTokens")
   return tokens ? jwtDecode(tokens) : null
  }
  return null
 })

 const authTokensRef = useRef(authTokens)
 const userRef = useRef(user)

 const loginUser = async (credentials) => {
  try {

   const response = await axios.post(
    `${backend_host}/api/auth/login`,
    {
     username: credentials.email,
     password: credentials.password
    },
    {
     headers: {
      "Content-Type": "application/json"
     },
     withCredentials: true
    }
   )
   if (response.status == 200) {
    const data = response.data
    const accessToken = data.accessToken
    const refreshToken = data.refreshToken
    const user = {
     id: data.id,
     email: data.email,
     dni: data.dni
    }

    const expiresAt = data.expireAt
    const message = data.message

    if (accessToken && refreshToken && expiresAt && user) {
     const tokens = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
      user: user,
      message: message
     }
     setAuthTokens(tokens)
     authTokensRef.current = tokens
     setUser(jwtDecode(accessToken))
     userRef.current = jwtDecode(accessToken)

     localStorage.setItem("authTokens", JSON.stringify(tokens))
     localStorage.setItem("user", JSON.stringify(user))

     window.location.href = "/"
    } else {
     console.error("Error: Missing tokens or user data in response")
    }
   } else {
    alert('Something went wrong | incorrect credentials')
   }
  } catch (error) {
   console.error("Login failed:", error);
   alert("Invalid credentials. Please try again.");
  }
 }

 const logoutUser = async () => {
  toast("Tu sesión ha sido cerrada con éxito. ¡Hasta pronto!", {
   action: {
    label: "Aceptar",
    onClick: () => console.log("Sesión cerrada confirmada"),
   },
  })

  try {
   if (authTokensRef.current) {
    await axios, delete (
     `${backend_host}/api/v1/general/users/sign_out/`,
     {
      headers: {
       'Content-Type': 'application/json',
       Authorization: "Bearer " + authTokensRef.current.access_token,
      },
     }
    )
   }
  } catch (error) {
   console.error("Error al cerrar sesión:", error.response ? error.response.data : error.message)
  } finally {
   authTokensRef.current = null
   userRef.current = null
   localStorage.removeItem("authTokens")
   localStorage.removeItem("user")
   setAuthTokens(null)
   setUser(null)
   window.location.href = "/login"
  }
 }

 const updateToken = async () => {
  try {
   const response = await axios.post(
    `${backend_host}/api/v1/general/users/tokens/`,
    {
     headers: {
      "Content-Type": "application/json",
      "Refresh-Token": authTokensRef.current?.refresh_token,
      Authorization: "Bearer " + authTokensRef.current?.access_token,
     },
    }
   )
   if (response.status == 200) {
    const data = response.data
    const accessToken = data.access_token
    const refreshToken = data.refresh_token
    const expiresAt = data.expires_at

    if (accessToken && refreshToken && expiresAt) {
     const tokens = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
     }
     authTokensRef.current = tokens
     userRef.current = jwtDecode(accessToken)
     setAuthTokens(tokens)
     setUser(jwtDecode(accessToken))

     localStorage.setItem('authTokens', JSON.stringify(tokens))
     localStorage.setItem('user', JSON.stringify(data.user))

    } else {
     console.error("Error: Missing tokens in response")
    }
   } else {
    alert('Something went wrong | Please try again later')
   }
  } catch (error) {
   console.error('Error en updateToken:', error.response ? error.response.data : error.message)
   alert('Something went wrong | Please try again later')
   logoutUser()
  }
 }

 useEffect(() => {
  const axiosInterceptor = axios.interceptors.response.use(
   (response) => response,
   (error) => {
    if (error.response?.status === 401) {
     logoutUser()
    }
    return Promise.reject(error)
   }
  )
  return () => axios.interceptors.response.eject(axiosInterceptor)
 }, [])

 useEffect(() => {
  const axiosInterceptor = axios.interceptors.request.use(
   (config) => {
    const token = authTokensRef.current?.access_token
    if (token) {
     config.headers.Authorization = `Bearer ${token}`
    }
    return config
   },
   (error) => Promise.reject(error)
  )
  return () => axios.interceptors.request.eject(axiosInterceptor)
 }, [])

 useEffect(() => {
  if (authTokensRef) {
   axios.defaults.headers.common["Authorization"] = "Bearer " + authTokensRef.current?.access_token;
  } else {
   delete axios.defaults.headers.common["Authorization"]
   localStorage.removeItem("authTokens")
  }
 }, [authTokensRef])

 useEffect(() => {
  authTokensRef.current = authTokens
  userRef.current = user
 }, [authTokensRef, userRef])

 useEffect(() => {
  const intervalId = setInterval(() => {
   const expireAtRefInSeconds = parseInt(authTokensRef.current?.expire_at) || 0
   const expireAtInMillis = expireAtRefInSeconds * 1000
   const currentTime = new Date().getTime()
   const fiveMinutesInMillis = 5 * 60 * 1000
   const rest = expireAtInMillis - currentTime
   if (rest <= fiveMinutesInMillis && authTokens) {
    updateToken()
   }
  }, 60000)
  return () => clearInterval(intervalId)
 }, [authTokensRef])

 const contextData = useMemo(() => ({
  user: userRef?.current,
  authTokens: authTokensRef?.current,
  loginUser,
  logoutUser,
  setAuthTokens,
  setUser,
 }), [authTokensRef])

 return (
  <UserContext.Provider value={contextData}>
   {children}
  </UserContext.Provider>
 )
}

export const useAuth = () => useContext(UserContext)

export default UserContext
