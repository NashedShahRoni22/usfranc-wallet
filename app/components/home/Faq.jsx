"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield, Wallet, CreditCard, Users } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = [
    {
      icon: Wallet,
      title: 'Wallet & Security',
      gradient: 'from-blue-500 to-cyan-500',
      faqs: [
        {
          question: 'How secure is my USFranc wallet?',
          answer: 'Your USFranc wallet uses bank-grade encryption with multi-layer security protocols. We employ cold storage for the majority of funds, two-factor authentication, and advanced fraud detection systems to ensure your assets are completely secure.'
        },
        {
          question: 'What happens if I lose my seed phrase?',
          answer: 'Your seed phrase is the only way to recover your wallet. We recommend storing it securely in multiple locations. USFranc cannot recover lost seed phrases as we don\'t store them on our servers for security reasons.'
        },
        {
          question: 'Can I use my wallet on multiple devices?',
          answer: 'Yes, you can access your USFranc wallet on multiple devices by importing your seed phrase. Your wallet will sync across all devices, giving you access to your funds anywhere.'
        }
      ]
    },
    {
      icon: CreditCard,
      title: 'Trading & Transactions',
      gradient: 'from-green-500 to-emerald-500',
      faqs: [
        {
          question: 'What are the trading fees?',
          answer: 'USFranc charges competitive fees: 0.1% for maker trades, 0.2% for taker trades. There are no deposit fees, and withdrawal fees vary by cryptocurrency. Premium users enjoy reduced fees up to 50% off.'
        },
        {
          question: 'How long do transactions take?',
          answer: 'Transaction times vary by blockchain: Bitcoin (10-60 minutes), Ethereum (2-5 minutes), USFranc token (under 3 seconds). Network congestion may affect processing times.'
        },
        {
          question: 'What is the minimum trade amount?',
          answer: 'The minimum trade amount is $10 USD equivalent for most cryptocurrencies. Some premium cryptocurrencies may have higher minimums, which are clearly displayed before trading.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Account & Verification',
      gradient: 'from-purple-500 to-indigo-500',
      faqs: [
        {
          question: 'Why do I need to verify my account?',
          answer: 'Account verification is required by financial regulations to prevent fraud and money laundering. Basic verification allows withdrawals up to $2,000/day, while full verification removes most limits.'
        },
        {
          question: 'How long does verification take?',
          answer: 'Basic verification typically takes 5-10 minutes. Full verification with document upload usually takes 1-3 business days. We\'ll notify you via email once your verification is complete.'
        },
        {
          question: 'What documents do I need for verification?',
          answer: 'You\'ll need a government-issued ID (passport, driver\'s license, or national ID card) and a recent utility bill or bank statement for address verification. All documents must be clear and current.'
        }
      ]
    },
    {
      icon: Users,
      title: 'Support & General',
      gradient: 'from-orange-500 to-red-500',
      faqs: [
        {
          question: 'How can I contact customer support?',
          answer: 'Our 24/7 support team is available via live chat, email at support@usfranc.com, or through the help center. Premium users get priority support with faster response times.'
        },
        {
          question: 'Is USFranc available in my country?',
          answer: 'USFranc is available in 150+ countries worldwide. Some features may be restricted in certain jurisdictions due to local regulations. Check our supported countries list for specific availability.'
        },
        {
          question: 'What is the USFranc token (USF)?',
          answer: 'USF is our native utility token that provides benefits like reduced trading fees, staking rewards, and priority access to new features. You can earn USF through trading, referrals, and staking programs.'
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get answers to common questions about USFranc wallet and trading platform
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={faqIndex}
                      className="bg-slate-800/30 rounded-xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                      >
                        <h4 className="text-lg font-semibold text-white pr-4">{faq.question}</h4>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-blue-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                Contact Support
              </button>
              <button className="border border-slate-600 hover:border-slate-400 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/5">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;