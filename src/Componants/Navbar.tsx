import { Menu, Sparkles, X } from "lucide-react"



const Navbar = ({isScrolled,mobileMenuOpen,setMobileMenuOpen}:{
    isScrolled?:boolean,
    mobileMenuOpen?:boolean,
    setMobileMenuOpen?:(open:boolean)=>void
}) => {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-indigo-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">FormEaseAI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#benefits" className="hover:text-indigo-400 transition-colors">Benefits</a>
            <a href="#use-cases" className="hover:text-indigo-400 transition-colors">Use Cases</a>
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300">
              Get Started
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen&& setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-indigo-500/20">
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block hover:text-indigo-400">Features</a>
              <a href="#benefits" className="block hover:text-indigo-400">Benefits</a>
              <a href="#use-cases" className="block hover:text-indigo-400">Use Cases</a>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
  )
}

export default Navbar