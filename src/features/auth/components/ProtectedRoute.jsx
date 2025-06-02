'use client'
import { useAuth } from '@/providers/UserContext'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ROLES, getRolePermissions, getModuleFromRole } from '@/lib/config/roles'
import Spinner from '@/components/shared/Spinner'

export default function ProtectedRoute({ children, allowedRoles, requiredPermissions }) {
 const { user, loading } = useAuth()
 const pathname = usePathname()
 const router = useRouter()
 const [isClient, setIsClient] = useState(false)

 useEffect(() => {
  setIsClient(true)
 }, [])

 useEffect(() => {
  if (!loading && isClient) {
   if (!user) {
    router.replace(`/login`)
    return
   }

   if (user.role === ROLES.ADMIN && pathname !== '/') {
    redirect('/')
    return
   }

   if (user.role && user.role !== ROLES.ADMIN) {
    const module = getModuleFromRole(user.role)
    if (module && !pathname.startsWith(`/${module}`)) {
     redirect(`/${module}`)
     return
    }
   }

   if (requiredPermissions) {
    const userPermissions = getRolePermissions(user.role)
    const hasPermission = Object.keys(requiredPermissions).every(
     key => userPermissions.permissions?.[key] === requiredPermissions[key]
    )

    if (!hasPermission) {
     redirect('/unauthorized')
     return
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
     router.replace('/unauthorized')
     return
    }

   }
  }
 }, [user, loading, allowedRoles, pathname, requiredPermissions, isClient])

 if (loading || !isClient) {
  return <Spinner />
 }



 return children
}