'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Unauthorized from '@/features/auth/components/Unauthorized'// tu componente

const protectedRoutes = [
  '/crm',
  '/customers',
  '/logistic',
  '/manufacture',
  '/planning',
  '/rrhh',
  '/sales'
]

export default function AuthGuard({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(null) // null: no decidido, true: ok, false: no autorizado

  useEffect(() => {
    const token = localStorage.getItem('authTokens')
    const user = localStorage.getItem('user')

    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      if (!token || !user) {
        setAuthorized(false)
        return
      }
    }

    setAuthorized(true)
  }, [pathname])

  if (authorized === null) {
    // Mientras verifica, puedes mostrar spinner o nada
    return null
  }

  if (authorized === false) {
    // Mostrar pantalla de acceso denegado
    return <Unauthorized />
  }

  return children
}
