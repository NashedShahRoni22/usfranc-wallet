"use client"
import { useState } from 'react';
import { 
  Check,
  X,
  Crown,
  Shield,
  ArrowRight,
  Zap,
  Lock,
  FileText,
  TrendingUp,
  DollarSign,
  Key,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function SubscriptionPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const freePlanFeatures = [
    { 
      icon: X, 
      text: 'Pay Gas Fees from platform', 
      available: false,
      description: 'Platform charges additional gas fees'
    },
    { 
      icon: X, 
      text: 'Key cannot be recovered or encrypted', 
      available: false,
      description: 'Can be encrypted but must be copied to hide device manually'
    },
    { 
      icon: X, 
      text: 'No transaction and analysis reports', 
      available: false,
      description: 'Limited reporting capabilities'
    },
    { 
      icon: Check, 
      text: 'Send, Receive and Swap enabled', 
      available: true,
      description: 'Platform commission included'
    }
  ];

  const premiumPlanFeatures = [
    { 
      icon: DollarSign, 
      text: '$5 per Year Subscription', 
      available: true,
      highlight: true,
      description: 'Best value for money'
    },
    { 
      icon: TrendingUp, 
      text: 'Portfolio Health Check', 
      available: true,
      description: 'Post authentication gives detailed portfolio analysis'
    },
    { 
      icon: Zap, 
      text: 'No Gas Fees from platform', 
      available: true,
      description: 'Save money on every transaction'
    },
    { 
      icon: Lock, 
      text: 'Encrypted Private Key Recovery', 
      available: true,
      description: 'Keys sent to preferred network (upon approval) with de-encryption option'
    },
    { 
      icon: RefreshCw, 
      text: 'Send, Receive and Swap enabled', 
      available: true,
      description: 'Full platform access without commission'
    },
    { 
      icon: FileText, 
      text: 'Detailed Transaction Reports', 
      available: true,
      description: 'Get comprehensive transaction and analysis reports'
    },
    { 
      icon: Shield, 
      text: 'Direct Blockchain Verification', 
      available: true,
      description: 'No 3rd party - direct crypto reception verification from blockchain'
    }
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Choose Your Plan
        </h1>
        <p className="text-slate-400 text-lg mb-6">
          Unlock premium features and save on transaction fees
        </p>
        
        {/* Savings Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-sm font-semibold">
            Save up to 100% on gas fees with Premium
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Free Plan Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative">
          <div className="mb-6">
            <div className="w-14 h-14 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Free Plan</h2>
            <p className="text-slate-400">Basic features to get started</p>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-white">$0</span>
              <span className="text-slate-400">/forever</span>
            </div>
            <p className="text-slate-500 text-sm">No credit card required</p>
          </div>

          {/* Features List */}
          <div className="space-y-4 mb-8">
            {freePlanFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    feature.available 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium mb-1 ${
                      feature.available ? 'text-white' : 'text-slate-400 line-through'
                    }`}>
                      {feature.text}
                    </p>
                    <p className="text-slate-500 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Limitations Warning */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 text-sm font-medium mb-1">Important Limitations</p>
                <ul className="text-red-200 text-xs space-y-1">
                  <li>• Platform gas fees apply to all transactions</li>
                  <li>• Manual key management required</li>
                  <li>• No recovery options for lost keys</li>
                  <li>• Platform commission on swaps</li>
                </ul>
              </div>
            </div>
          </div>

          <button className="w-full px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-semibold text-lg">
            Current Plan
          </button>
        </div>

        {/* Premium Plan Card */}
        <div className="bg-gradient-to-br from-blue-600/20 to-indigo-700/20 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-500/50 relative overflow-hidden">
          {/* Popular Badge */}
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm flex items-center gap-2">
              <Crown className="w-4 h-4" />
              RECOMMENDED
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Premium Plan</h2>
              <p className="text-blue-200">All features unlocked + exclusive benefits</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-white">$5</span>
                <span className="text-blue-200">/year</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-emerald-400 text-sm font-semibold">Less than $0.42/month</p>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold">
                  92% OFF
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {premiumPlanFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className={`flex items-start gap-3 ${
                    feature.highlight ? 'bg-blue-500/10 rounded-xl p-3 -mx-3 border border-blue-500/20' : ''
                  }`}>
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{feature.text}</p>
                      <p className="text-blue-200 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits Highlight */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-300 text-sm font-medium mb-1">Premium Benefits</p>
                  <ul className="text-emerald-200 text-xs space-y-1">
                    <li>• Zero platform gas fees - save on every transaction</li>
                    <li>• Secure key recovery system with encryption</li>
                    <li>• Advanced portfolio analytics and health monitoring</li>
                    <li>• Direct blockchain verification - no middleman</li>
                  </ul>
                </div>
              </div>
            </div>

            <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all font-bold text-lg shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2 group">
              <span>Upgrade to Premium</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-center text-blue-300 text-xs mt-3">
              🔒 Secure payment • Cancel anytime • Money-back guarantee
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-4xl mx-auto mb-12">
        <h3 className="text-2xl font-bold text-white text-center mb-8">Feature Comparison</h3>
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-slate-400 px-6 py-4 font-medium">Feature</th>
                <th className="text-center text-slate-400 px-6 py-4 font-medium">Free</th>
                <th className="text-center text-blue-400 px-6 py-4 font-medium">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="px-6 py-4 text-white">Platform Gas Fees</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-red-400 font-semibold">Yes</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-emerald-400 font-semibold">No</span>
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-4 text-white">Key Recovery</td>
                <td className="px-6 py-4 text-center">
                  <X className="w-5 h-5 text-red-400 mx-auto" />
                </td>
                <td className="px-6 py-4 text-center">
                  <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-4 text-white">Transaction Reports</td>
                <td className="px-6 py-4 text-center">
                  <X className="w-5 h-5 text-red-400 mx-auto" />
                </td>
                <td className="px-6 py-4 text-center">
                  <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-4 text-white">Portfolio Health Check</td>
                <td className="px-6 py-4 text-center">
                  <X className="w-5 h-5 text-red-400 mx-auto" />
                </td>
                <td className="px-6 py-4 text-center">
                  <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-4 text-white">Direct Blockchain Verification</td>
                <td className="px-6 py-4 text-center">
                  <X className="w-5 h-5 text-red-400 mx-auto" />
                </td>
                <td className="px-6 py-4 text-center">
                  <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-4 text-white">Send/Receive/Swap</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-amber-400 text-xs">With Commission</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-emerald-400 text-xs">No Commission</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-white font-semibold">Price</td>
                <td className="px-6 py-4 text-center text-white font-bold">$0</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-blue-400 font-bold text-lg">$5/year</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-2">What happens to my gas fees with Premium?</h4>
            <p className="text-slate-400 text-sm">
              With Premium, the platform covers all gas fees. You only pay the network gas fees directly to the blockchain, saving you money on every transaction.
            </p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-2">How does key recovery work?</h4>
            <p className="text-slate-400 text-sm">
              Premium members can request encrypted private keys to be sent to their preferred network. In case of key loss, we can help you de-encrypt and recover your keys with proper authentication.
            </p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-semibold mb-2">Can I cancel anytime?</h4>
            <p className="text-slate-400 text-sm">
              Yes! Your subscription is flexible. Cancel anytime and you'll retain Premium features until the end of your billing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}