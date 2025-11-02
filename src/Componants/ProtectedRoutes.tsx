
import { Navigate } from "react-router-dom";

type Role = "ORGANIZATION" | "USER" | "ADMIN";

interface ProtectedRouteProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") as Role | null;

  if (!token) return <Navigate to="/login" />; // not logged in
  if (!role || !allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
