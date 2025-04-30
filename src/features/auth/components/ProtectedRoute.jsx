// src/components/ProtectedRoute.jsx
'use client'
import { useAuth } from '@/providers/UserContext'
import { redirect, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children, allowedRoles }) {
 const { user, loading } = useAuth()
 const pathname = usePathname()

 useEffect(() => {
  if (!loading) {
   if (!user) {
    redirect('/login')
   } else if (allowedRoles && !allowedRoles.includes(user.role)) {
    redirect('/unauthorized')
   }

   if (pathname.startsWith('/crm/administrador') && user.role !== 'administrador') {
    redirect('/crm')
   }
  }
 }, [user, loading, allowedRoles, pathname])

 if (loading || !user || (allowedRoles && !allowedRoles.includes(user.role))) {
  return (
   <div className="flex h-screen items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
   </div>
  )
 }

 return children
}