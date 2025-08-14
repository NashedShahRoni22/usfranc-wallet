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
      <section className="py-20 bg-gradient-to-br from-indigo-100 via-green-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-green-300 p-12 text-center shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
              Welcome to the <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">USFranc</span> Community!
            </h2>
            
            <p className="text-xl text-indigo-700 mb-8 max-w-2xl mx-auto">
              Thank you for subscribing! You'll receive your first newsletter within 24 hours with the latest crypto insights and USFranc updates.
            </p>

            <div className="bg-indigo-50 rounded-2xl p-6 max-w-md mx-auto border border-indigo-200">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Mail className="w-5 h-5 text-green-600" />
                <span className="text-indigo-900 font-semibold">Subscribed:</span>
                <span className="text-green-600">{email}</span>
              </div>
              
              {selectedInterests.length > 0 && (
                <div className="text-sm text-indigo-600">
                  <p className="mb-2">Your interests:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedInterests.map(interestId => {
                      const interest = interests.find(i => i.id === interestId);
                      return (
                        <span key={interestId} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs border border-blue-200">
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
              className="mt-8 text-indigo-600 hover:text-indigo-800 transition-colors text-sm"
            >
              Subscribe with different email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
                Stay Ahead of the
                <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"> Crypto</span> Game
              </h2>
              
              <p className="text-xl text-indigo-700 leading-relaxed">
                Get exclusive market insights, trading tips, and USFranc updates delivered straight to your inbox. Join 100,000+ crypto enthusiasts who trust our newsletter.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-900">What you'll receive:</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-indigo-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Proof */}
            <div className="bg-white/60 rounded-2xl p-6 border border-indigo-200 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
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
                  <p className="text-sm text-indigo-600">4.9/5 from 10,000+ subscribers</p>
                </div>
              </div>
              <p className="text-indigo-700 italic">"The best crypto newsletter I've ever subscribed to. Essential for any serious trader!"</p>
            </div>
          </div>

          {/* Right Side - Newsletter Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-indigo-200 p-8 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">Join Our Newsletter</h3>
              <p className="text-indigo-600">Get started with your crypto journey today</p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-14 bg-indigo-50 border border-indigo-300 rounded-xl pl-12 pr-4 text-indigo-900 placeholder-indigo-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>

              {/* Interest Selection */}
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-3">
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
                          ? 'bg-blue-100 border-blue-400 text-blue-700'
                          : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:border-indigo-300'
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
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
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
              <p className="text-xs text-indigo-600 text-center">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime with one click.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-indigo-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-indigo-900">100K+</div>
                  <div className="text-xs text-indigo-600">Subscribers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-900">Weekly</div>
                  <div className="text-xs text-indigo-600">Updates</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-900">Free</div>
                  <div className="text-xs text-indigo-600">Forever</div>
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