// components/PublicRoute.tsx
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  children: React.ReactNode
}
export default function PublicRoute({ children }: PublicRouteProps) {
  let isAuthenticated
  let role
  let dashboardPath = null

  try {
    isAuthenticated = localStorage.getItem("token")
    role = localStorage.getItem("role")
  } catch (error) {
    console.error("Error reading from localStorage:", error)
  }

  if (isAuthenticated) {
    switch (role) {
      case "USER":
        dashboardPath = '/dashboard/user'
        break
      case "ORGANIZATION":
        dashboardPath = '/dashboard/organization'
        break
      default:
        dashboardPath = '/'
    }

    return <Navigate to={dashboardPath} replace />
  }

  return <>{children}</>
}