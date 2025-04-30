'use client'
import { useAuth } from '@/providers/UserContext'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children, allowedRoles }) {
 const { user } = useAuth()

 useEffect(() => {
  if (!user) {
   redirect('/login')
  } else if (allowedRoles && !allowedRoles.includes(user.role)) {
   redirect('/unauthorized') // Puedes crear esta página
  }
 }, [user, allowedRoles])

 if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
  return null // O un spinner de carga
 }

 return children
}