"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield, Wallet, CreditCard, Users } from 'lucide-react';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = [
    {
      icon: Wallet,
      title: 'Wallet & Security',
      gradient: 'from-blue-500 to-blue-600',
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
      gradient: 'from-green-500 to-green-600',
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
      gradient: 'from-blue-600 to-blue-700',
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
      gradient: 'from-blue-500 to-indigo-600',
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-lg">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about USFranc wallet and trading platform
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white backdrop-blur-xl rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              {faqCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(index);
                    setOpenIndex(null); // Reset open FAQ when switching tabs
                  }}
                  className={`flex-1 min-w-0 px-6 py-4 text-center border-b-2 transition-all duration-300 ${
                    activeTab === index
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-transparent hover:border-gray-300 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeTab === index 
                        ? `bg-gradient-to-r ${category.gradient}` 
                        : 'bg-gray-200'
                    }`}>
                      <category.icon className={`w-5 h-5 ${
                        activeTab === index ? 'text-white' : 'text-gray-500'
                      }`} />
                    </div>
                    <span className="text-sm font-semibold truncate">{category.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <div className="space-y-4">
              {faqCategories[activeTab].faqs.map((faq, faqIndex) => {
                const isOpen = openIndex === faqIndex;

                return (
                  <div
                    key={faqIndex}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleFAQ(faqIndex)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50 transition-colors"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h4>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center">
          <div className="bg-white backdrop-blur-xl rounded-3xl border border-gray-200 p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contact Support
              </button>
              <button className="border-2 border-blue-600 hover:border-blue-700 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
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