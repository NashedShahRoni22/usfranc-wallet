import { ArrowRight, Shield, TrendingUp } from "lucide-react";

export default function LandingBanner() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(99,102,241,0.2),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(129,140,248,0.15),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-indigo-200 to-blue-300 bg-clip-text text-transparent leading-tight">
                A secure wallet interface for blockchain interaction
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 max-w-2xl lg:max-w-none leading-relaxed">
                Store, transfer, swap, and use digital assets across supported networks.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4 pt-4">
              <button className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2">
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-indigo-500 hover:border-indigo-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-indigo-800/30">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Side - Stats & Floating Cards */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Stats Cards */}
            <div className="space-y-6 z-10 relative">
              <div className="bg-indigo-900/40 backdrop-blur-xl rounded-3xl p-8 border border-indigo-400/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-3">
                  $2.4B+
                </div>
                <div className="text-indigo-300 text-lg">Total Volume</div>
              </div>
              
              <div className="bg-indigo-900/40 backdrop-blur-xl rounded-3xl p-8 border border-indigo-400/30 shadow-2xl transform hover:scale-105 transition-all duration-300 ml-12">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent mb-3">
                  500K+
                </div>
                <div className="text-indigo-300 text-lg">Active Users</div>
              </div>
              
              <div className="bg-indigo-900/40 backdrop-blur-xl rounded-3xl p-8 border border-indigo-400/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-3">
                  99.9%
                </div>
                <div className="text-indigo-300 text-lg">Uptime</div>
              </div>
            </div>

            {/* Floating Info Cards */}
            <div className="absolute top-8 -right-8 bg-indigo-900/60 backdrop-blur-xl rounded-2xl p-4 border border-indigo-400/20 animate-pulse shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm text-white font-semibold">
                    BTC +5.2%
                  </div>
                  <div className="text-xs text-green-400">$45,230</div>
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-8 -left-8 bg-indigo-900/60 backdrop-blur-xl rounded-2xl p-4 border border-indigo-400/20 animate-pulse shadow-xl"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm text-white font-semibold">
                    Secured
                  </div>
                  <div className="text-xs text-blue-400">Bank Grade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}