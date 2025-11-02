import  { useState } from 'react';
import { Sparkles, CheckCircle, User, LogOut, Settings, LayoutDashboard, Menu, Clock, Building2, Calendar, Eye, Download } from 'lucide-react';
import Navigation from '../../Componants/User-Dashboard/Navigation';

export default function MySubmissions() {
  const [userName] = useState("Rahul Sharma");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const submissions = [
    {
      id: 1,
      formTitle: "Software Engineering Internship Application",
      company: "TechCorp Solutions",
      submittedOn: "Dec 20, 2024",
      status: "reviewed",
      submissionTime: "2:30 PM"
    },
    {
      id: 2,
      formTitle: "Customer Satisfaction Survey",
      company: "StartupHub Inc",
      submittedOn: "Dec 18, 2024",
      status: "completed",
      submissionTime: "11:45 AM"
    },
    {
      id: 3,
      formTitle: "Event Registration - Tech Summit 2025",
      company: "EventCo",
      submittedOn: "Dec 15, 2024",
      status: "completed",
      submissionTime: "4:15 PM"
    },
    {
      id: 4,
      formTitle: "Product Beta Testing Signup",
      company: "InnovateLabs",
      submittedOn: "Dec 12, 2024",
      status: "pending",
      submissionTime: "9:20 AM"
    },
    {
      id: 5,
      formTitle: "Scholarship Application Form",
      company: "EduFoundation",
      submittedOn: "Dec 10, 2024",
      status: "reviewed",
      submissionTime: "3:50 PM"
    },
    {
      id: 6,
      formTitle: "Volunteer Registration - Community Drive",
      company: "CareOrg",
      submittedOn: "Dec 8, 2024",
      status: "completed",
      submissionTime: "1:30 PM"
    }
  ];

  const getStatusInfo = (status) => {
    const statusMap = {
      completed: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        label: 'Completed',
        icon: CheckCircle
      },
      pending: {
        color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        label: 'Pending',
        icon: Clock
      },
      reviewed: {
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        label: 'Reviewed',
        icon: Eye
      }
    };
    return statusMap[status] || statusMap.completed;
  };

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
          <Navigation/>

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

              {/* Page Title */}
              <div className="flex-1 text-center lg:text-left lg:ml-4">
                <h2 className="text-xl font-bold text-white">My Submissions</h2>
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
                    <a href="#logout" className="flex items-center space-x-2 px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                My Submissions 📋
              </h1>
              <p className="text-slate-400 text-lg">
                Track all your submitted forms in one place
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm font-medium">Total Submissions</span>
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                </div>
                <p className="text-3xl font-bold text-white">{submissions.length}</p>
                <p className="text-slate-400 text-xs mt-1">All time</p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm font-medium">Reviewed</span>
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-white">
                  {submissions.filter(s => s.status === 'reviewed').length}
                </p>
                <p className="text-blue-400 text-xs mt-1">Under review</p>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm font-medium">Pending</span>
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-3xl font-bold text-white">
                  {submissions.filter(s => s.status === 'pending').length}
                </p>
                <p className="text-orange-400 text-xs mt-1">Awaiting action</p>
              </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-4">
              {submissions.map((submission, index) => {
                const statusInfo = getStatusInfo(submission.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <div
                    key={submission.id}
                    className="group bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left Section - Form Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                          {submission.formTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4" />
                            <span>{submission.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{submission.submittedOn} at {submission.submissionTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Status and Actions */}
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold border ${statusInfo.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span>{statusInfo.label}</span>
                        </span>
                        
                        <button className="p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl hover:bg-indigo-500/30 transition-all group/btn">
                          <Eye className="w-5 h-5 text-indigo-400 group-hover/btn:text-indigo-300" />
                        </button>
                        
                        <button className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all group/btn">
                          <Download className="w-5 h-5 text-slate-400 group-hover/btn:text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State (if no submissions) */}
            {submissions.length === 0 && (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No submissions yet</h3>
                <p className="text-slate-400 mb-6">Start filling forms to see your submissions here</p>
                <a href="#dashboard" className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all">
                  <span>Browse Forms</span>
                </a>
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
      `}</style>
    </div>
  );
}