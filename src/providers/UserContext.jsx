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



}



e