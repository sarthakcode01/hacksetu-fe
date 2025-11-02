import { useEffect, useState,  type FormEvent } from "react";
import {
  Sparkles,
  ArrowLeft,
  Send,
  Upload,
  Calendar,
  ChevronDown,
  Check,
} from "lucide-react";
import { useParams,useNavigate } from "react-router-dom";
import LoadingSpinner from "../Componants/LoadingSpinner";
import toast from "react-hot-toast";

// ----- Types -----
type QuestionType =
  | "SHORT_TEXT"
  | "PARAGRAPH"
  | "MULTIPLE_CHOICE"
  | "CHECKBOX"
  | "DROPDOWN"
  | "DATE"
  | "FILE_UPLOAD";

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}

interface FormData {
  title: string;
  description: string;
  company: string;
  questions: Question[];
}

type FormAnswers = Record<number, string | string[] | File | undefined>;
type FileNames = Record<number, string | undefined>;


export default function FormRender() {
  const { formId } = useParams()
  const [formData, setFormData] = useState<FormData | null>()
  const [formAnswers, setFormAnswers] = useState<{ questionId: string; value: any }[]>([]);
  const [fileName, setFileName] = useState<FileNames>({});
  const navigate=useNavigate()



const handleAnswer = (questionId: string, value: any) => {
  setFormAnswers(prev => [
    
    ...prev.filter(a => a.questionId !== questionId),

    { questionId, value },
  ]);
};


  const fetchFormById = async (id: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/form/get-form-by-id/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      const data = await res.json()
      const formattedQuestions: Question[] = data.form.questions.map((q: any) => (
        {
          id: q.id,
          text: q.text,
          type: q.type,
          required: q.required,
          options: q.options || [],
        }
      ))
      setFormData({
        title: data.form.title,
        description: data.form.description,
        company: data.form.owner.orgName,
        questions: formattedQuestions
      })
    } catch (error) {
      console.error("Error fetching form:", error);

    }
  }

  useEffect(() => {
    if (formId) {
      fetchFormById(formId!)
    }
  }, [formId])

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    let toastId
    try {
      toastId=toast.loading("Submtting")
      const res= await fetch(`${import.meta.env.VITE_API_BASE_URL}/response/submit-response/${formId}`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body:JSON.stringify({ answers: formAnswers })
      })
      const data= await res.json()
      console.log(data)
      toast.remove(toastId)
      toast.success("Form is Submmited")
      navigate(-1)
    } catch (error) {
      toast.remove(toastId)
      toast.error("Form is Not Submmited Try again")
      console.error("Error submitting form:", error);
    }
  };

  const getAnswer = (questionId: string) => {
  const answerObj = formAnswers.find(a => a.questionId === questionId);
  return answerObj ? answerObj.value : [];
};

  const renderQuestion = (question: Question) => {
   switch (question.type) {
  case "SHORT_TEXT":
    return (
      <input
        type="text"
        value={getAnswer(question.id) as string}
        onChange={(e) => handleAnswer(question.id, e.target.value)}
        placeholder="Your answer"
        required={question.required}
        className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
      />
    );

  case "PARAGRAPH":
    return (
      <textarea
        value={getAnswer(question.id) as string}
        onChange={(e) => handleAnswer(question.id, e.target.value)}
        placeholder="Your answer"
        required={question.required}
        rows={5}
        className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
      />
    );

  case "MULTIPLE_CHOICE":
    return (
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <label
            key={index}
            className="flex items-center space-x-3 p-4 bg-slate-800/30 border border-indigo-500/30 rounded-xl hover:bg-slate-800/50 hover:border-indigo-400/50 cursor-pointer transition-all group"
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={getAnswer(question.id) === option}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              required={question.required}
              className="w-5 h-5 text-indigo-600 border-indigo-500/30 focus:ring-2 focus:ring-indigo-500/20"
            />
            <span className="text-white group-hover:text-indigo-300 transition-colors">
              {option}
            </span>
          </label>
        ))}
      </div>
    );

  case "CHECKBOX":
    return (
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const selectedOptions = getAnswer(question.id) as string[];
          return (
            <label
              key={index}
              className="flex items-center space-x-3 p-4 bg-slate-800/30 border border-indigo-500/30 rounded-xl hover:bg-slate-800/50 hover:border-indigo-400/50 cursor-pointer transition-all group"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={(e) => {
                  let newValue: string[];
                  if (e.target.checked) {
                    newValue = [...selectedOptions, option];
                  } else {
                    newValue = selectedOptions.filter(o => o !== option);
                  }
                  handleAnswer(question.id, newValue);
                }}
                className="w-5 h-5 rounded text-indigo-600 border-indigo-500/30 focus:ring-2 focus:ring-indigo-500/20"
              />
              <span className="text-white group-hover:text-indigo-300 transition-colors">
                {option}
              </span>
            </label>
          );
        })}
      </div>
    );

  case "DROPDOWN":
    return (
      <div className="relative">
        <select
          value={getAnswer(question.id) as string}
          onChange={(e) => handleAnswer(question.id, e.target.value)}
          required={question.required}
          className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer transition-all"
        >
          <option value="" className="bg-slate-800">Select an option</option>
          {question.options?.map((option, index) => (
            <option key={index} value={option} className="bg-slate-800">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>
    );

  case "DATE":
    return (
      <div className="relative">
        <input
          type="date"
          value={getAnswer(question.id) as string}
          onChange={(e) => handleAnswer(question.id, e.target.value)}
          required={question.required}
          className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
        <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>
    );

 case "FILE_UPLOAD":
  return (
    <div>
      <label className="flex flex-col items-center justify-center w-full px-4 py-8 bg-slate-800/30 border-2 border-dashed border-indigo-500/30 rounded-xl hover:bg-slate-800/50 hover:border-indigo-400/50 cursor-pointer transition-all group">
        <Upload className="w-10 h-10 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
        <span className="text-white font-medium mb-1">
          {fileName[question.id] ?? "Click to upload file"}
        </span>
        <span className="text-slate-400 text-sm">
          {fileName[question.id] ? "File selected" : "PDF, DOC, DOCX (Max 10MB)"}
        </span>
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] ?? null;
            if (file) {
              setFileName({
                ...fileName,
                [question.id]: file.name,
              });
              handleAnswer(question.id, file);
            }
          }}
          required={question.required}
          accept=".pdf,.doc,.docx"
          className="hidden"
        />
      </label>
      {fileName[question.id] && (
        <div className="mt-3 flex items-center space-x-2 text-green-400 text-sm">
          <Check className="w-4 h-4" />
          <span>{fileName[question.id]}</span>
        </div>
      )}
    </div>
  );


  default:
    return null;
}
  };


  if (!formData) return <LoadingSpinner/>
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Top Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-indigo-500/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors cursor-pointer" onClick={()=>navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center space-x-3 cursor-pointer" onClick={()=>navigate("/")}>
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                FormEaseAI
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Form Header */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-8 mb-6">
          <div className="border-l-4 border-indigo-500 pl-6">
            <h1 className="text-4xl font-bold text-white mb-3">
              {formData.title}
            </h1>
            <p className="text-slate-300 text-lg mb-4">{formData.description}</p>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg">
              <span className="text-indigo-400 text-sm font-medium">
                By {formData.company}
              </span>
            </div>
          </div>
        </div>

        {/* Form Questions */}
        <div className="space-y-6">
          {formData.questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-400/50 transition-all"
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="mb-4">
                <label className="flex items-start space-x-2 text-white text-lg font-medium mb-1">
                  <span>{index + 1}.</span>
                  <span className="flex-1">
                    {question.text}
                    {question.required && (
                      <span className="text-red-400 ml-1">*</span>
                    )}
                  </span>
                </label>
                {question.required && (
                  <p className="text-slate-500 text-sm ml-6">Required</p>
                )}
              </div>

              <div className="ml-6">{renderQuestion(question)}</div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 sticky bottom-6">
          <button
            onClick={handleSubmit}
            className="w-full group flex items-center justify-center space-x-2 py-4 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/60 transition-all duration-300"
          >
            <span>Submit Form</span>
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            This form is powered by FormEaseAI. Your responses are secure and
            encrypted.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
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