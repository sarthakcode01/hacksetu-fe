import { useState } from 'react';
import {
  Sparkles,
  Plus,
  LogOut,
  Bell,
  Eye,
  Save,
  Send,
  Copy,
  Trash2,
  GripVertical,
  ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';


// ✅ Define TypeScript interfaces
interface Question {
  id: number;
  text: string;
  type: string;
  required: boolean;
  options: string[];
}

interface FieldType {
  value: string;
  label: string;
  icon: string;
}

export default function FormBuilder() {
  const [orgName] = useState<string>('TechCorp Solutions');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('')
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: '',
      type: 'SHORT_TEXT',
      required: false,
      options: [],
    },
  ]);

  const fieldTypes: FieldType[] = [
    { value: 'SHORT_TEXT', label: 'Short Answer', icon: '📝' },
    { value: 'PARAGRAPH', label: 'Paragraph', icon: '📄' },
    { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice', icon: '⭕' },
    { value: 'CHECKBOX', label: 'Checkbox', icon: '☑️' },
    { value: 'DROPDOWN', label: 'Dropdown', icon: '🔽' },
    { value: 'DATE', label: 'Date', icon: '📅' },
    { value: 'FILE_UPLOAD', label: 'File Upload', icon: '📎' },
  ];

  const addQuestion = (): void => {
    const newQuestion: Question = {
      id: Date.now(),
      text: '',
      type: 'SHORT_TEXT',
      required: false,
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const duplicateQuestion = (id: number): void => {
    const questionToDuplicate = questions.find((q) => q.id === id);
    if (!questionToDuplicate) return;

    const newQuestion: Question = {
      ...questionToDuplicate,
      id: Date.now(),
    };
    const index = questions.findIndex((q) => q.id === id);
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, newQuestion);
    setQuestions(newQuestions);
  };

  const deleteQuestion = (id: number): void => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (
    id: number,
    field: keyof Question,
    value: string | boolean
  ): void => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const addOption = (questionId: number): void => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, options: [...(q.options || []), ''] }
          : q
      )
    );
  };

  const updateOption = (
    questionId: number,
    optionIndex: number,
    value: string
  ): void => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const deleteOption = (questionId: number, optionIndex: number): void => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((_, idx) => idx !== optionIndex),
            }
          : q
      )
    );
  };

  const needsOptions = (type: string): boolean => {
    return ['MULTIPLE_CHOICE', 'CHECKBOX', 'DROPDOWN'].includes(type);
  };

  async function handlePublishForm(e:React.MouseEvent<HTMLButtonElement>){ 
    const toastId= toast.loading("Form is building...")
    e.preventDefault()
    const formData = {
      title:formTitle,
      description:formDescription,
      questions,
    }
    const res= await fetch(`${import.meta.env.VITE_API_BASE_URL}/form/create-form`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify(formData)
    })
    const data= await res.json()
    if(data.success){
      toast.remove(toastId)
      toast.success(data.message)
    }else{
      toast.remove(toastId)
      toast.error("Backend is down. Try again!")
      
    }


  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-indigo-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                FormEaseAI
              </span>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Preview Button */}
              <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:bg-slate-800 transition-all text-white">
                <Eye className="w-5 h-5" />
                <span>Preview</span>
              </button>

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
                <span className="hidden lg:block text-slate-300 text-sm font-medium">
                  {orgName}
                </span>
              </div>

              {/* Logout Button */}
              <button className="p-2 bg-slate-800/50 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all group">
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-4xl">🛠️</span>
            <h1 className="text-4xl font-bold text-white">Create New Form</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Build and customize your form easily
          </p>
        </div>

        {/* Form Title and Description */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 md:p-8 mb-6">
          <input
            type="text"
            placeholder="Form Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full text-3xl font-bold bg-transparent border-none text-white placeholder-slate-500 focus:outline-none mb-4"
          />
          <textarea
            placeholder="Form description (optional)"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="w-full bg-transparent border-none text-slate-300 placeholder-slate-500 focus:outline-none resize-none"
            rows={2}
          />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-400/50 transition-all"
              style={{
                animation: `slideIn 0.3s ease-out`,
              }}
            >
              {/* Question Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="mt-3 cursor-move">
                  <GripVertical className="w-5 h-5 text-slate-500" />
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    value={question.text}
                    onChange={(e) =>
                      updateQuestion(question.id, 'text', e.target.value)
                    }
                    className="w-full text-lg font-medium bg-transparent border-b border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 pb-2 transition-colors"
                  />
                </div>
              </div>

              {/* Field Type and Required Toggle */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm text-slate-400 mb-2">
                    Field Type
                  </label>
                  <div className="relative">
                    <select
                      value={question.type}
                      onChange={(e) =>
                        updateQuestion(question.id, 'type', e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-slate-800/50 border border-indigo-500/30 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer transition-all"
                    >
                      {fieldTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800/50 border border-indigo-500/30 rounded-lg cursor-pointer hover:bg-slate-800 transition-all">
                    <input
                      type="checkbox"
                      checked={question.required}
                      onChange={(e) =>
                        updateQuestion(question.id, 'required', e.target.checked)
                      }
                      className="w-4 h-4 rounded border-indigo-500/30 bg-slate-800 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <span className="text-white text-sm font-medium">
                      Required ✅
                    </span>
                  </label>
                </div>
              </div>

              {/* Options */}
              {needsOptions(question.type) && (
                <div className="mb-4 pl-9">
                  <label className="block text-sm text-slate-400 mb-3">
                    Options
                  </label>
                  <div className="space-y-2">
                    {(question.options || []).map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            updateOption(question.id, optionIndex, e.target.value)
                          }
                          className="flex-1 px-4 py-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                        <button
                          onClick={() =>
                            deleteOption(question.id, optionIndex)
                          }
                          className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addOption(question.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-800/30 border border-dashed border-indigo-500/30 rounded-lg hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all text-indigo-400"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm">Add Option</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-700/50">
                <button
                  onClick={() => duplicateQuestion(question.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:bg-slate-800 transition-all group"
                >
                  <Copy className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                  <span className="text-indigo-400 group-hover:text-indigo-300 text-sm font-medium">
                    Duplicate
                  </span>
                </button>
                <button
                  onClick={() => deleteQuestion(question.id)}
                  disabled={questions.length === 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                  <span className="text-red-400 group-hover:text-red-300 text-sm font-medium">
                    Delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <button
          onClick={addQuestion}
          className="w-full mt-6 group flex items-center justify-center space-x-2 py-4 bg-slate-800/30 border-2 border-dashed border-indigo-500/30 rounded-2xl hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all"
        >
          <Plus className="w-5 h-5 text-indigo-400 group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-indigo-400 font-semibold">Add Question</span>
        </button>

        {/* Bottom Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 sticky bottom-6 bg-linear-to-t from-slate-950 via-slate-950 to-transparent pt-8">
          <button className="flex-1 flex items-center justify-center space-x-2 py-4 bg-slate-800/50 border border-indigo-500/30 rounded-xl hover:bg-slate-800 transition-all font-semibold text-white">
            <Save className="w-5 h-5" />
            <span>Save Draft</span>
          </button>
          <button className="flex-1 group flex items-center justify-center space-x-2 py-4 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/60 transition-all duration-300"
            onClick={handlePublishForm}>
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span>Publish Form</span>
          </button>
        </div>

        {/* Mobile Preview Button */}
        <button className="md:hidden w-full mt-4 flex items-center justify-center space-x-2 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl hover:bg-slate-800 transition-all text-white">
          <Eye className="w-5 h-5" />
          <span>Preview Form</span>
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
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
