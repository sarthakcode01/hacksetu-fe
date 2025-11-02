// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './Componants/ProtectedRoutes.tsx'
import PublicRoute from './Componants/PublicRoutes.tsx'

// Pages
import App from './App.tsx'
import SignupPage from './Pages/Signup.tsx'
import LoginPage from './Pages/Login.tsx'
import DashboardOverview from './Pages/Dashboard-Org.tsx'
import UserDashboard from './Pages/Dashboard-User.tsx'
import MySubmissions from './Pages/User/My-Submissions.tsx'
import FormRender from './Pages/FormRenderer.tsx'
import FormResponses from './Pages/Responses.tsx'

// Components
import FormBuilder from "./Componants/FormBuilder.tsx"

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <PublicRoute>
                        <App />
                    </PublicRoute>
                }
            />
            <Route
                path='/register'
                element={
                    <PublicRoute>
                        <SignupPage />
                    </PublicRoute>
                }
            />
            <Route
                path='/login'
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />

            {/* Protected Routes - Organization */}
            <Route
                path='/dashboard/organization'
                element={
                    <ProtectedRoute allowedRoles={["ORGANIZATION"]}>
                        <DashboardOverview />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/form-builder'
                element={
                    <ProtectedRoute allowedRoles={["ORGANIZATION"]}>
                        <FormBuilder />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/form/response/:formId'
                element={
                    <ProtectedRoute allowedRoles={["ORGANIZATION"]}>
                        <FormResponses />
                    </ProtectedRoute>
                }
            />

            {/* Protected Routes - User */}
            <Route
                path='/dashboard/user'
                element={
                    <ProtectedRoute allowedRoles={["USER"]}>
                        <UserDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/dashboard/user/my-submission'
                element={
                    <ProtectedRoute allowedRoles={["USER"]}>
                        <MySubmissions />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/form/live/:formId'
                element={
                    <ProtectedRoute allowedRoles={["USER"]}>
                        <FormRender />
                    </ProtectedRoute>
                }
            />

            {/* 404 Route */}
            <Route
                path='*'
                element={
                    <div className="flex items-center justify-center h-screen">
                        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
                    </div>
                }
            />
        </Routes>
    )
}