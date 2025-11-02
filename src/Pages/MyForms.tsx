import { useEffect, useEffectEvent, useState } from 'react';
import { Sparkles, Plus, Search, Filter, Eye, Edit, Send, Trash2, FileText, Calendar, BarChart3, MoreVertical, LogOut, Bell, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Componants/LoadingSpinner';
import handleLogout from '../lib/handleLogout';
interface FormState {
    id: string;
    title: string;
    status: string;
    responses: number;
    createdDate: string;
}
export default function OrganizationMyForms() {
    const [name, setName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const [forms, setForms] = useState<FormState[]>([]);

    const getStatusConfig = (status: string) => {
        console.log(">>>>>>>>>",status)
        const configs = {
            published: {
                color: 'bg-green-500/20 text-green-400 border-green-500/30',
                icon: CheckCircle,
                label: 'Published'
            },
            draft: {
                color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
                icon: Clock,
                label: 'Draft'
            },
            closed: {
                color: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
                icon: XCircle,
                label: 'Closed'
            }
        };
        return configs[status] || configs.draft;
    };

    const filteredForms = forms.filter(form => {
        const matchesSearch = form.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || form.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                <FileText className="w-16 h-16 text-indigo-400 relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No forms yet</h3>
            <p className="text-slate-400 mb-6 text-center max-w-md">
                Get started by creating your first form to collect responses from your audience
            </p>
            <button className="group flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/60 transition-all duration-300">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Create Your First Form</span>
            </button>
        </div>
    );



    function formatDate(dateStr: string): string {
        const date = new Date(dateStr)
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }
        return date.toLocaleDateString('en-US', options)
    }


    const fetchForm = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/form/my-forms`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        const data = await res.json()
        const transformedForms = data.forms.map((form: { formId: any; title: any; status: string; totalResponses: any; createdAt: string; }) => ({
            id: form.formId,
            title: form.title,
            status: getStatusConfig(form.status.toLowerCase()==="live"?"published":form.status.toLowerCase()),
            responses: form.totalResponses,
            createdDate: formatDate(form.createdAt)
        }));

        setForms(transformedForms)
    }
    useEffect(() => {
        setName(localStorage.getItem("name")!)
        fetchForm()
        setLoading(false)

    }, [])
    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950">
            {/* Top Navigation Bar */}
            <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-indigo-500/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3" onClick={() => navigate("/dashboard/organization")}>
                            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                FormEaseAI
                            </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:bg-slate-800 transition-all">
                                <Bell className="w-5 h-5 text-slate-300" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-3 px-3 py-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:bg-slate-800 transition-all"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        TC
                                    </div>
                                    <span className="hidden md:block text-slate-300 text-sm font-medium">{name}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-2xl py-2 z-10 cursor-pointer" onClick={()=>handleLogout(navigate)}>
                                        <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all">
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-4xl">📋</span>
                            <h1 className="text-4xl font-bold text-white">My Forms</h1>
                        </div>
                        <p className="text-slate-400 text-lg">
                            Manage and track all your forms in one place
                        </p>
                    </div>

                    <button className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/60 transition-all duration-300" onClick={() => navigate("/form-builder")}>
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Create New Form</span>
                    </button>
                </div>

                {/* Controls Section */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Filter Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:bg-slate-800 transition-all text-white"
                            >
                                <Filter className="w-5 h-5" />
                                <span className="capitalize">{filterStatus === 'all' ? 'All Forms' : filterStatus}</span>
                            </button>

                            {showFilterDropdown && (
                                <div className="absolute top-full mt-2 left-0 w-40 bg-slate-800/95 backdrop-blur-xl border border-indigo-500/30 rounded-lg shadow-2xl py-2 z-10">
                                    {['all', 'published', 'draft', 'closed'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setFilterStatus(status);
                                                setShowFilterDropdown(false);
                                            }}
                                            className={`w-full px-4 py-2 text-left hover:bg-indigo-500/20 transition-all capitalize ${filterStatus === status ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300'
                                                }`}
                                        >
                                            {status === 'all' ? 'All Forms' : status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <span className="text-slate-400 text-sm">
                            {filteredForms.length} {filteredForms.length === 1 ? 'form' : 'forms'}
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search forms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-800/50 border border-indigo-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                    </div>
                </div>

                {/* Forms List/Table */}
                {filteredForms.length === 0 && searchQuery === '' && filterStatus === 'all' ? (
                    <EmptyState />
                ) : filteredForms.length === 0 ? (
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-12 text-center">
                        <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">No forms found matching your criteria</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden lg:block bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-800/50 border-b border-indigo-500/20">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Title</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Responses</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Created</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-indigo-500/10">
                                    {filteredForms.map((form, index) => {
                                        const statusConfig = getStatusConfig(form.status);
                                        const StatusIcon = statusConfig.icon;

                                        return (
                                            <tr
                                                key={form.id}
                                                className="group hover:bg-slate-800/30 transition-all duration-200"
                                                style={{
                                                    animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
                                                }}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all">
                                                            <FileText className="w-5 h-5 text-indigo-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                                                                {form.title}
                                                            </p>
                                                            <p className="text-slate-500 text-xs">Modified {form.lastModified}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusConfig.color}`}>
                                                        <StatusIcon className="w-3.5 h-3.5" />
                                                        <span>{statusConfig.label}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <BarChart3 className="w-4 h-4 text-slate-400" />
                                                        <span className="text-white font-semibold">{form.responses}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2 text-slate-400">
                                                        <Calendar className="w-4 h-4" />
                                                        <span className="text-sm">{form.createdDate}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center space-x-8">
                                                        <button
                                                            className="p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/30 transition-all group/btn relative"
                                                            title="View Form"
                                                        >
                                                            <Eye className="w-4 h-4 text-indigo-400 group-hover/btn:text-indigo-300" />
                                                        </button>
                                                        <button
                                                            className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all group/btn"
                                                            title="Edit Form"
                                                        >
                                                            <Edit className="w-4 h-4 text-blue-400 group-hover/btn:text-blue-300" />
                                                        </button>
                                                        <button
                                                            className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all group/btn"
                                                            title={form.status === 'published' ? 'Unpublish' : 'Publish'}
                                                        >
                                                            <Send className="w-4 h-4 text-green-400 group-hover/btn:text-green-300" />
                                                        </button>
                                                        <button
                                                            className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all group/btn"
                                                            title="Delete Form"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-400 group-hover/btn:text-red-300" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden space-y-4">
                            {filteredForms.map((form, index) => {
                                const statusConfig = getStatusConfig(form.status);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <div
                                        key={form.id}
                                        className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-5 hover:border-indigo-400/50 transition-all"
                                        style={{
                                            animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
                                        }}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3 flex-1">
                                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-indigo-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-medium mb-1">{form.title}</p>
                                                    <p className="text-slate-500 text-xs">Modified {form.lastModified}</p>
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-slate-800/50 rounded-lg transition-all">
                                                <MoreVertical className="w-5 h-5 text-slate-400" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <p className="text-slate-500 text-xs mb-1">Status</p>
                                                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-semibold border ${statusConfig.color}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    <span>{statusConfig.label}</span>
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-slate-500 text-xs mb-1">Responses</p>
                                                <p className="text-white text-sm font-medium">{form.responses}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-500 text-xs mb-1">Created</p>
                                                <p className="text-white text-sm font-medium">{form.createdDate}</p>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2 pt-4 border-t border-slate-700/50">
                                            <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/30 transition-all">
                                                <Eye className="w-4 h-4 text-indigo-400" />
                                                <span className="text-indigo-400 text-sm font-medium">View</span>
                                            </button>
                                            <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all">
                                                <Edit className="w-4 h-4 text-blue-400" />
                                                <span className="text-blue-400 text-sm font-medium">Edit</span>
                                            </button>
                                            <button className="flex items-center justify-center px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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