import  { useState } from 'react';
import { Sparkles, Building2, User, Mail, Lock, Globe, MapPin, GraduationCap, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [userType, setUserType] = useState('individual');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    website:'',
    orgName:'',
    institution: '',
    city: '',
    role:''
  });
  const navigate= useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    console.log(formData)
    let toastId
   try {
     toastId= toast.loading("Creating Account")
     e.preventDefault();
     if(formData.password!==formData.confirmPassword){
       toast.dismiss(toastId)
       toast.error("Password and Confirm Password are not matching")
       return 
     }
     formData.role=userType=="individual"?"USER":userType.toUpperCase()
     const res= await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData)
     })
     const data = await res.json()
     if(data.success){
       toast.dismiss(toastId)
       toast.success("User Created Successfully.")
       navigate("/login")
      }else{
      toast.dismiss(toastId)
      toast.error("something went wrong")

     }
   } catch (error) {
    toast.dismiss(toastId)
    toast.error("Backend Is Down")
    console.log(error)
    
   }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 to-purple-500/20"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-16 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-10 h-10" />
              </div>
              <span className="text-4xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">FormEaseAI</span>
            </div>
            <p className="text-slate-300 text-lg">Create, Publish, and Fill Forms Smarter with AI.</p>
          </div>

          {/* Illustration Area */}
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-slate-900/30 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-12">
              <div className="space-y-6">
                {/* Document Scanning Animation */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-24 bg-linear-to-br from-indigo-500/50 to-purple-500/50 rounded-lg flex items-center justify-center border border-indigo-400/50">
                    <div className="text-white text-xs text-center">
                      📄<br/>Resume
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-indigo-500/30 rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse w-3/4"></div>
                    </div>
                    <p className="text-sm text-slate-300 mt-2">AI Extracting Data...</p>
                  </div>
                </div>

                {/* Form Fields Preview */}
                <div className="space-y-3">
                  <div className="bg-slate-800/50 border border-indigo-500/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Name</div>
                    <div className="text-sm text-white">John Doe ✓</div>
                  </div>
                  <div className="bg-slate-800/50 border border-indigo-500/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Email</div>
                    <div className="text-sm text-white">john@example.com ✓</div>
                  </div>
                  <div className="bg-slate-800/50 border border-indigo-500/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Education</div>
                    <div className="text-sm text-white">MIT Computer Science ✓</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 text-green-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-semibold">Auto-filled with AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-6 mt-12 w-full max-w-lg">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm text-slate-300">80% Faster</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-sm text-slate-300">100% Secure</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤖</div>
              <div className="text-sm text-slate-300">AI Powered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">FormEaseAI</span>
              <p className="text-xs text-slate-400">Create, Publish, and Fill Forms Smarter</p>
            </div>
          </div>

          {/* Glass Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-slate-400 mb-6">Join FormEaseAI and start automating your forms</p>

              {/* Role Selection Tabs */}
              <div className="flex space-x-2 mb-6 bg-slate-800/50 rounded-xl p-1">
                <button
                  onClick={() => setUserType('individual')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    userType === 'individual'
                      ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:cursor-pointer'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Individual</span>
                </button>
                <button
                  onClick={() => setUserType('organization')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    userType === 'organization'
                      ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:cursor-pointer'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <span>Organization</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password <span className="text-slate-500 text-xs">(Must be 6 Digit Long)</span></label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      className="w-full pl-11 pr-12 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password  <span className="text-slate-500 text-xs">(Pass and Confirm Pass must be Same )</span></label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-enter your password"
                      className="w-full pl-11 pr-12 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Conditional Fields - Organization */}
                {userType === 'organization' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Organization Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="orgName"
                          value={formData.orgName}
                          onChange={handleInputChange}
                          placeholder="Your company name"
                          className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Website or Domain <span className="text-slate-500 text-xs">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourcompany.com"
                          className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Conditional Fields - Individual */}
                {userType === 'individual' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        College / Institution 
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          placeholder="Your college or university"
                          className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Your city"
                          className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full mt-6 group flex items-center justify-center space-x-2 py-4 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:cursor-pointer"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900/50 text-slate-400">or continue with</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center space-x-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 hover:cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{' '}
                <Link to={"/login"} className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-slate-500">
            By creating an account, you agree to our{' '}
            <a href="#terms" className="text-indigo-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#privacy" className="text-indigo-400 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}