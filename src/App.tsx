import  { useState, useEffect } from 'react';
import { Upload, Zap, CheckCircle, Building2, GraduationCap, Shield, Clock, TrendingUp, Lock, FileText, Sparkles, Menu, X, ArrowRight, Play } from 'lucide-react';
import Navbar from './Componants/Navbar';
import { useNavigate } from 'react-router-dom';

export default function FormEaseAI() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate= useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white min-h-screen">
      {/* Navbar */}
      <Navbar isScrolled={isScrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-sm">
            🚀 Powered by Advanced AI Technology
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Create, Share & Fill Forms<br/>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Smarter with AI</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            Centralized platform where companies and students can create, discover, and auto-fill forms using AI document scanning. Say goodbye to repetitive data entry forever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 flex items-center space-x-2" onClick={()=>navigate("/register")}>
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 backdrop-blur border border-indigo-500/30 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="mt-16 relative">
           <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
            <div className="bg-gradient-to-br from-slate-900/50 to-indigo-900/30 backdrop-blur border border-indigo-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-indigo-500/20 flex items-center justify-between gap-3 px-15">
                  <FileText className="w-8 h-8 text-indigo-400 mb-3" />
                  <div>

                  <div className="text-2xl font-bold mb-1">10,000+</div>
                  <div className="text-slate-400 text-sm">Forms Created</div>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 border border-indigo-500/20 flex items-center justify-between gap-3 px-15">
                  <Zap className="w-8 h-8 text-purple-400 mb-3" />
                 <div>
                  
                  <div className="text-2xl font-bold mb-1">80%</div>
                  <div className="text-slate-400 text-sm">Time Saved</div>
                 </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 border border-indigo-500/20 flex items-center justify-between gap-3 px-15">
                  <CheckCircle className="w-8 h-8 text-green-400 mb-3" />

                  <div>

                  <div className="text-2xl font-bold mb-1">99.9%</div>
                  <div className="text-slate-400 text-sm">Accuracy Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Form Filling is Broken — <span className="text-indigo-400">We Fixed It</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-slate-900/50 backdrop-blur border border-red-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-red-400">The Old Way 😤</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">Filling the same information across multiple forms repeatedly</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">Scattered forms across different platforms and emails</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">Manual data entry leading to errors and typos</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">No centralized dashboard to track submissions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-slate-900/50 backdrop-blur border border-indigo-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-indigo-400">The FormEaseAI Way ✨</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">AI automatically extracts data from your documents</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">One centralized platform for all your forms</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">Smart validation ensures accuracy every time</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">Track and manage all submissions in one dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Magic Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-indigo-950/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Upload Once. <span className="text-indigo-400">AI Does the Rest</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Using OCR and intelligent field mapping, FormEaseAI extracts your data from uploaded documents and fills forms automatically
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-900/50 backdrop-blur border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">1. Upload</h3>
                <p className="text-slate-300">Upload your resume, transcript, ID, or any document containing your information</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-900/50 backdrop-blur border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">2. AI Extract</h3>
                <p className="text-slate-300">Our AI intelligently reads and extracts relevant information from your documents</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-900/50 backdrop-blur border border-green-500/30 rounded-2xl p-8 hover:border-green-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">3. Autofill</h3>
                <p className="text-slate-300">Watch as forms are automatically filled with accurate, validated data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for <span className="text-indigo-400">Everyone</span>
            </h2>
            <p className="text-xl text-slate-300">Whether you're a company, student, or admin, we've got you covered</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-900/80 to-indigo-900/30 backdrop-blur border border-indigo-500/30 rounded-2xl p-8 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">🏢 Companies</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Create custom forms with drag-and-drop builder</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Publish forms and share via unique links</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Real-time analytics and response tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Export data in multiple formats</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/30 backdrop-blur border border-purple-500/30 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">👨‍🎓 Students/Users</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span>Discover and explore available forms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>AI auto-fills information from documents</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Track all form submissions in one place</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Save time with reusable profile data</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900/80 to-green-900/30 backdrop-blur border border-green-500/30 rounded-2xl p-8 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">🧑‍💼 Admin Panel</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Manage users and permissions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Verify and moderate form content</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Monitor platform usage and metrics</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Ensure data security and compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-indigo-400">FormEaseAI?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/50 backdrop-blur border border-indigo-500/30 rounded-xl p-6 text-center hover:border-indigo-400/50 transition-all">
              <Clock className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">80%</div>
              <p className="text-slate-300">Less Typing Time</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-6 text-center hover:border-purple-400/50 transition-all">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">10x</div>
              <p className="text-slate-300">Faster Form Collection</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur border border-green-500/30 rounded-xl p-6 text-center hover:border-green-400/50 transition-all">
              <Sparkles className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">AI</div>
              <p className="text-slate-300">Powered Validation</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur border border-blue-500/30 rounded-xl p-6 text-center hover:border-blue-400/50 transition-all">
              <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">100%</div>
              <p className="text-slate-300">Secure & Verified Data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases / Testimonials */}
      <section id="use-cases" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by <span className="text-indigo-400">Organizations</span>
            </h2>
            <p className="text-xl text-slate-300">See how FormEaseAI is transforming form management across industries</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-900/50 backdrop-blur border border-indigo-500/30 rounded-xl p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold">S</div>
                <div>
                  <div className="font-semibold">Sarah Mitchell</div>
                  <div className="text-sm text-slate-400">HR Manager, TechCorp</div>
                </div>
              </div>
              <p className="text-slate-300">"FormEaseAI reduced our hiring paperwork time by 75%. The AI autofill feature is a game-changer for processing hundreds of applications efficiently."</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur border border-purple-500/30 rounded-xl p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-xl font-bold">R</div>
                <div>
                  <div className="font-semibold">Rajesh Kumar</div>
                  <div className="text-sm text-slate-400">Student, IIT Delhi</div>
                </div>
              </div>
              <p className="text-slate-300">"No more filling the same info 20 times for different internships! I just upload my resume once and FormEaseAI handles everything. Saved me hours!"</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur border border-green-500/30 rounded-xl p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-xl font-bold">P</div>
                <div>
                  <div className="font-semibold">Dr. Priya Sharma</div>
                  <div className="text-sm text-slate-400">Dean, University of Mumbai</div>
                </div>
              </div>
              <p className="text-slate-300">"We use FormEaseAI for student registrations and event management. The centralized dashboard makes tracking submissions incredibly easy."</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">🎓 Education</h3>
              <p className="text-slate-300">Student registrations, course enrollments, scholarship applications</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">💼 Corporate</h3>
              <p className="text-slate-300">Job applications, employee onboarding, survey collection</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">🏛️ Government</h3>
              <p className="text-slate-300">Citizen services, permit applications, license renewals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-slate-900/80 to-indigo-900/50 backdrop-blur border border-indigo-500/30 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Simplify Forms <span className="text-indigo-400">Forever?</span>
              </h2>
              <p className="text-xl text-slate-300 mb-10">
                Join thousands of organizations already using FormEaseAI to streamline their form workflows
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 flex items-center space-x-2">
                  <span>Create Form</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-4 bg-slate-800/50 backdrop-blur border border-indigo-500/30 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-300">
                  Fill Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-indigo-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">FormEaseAI</span>
            </div>
            
            <div className="flex space-x-8">
              <a href="#about" className="text-slate-300 hover:text-indigo-400 transition-colors">About</a>
              <a href="#contact" className="text-slate-300 hover:text-indigo-400 transition-colors">Contact</a>
              <a href="#github" className="text-slate-300 hover:text-indigo-400 transition-colors">GitHub</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-indigo-500/10 text-center text-slate-400 text-sm">
            <p>© 2025 FormEaseAI. Built with AI, designed for humans. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}