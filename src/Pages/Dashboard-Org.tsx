import React, { useEffect, useState } from 'react';
import { Sparkles, Plus, LogOut, Bell, Search, FileText, CheckCircle, BarChart3, Sparkles as AiIcon, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function DashboardOverview() {
  const [orgName, setOrgName] = useState("Sarthak Upadhyay");
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState([
    {
      title: "Total Forms Created",
      value: "24",
      change: "+3 this week",
      icon: FileText,
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-500/10 to-purple-500/10"
    },
    {
      title: "Active Forms",
      value: 18,
      change: "6 closed",
      icon: CheckCircle,
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-500/10 to-teal-500/10"
    },
    {
      title: "Total Responses",
      value: "1,247",
      change: "+89 today",
      icon: BarChart3,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    },
  ])
  const navigate= useNavigate()
    async function getProfileData() {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/get-profile`, {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      const data = await res.json()
      return data
    }

 function handleLogout(){
    const toastId=toast.loading("Logging Out")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    toast.remove(toastId)
    toast.success("Logged Out Successfully")
    navigate("/")
    
  }

  useEffect(() => {
    setLoading(true);

    getProfileData().then((data) => {
      const user = data?.user;
      const forms = user?.forms || [];
      console.log(forms)

      // Update organization name
      setOrgName(user?.name || "Unknown Organization");

      // Count live forms
      const liveFormCount = forms.filter((form) => form.status === "LIVE").length;

      // Update stats safely
      const updatedStats = stats.map((item, index) => {
        switch (index) {
          case 0:
            return { ...item, value: forms.length };
          case 1:
            return { ...item, value: liveFormCount };
          default:
            return item;
        }
      })
      setStats(updatedStats);
    })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      })
      .finally(() => {
        setLoading(false);
      });




  }, [])

  if (loading) {
    return <div className=" flex items-center justify-center min-h-screen min-w-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950">
      <div className='text-blue-500 text-3xl'>Loading</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-indigo-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={()=>navigate("/")}>
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                FormEaseAI
              </span>
            </div>

            {/* Search Bar (Middle) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search forms..."
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-800/50 border border-indigo-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:bg-slate-800 transition-all">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center space-x-3 px-3 py-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:bg-slate-800 transition-all cursor-pointer">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  TC
                </div>
                <span className="hidden md:block text-slate-300 text-sm font-medium">{orgName}</span>
              </div>

              {/* Logout Button */}
              <button className="p-2 bg-slate-800/50 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all group" onClick={handleLogout}>
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>








      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {orgName} 👋
            </h1>
            <p className="text-slate-400 text-lg">
              Here's what's happening with your forms today
            </p>
          </div>

          {/* Create New Form Button */}
          <button className="mt-4 md:mt-0 group flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/60 transition-all duration-300" onClick={() => window.location.href = "/form-builder"}>
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Create New Form</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${stat.bgGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Card Content */}
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-400/50 transition-all duration-300 cursor-pointer">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-linear-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Stats */}
                  <div className="mb-2">
                    <h3 className="text-slate-400 text-sm font-medium mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>

                  {/* Change Indicator */}
                  <div className="flex items-center space-x-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">{stat.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Activity Card */}
          <div className="md:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {[
                { action: "New response received", form: "Job Application Form", time: "2 minutes ago", color: "text-green-400" },
                { action: "Form published", form: "Customer Feedback Survey", time: "1 hour ago", color: "text-blue-400" },
                { action: "AI summary generated", form: "Event Registration", time: "3 hours ago", color: "text-purple-400" },
                { action: "Form created", form: "Internship Application", time: "Yesterday", color: "text-indigo-400" }
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-all cursor-pointer border border-transparent hover:border-indigo-500/30"
                >
                  <div className={`w-2 h-2 ${activity.color} rounded-full mt-2`}></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-slate-400 text-sm">{activity.form}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>

            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-4 bg-linear-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl hover:from-indigo-600/30 hover:to-purple-600/30 transition-all text-left group">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-indigo-300 transition-colors">Create Form</p>
                  <p className="text-slate-400 text-xs">Start from scratch</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 bg-slate-800/30 border border-slate-700 rounded-xl hover:bg-slate-800/50 hover:border-indigo-500/30 transition-all text-left group">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-indigo-300 transition-colors">View Analytics</p>
                  <p className="text-slate-400 text-xs">Check insights</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 bg-slate-800/30 border border-slate-700 rounded-xl hover:bg-slate-800/50 hover:border-indigo-500/30 transition-all text-left group">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <AiIcon className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-indigo-300 transition-colors">AI Assistant</p>
                  <p className="text-slate-400 text-xs">Get suggestions</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}