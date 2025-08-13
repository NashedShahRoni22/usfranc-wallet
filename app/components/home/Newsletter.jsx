"use client";
import { useState } from 'react';
import { Mail, Send, CheckCircle, Star, TrendingUp, Shield, Bell } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { id: 'market', label: 'Market Analysis', icon: TrendingUp },
    { id: 'security', label: 'Security Updates', icon: Shield },
    { id: 'features', label: 'New Features', icon: Star },
    { id: 'news', label: 'Crypto News', icon: Bell }
  ];

  const handleInterestToggle = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
    }, 2000);
  };

  const benefits = [
    'Weekly market insights and analysis',
    'Exclusive access to new features',
    'Security alerts and updates',
    'Trading tips from experts',
    'Early access to USF token news'
  ];

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-950 via-green-950/20 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-green-500/20 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to the <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">USFranc</span> Community!
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Thank you for subscribing! You'll receive your first newsletter within 24 hours with the latest crypto insights and USFranc updates.
            </p>

            <div className="bg-slate-800/50 rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Mail className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">Subscribed:</span>
                <span className="text-green-400">{email}</span>
              </div>
              
              {selectedInterests.length > 0 && (
                <div className="text-sm text-slate-400">
                  <p className="mb-2">Your interests:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedInterests.map(interestId => {
                      const interest = interests.find(i => i.id === interestId);
                      return (
                        <span key={interestId} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg text-xs">
                          {interest?.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsSubscribed(false)}
              className="mt-8 text-slate-400 hover:text-white transition-colors text-sm"
            >
              Subscribe with different email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Stay Ahead of the
                <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"> Crypto</span> Game
              </h2>
              
              <p className="text-xl text-slate-400 leading-relaxed">
                Get exclusive market insights, trading tips, and USFranc updates delivered straight to your inbox. Join 100,000+ crypto enthusiasts who trust our newsletter.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">What you'll receive:</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Proof */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{String.fromCharCode(65 + i)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-400">4.9/5 from 10,000+ subscribers</p>
                </div>
              </div>
              <p className="text-slate-300 italic">"The best crypto newsletter I've ever subscribed to. Essential for any serious trader!"</p>
            </div>
          </div>

          {/* Right Side - Newsletter Form */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Join Our Newsletter</h3>
              <p className="text-slate-400">Get started with your crypto journey today</p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-14 bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>

              {/* Interest Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  What interests you? (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                        selectedInterests.includes(interest.id)
                          ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                          : 'bg-slate-800/30 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <interest.icon className="w-4 h-4" />
                      <span className="text-sm">{interest.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                onClick={handleSubscribe}
                disabled={isLoading || !email}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Subscribe Now</span>
                  </>
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-slate-500 text-center">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime with one click.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-slate-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-white">100K+</div>
                  <div className="text-xs text-slate-400">Subscribers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Weekly</div>
                  <div className="text-xs text-slate-400">Updates</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Free</div>
                  <div className="text-xs text-slate-400">Forever</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;