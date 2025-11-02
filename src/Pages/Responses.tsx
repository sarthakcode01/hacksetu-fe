import { useState, useEffect, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react';
import { Sparkles, LogOut, Bell, ArrowLeft, ChevronDown, ChevronUp, User, Mail, Calendar, FileText, Users, Download } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import handleLogout from '../lib/handleLogout';

export default function FormResponses() {
  const [orgName] = useState("TechCorp Solutions");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [responses, setResponses] = useState<Response[]>([]);
  const [formInfo, setFormInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  // Sample formId - replace with actual route param or props
  const {formId}= useParams()

  useEffect(() => {
    if(!formId)return
    fetchResponses(formId).then(({formInfo,responses})=>{
      setFormInfo(formInfo)
      setResponses(responses)
      setLoading(false)
    })
  }, [formId]);

  const transformResponseData = (data:any) => {
  const formInfo = {
    id: data.form.id,
    title: data.form.title,
    totalResponses: data.form.totalResponses
  };

  const responses = data.responses.map((response: { id: any; user: { name: any; email: any; }; createdAt: any; answers: { question: { id: any; text: any; type: string; }; value: any; }[]; }) => ({
    id: response.id,
    respondentName: response.user.name,
    respondentEmail: response.user.email,
    submissionDate: response.createdAt,
    answers: response.answers.map((answer: { question: { id: any; text: any; type: string; }; value: any; }) => ({
      questionId: answer.question.id,
      questionText: answer.question.text,
      answer: answer.value,
      type: answer.question.type.toLowerCase()
    }))
  }));

  return { formInfo, responses };
};


  const fetchResponses = async (formId:string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/response/${formId}/responses`, {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      const data = await res.json()
      return transformResponseData(data)
    }
    catch (error) {
        setLoading(false)
      console.error("Error fetching form:", error);

    }
  };


  const toggleRow = (responseId:any) => {
    setExpandedRows(prev => ({
      ...prev,
      [responseId]: !prev[responseId]
    }));
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderAnswer = (answer:any) => {
    if (Array.isArray(answer)) {
      return answer.join(", ");
    }
    if (answer.type === "date") {
      return formatDate(answer);
    }
    return answer;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-lg">Loading responses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-indigo-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  FormEaseAI
                </span>
              </div>

              <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline">Back to Forms</span>
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:bg-slate-800 transition-all">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-3 py-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:bg-slate-800 transition-all"
                >
                  <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    TC
                  </div>
                  <span className="hidden md:block text-slate-300 text-sm font-medium">{orgName}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl shadow-2xl py-2 z-10" onClick={()=>handleLogout(navigate)}>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Form Responses 📊
          </h1>
          <p className="text-slate-400 text-lg mb-4">
            {formInfo?.title}
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Total Responses</span>
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-3xl font-bold text-white">{responses.length}</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Latest Response</span>
                <Calendar className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-lg font-semibold text-white">
                {responses.length > 0 ? formatDate(responses[0].submissionDate).split(',')[0] : '-'}
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6">
              <button className="w-full flex items-center justify-center space-x-2 py-2 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all">
                <Download className="w-5 h-5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Responses Table */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-slate-800/50 border-b border-indigo-500/20 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center font-semibold text-slate-300 text-sm">
              <div className="col-span-1"></div>
              <div className="col-span-3">Respondent</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-3">Submission Date</div>
              <div className="col-span-1 text-center">Answers</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-indigo-500/10">
            {responses.map((response, index) => (
              <div key={response.id}>
                {/* Main Row */}
                <div
                  className="px-6 py-4 hover:bg-slate-800/30 transition-all cursor-pointer"
                  onClick={() => toggleRow(response.id)}
                  style={{
                    animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <div className="w-10 h-10 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-400" />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <p className="text-white font-medium">{response.respondentName}</p>
                    </div>
                    <div className="col-span-4">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{response.respondentEmail}</span>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(response.submissionDate)}</span>
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button className="p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/30 transition-all">
                        {expandedRows[response.id] ? (
                          <ChevronUp className="w-5 h-5 text-indigo-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-indigo-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Section - Answers */}
                {expandedRows[response.id] && (
                  <div className="px-6 py-6 bg-slate-800/20 border-t border-indigo-500/10">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-indigo-400" />
                      <span>Individual Answers</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {response.answers.map((answer: { questionText: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; answer: any; }, idx: Key | null | undefined) => (
                        <div
                          key={idx}
                          className="bg-slate-900/50 border border-indigo-500/20 rounded-xl p-4 hover:border-indigo-400/40 transition-all"
                        >
                          <p className="text-slate-400 text-sm mb-2 font-medium">
                            Q{idx + 1}: {answer.questionText}
                          </p>
                          <p className="text-white">
                            {renderAnswer(answer.answer)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {responses.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No responses yet</p>
              <p className="text-slate-500 text-sm mt-2">Responses will appear here once users start submitting the form</p>
            </div>
          )}
        </div>
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