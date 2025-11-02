import { useEffect, useState } from 'react';
import { Sparkles, Search, Clock, Building2, FileText, CheckCircle, User, LogOut, Settings, LayoutDashboard, Menu, X, ArrowRight, Calendar } from 'lucide-react';
import Navigation from '../Componants/User-Dashboard/Navigation';
import { useNavigate } from "react-router-dom"
import Loader from '../Componants/LoadingSpinner';
import handleLogout from '../lib/handleLogout';


export default function UserDashboard() {
  const [userName, setUserName] = useState(localStorage.getItem("name"));
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [availableForms,setAvailableForms] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  
  //   {
  //     id: 1,
  //     title: "Software Engineering Internship Application",
  //     description: "Apply for our Summer 2025 Software Engineering Internship program. We're looking for talented developers.",
  //     company: "TechCorp Solutions",
  //     deadline: "Jan 15, 2025",
  //     status: "urgent",
  //   },
  //   {
  //     id: 2,
  //     title: "Customer Satisfaction Survey",
  //     description: "Help us improve our services by sharing your feedback. This survey takes only 5 minutes.",
  //     company: "StartupHub Inc",
  //     deadline: "Jan 20, 2025",
  //     status: "open",
  //   },
  //   {
  //     id: 3,
  //     title: "Event Registration - Tech Summit 2025",
  //     description: "Register for the biggest tech conference of the year. Limited seats available.",
  //     company: "EventCo",
  //     deadline: "Jan 10, 2025",
  //     status: "open",
  //   },
  //   {
  //     id: 4,
  //     title: "Product Beta Testing Signup",
  //     description: "Be among the first to test our new AI-powered analytics tool and provide valuable feedback.",
  //     company: "InnovateLabs",
  //     deadline: "Jan 25, 2025",
  //     status: "open",
  //   },
  //   {
  //     id: 5,
  //     title: "Scholarship Application Form",
  //     description: "Apply for our merit-based scholarship program for undergraduate students in Computer Science.",
  //     company: "EduFoundation",
  //     deadline: "Jan 30, 2025",
  //     status: "open",
  //   },
  // ];

  const filteredForms = availableForms.filter(form => 
    form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: any) => {
    if (status === 'urgent') return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  

  //   const getCategoryColor = (category) => {
  //     const colors = {
  //       'Job Application': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  //       'Survey': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  //       'Event': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  //       'Research': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  //       'Education': 'bg-green-500/20 text-green-400 border-green-500/30',
  //       'Volunteer': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  //     };
  //     return colors[category] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  //   };


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
  // useEffect(() => {
  //   setLoading(true)

  // getProfileData().then((data)=>{
  //   setUserName(data.user.name)
  // })
  // .catch((err)=>{
  //   console.log(err)
  // })
  // .finally(()=> setLoading(false))




  // }, [])
  async function fetchAllForms(){
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/form/show-all-available-forms`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    const data =await res.json()
    return data
  }
  useEffect(() => {
    fetchAllForms()
    .then(data=>setAvailableForms(data.forms))
    
  }, [])


  if (loading) {
    return <div className=" flex items-center justify-center min-h-screen min-w-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950">
      <Loader />
    </div>
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900/50 backdrop-blur-xl border-r border-indigo-500/20 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-indigo-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                FormEaseAI
              </span>
            </div>
          </div>

          {/* Navigation */}
          <Navigation />

          {/* User Card */}
          <div className="p-4 border-t border-indigo-500/20">
            <div className="bg-slate-800/30 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  RS
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{userName}</p>
                  <p className="text-slate-400 text-xs">Student</p>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white text-sm transition-all">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-indigo-500/20 sticky top-0 z-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-all"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-auto px-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search forms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-3 py-2 bg-slate-800/50 border border-indigo-500/30 rounded-xl hover:bg-slate-800 transition-all"
                >
                  <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    RS
                  </div>
                  <span className="hidden md:block text-slate-300 text-sm font-medium">{userName}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-2xl py-2 z-10">
                    <a href="#profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-indigo-500/20 text-slate-300 hover:text-white transition-all">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </a>
                    <a href="#settings" className="flex items-center space-x-2 px-4 py-2 hover:bg-indigo-500/20 text-slate-300 hover:text-white transition-all">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </a>
                    <hr className="my-2 border-slate-700" />
                    <div onClick={()=>handleLogout(navigate)} className="cursor-pointer flex items-center space-x-2 px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Hello, {userName} 👋
              </h1>
              <p className="text-slate-400 text-lg">
                Here are the forms available for you to fill
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm font-medium">Available Forms</span>
                  <FileText className="w-5 h-5 text-indigo-400" />
                </div>
                <p className="text-3xl font-bold text-white">{availableForms.length}</p>
                <p className="text-green-400 text-xs mt-1">+3 new this week</p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm font-medium">Completed</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-slate-400 text-xs mt-1">All time</p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm font-medium">Pending</span>
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-3xl font-bold text-white">4</p>
                <p className="text-orange-400 text-xs mt-1">2 urgent</p>
              </div>
            </div>

            {/* Available Forms Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Available Forms</h2>
              <p className="text-slate-400">Click on any form to start filling</p>
            </div>

            {filteredForms.length === 0 ? (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-12 text-center">
                <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No forms found matching your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredForms.map((form, index) => (
                  <div
                    key={form.id}
                    className="group bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer"
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                          {form.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-slate-400 mb-3">
                          <Building2 className="w-4 h-4" />
                          <span>{form.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {form.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {form.status === 'urgent' && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(form.status)}`}>
                          Urgent
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-baseline justify-between pt-4 border-t border-slate-700/50">
                      <div className="flex items-center space-x-1 text-slate-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{form.deadline}</span>
                      </div>
                      <button className="group/btn flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold text-white text-sm hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
                        onClick={()=>navigate(`/form/live/${form.shareURL}`)}>
                        <span>Fill Form</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}