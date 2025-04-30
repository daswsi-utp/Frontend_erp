import React, { createContext, useEffect, useState, useContext, useRef, useMemo } from 'react'
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"

const backend_host = import.meta.env.NEXT_BACKEND_HOST

const UserContext = createContext()

export const UserProvider = ({ children }) => {
 const [loading, setLoading] = useState(false)
 const [authTokens, setAuthTokens] = useState(() =>
  localStorage.getItem("authTokens")
   ? JSON.parse(localStorage.getItem("authTokens"))
   : null
 )
 const [user, setUser] = useState(() =>
  localStorage.getItem("authTokens")
   ? jwtDecode(localStorage.getItem("authTokens"))
   : null
 )

 const authTokensRef = useRef(authTokens)
 const userRef = useRef(user)

 const loginUser = async (credentials) => {
  try {
   const response = await axios.post(
    `${backend_host}/api/v1/general/users/sign_in/`,
    {
     authentication: {
      document_number: credentials.document_number,
      password: credentials.password,
     },
    },
    {
     headers: { "Content-Type": "application/json" },
    }
   )
   if (response.status == 200) {
    const data = response.data
    const accessToken = data.access_token
    const refreshToken = data.refresh_token
    const user = data.user
    const expiresAt = data.expires_at
    const message = data.message

    if (accessToken && refreshToken && expiresAt && uesr) {
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
   console.error('Error en loginUser:', error.response ? error.response.data : error.message)
   alert('Something went wrong | Please try again later')
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



}