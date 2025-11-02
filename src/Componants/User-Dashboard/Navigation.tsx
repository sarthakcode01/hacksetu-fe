import { CheckCircle, LayoutDashboard, User } from "lucide-react"
import { NavLink } from "react-router-dom"


const Navigation = () => {
  const activeClass=`bg-linear-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-white font-medium`
  const NonActiveClass=`hover:bg-slate-800/50 text-slate-300 hover:text-white transition-all`
  return (
    <nav className="flex-1 p-4 space-y-2">
            <NavLink to="/dashboard/user" end className={({isActive})=>`flex items-center space-x-3 px-4 py-3  rounded-xl ${isActive?activeClass:NonActiveClass}`}>
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/dashboard/user/my-submission" className={({isActive})=>`flex items-center space-x-3 px-4 py-3  rounded-xl ${isActive?activeClass:NonActiveClass}`}>
              <CheckCircle className="w-5 h-5" />
              <span>My Submissions</span>
            </NavLink>
            <NavLink to="#profile" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-800/50 rounded-xl text-slate-300 hover:text-white transition-all">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </NavLink>
          </nav>
  )
}

export default Navigation