"use client";
import React, { useState } from 'react';
import { UserCheck, Wallet, Link2, Shield, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'User Identification & Eligibility',
      icon: UserCheck,
      color: 'blue'
    },
    {
      number: 2,
      title: 'Create Your USFranc Portfolio',
      icon: Wallet,
      color: 'green'
    },
    {
      number: 3,
      title: 'Add External Wallets',
      icon: Link2,
      color: 'purple'
    },
    {
      number: 4,
      title: 'Custodial Holding & Transactions',
      icon: Shield,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">USFranc Wallet</h1>
          <p className="text-sm text-gray-600">User Onboarding & Wallet Flow</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <React.Fragment key={step.number}>
                  <button
                    onClick={() => setCurrentStep(step.number)}
                    className={`flex flex-col items-center gap-2 flex-1 ${isActive ? 'opacity-100' : 'opacity-60'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-100' : 
                      isActive ? `bg-${step.color}-100` : 'bg-gray-100'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Icon className={`w-6 h-6 ${
                          isActive ? `text-${step.color}-600` : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                    <span className={`text-xs text-center font-medium ${
                      isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      Step {step.number}
                    </span>
                  </button>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step 1 Content */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 1 – User Identification & Eligibility</h2>
                  <p className="text-sm text-gray-600 mt-1">Complete mandatory identification and verification</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                To access USFranc Wallet services, users must complete a mandatory identification and verification process.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Users must be at least 18 years of age</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Identity verification is required in accordance with applicable compliance and security requirements</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Access to wallet and portfolio features is granted only after successful verification</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  This process is designed to ensure platform security, regulatory alignment, and responsible use.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 Content */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 2 – Create Your USFranc Portfolio</h2>
                  <p className="text-sm text-gray-600 mt-1">Access your personal portfolio interface</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Once verified, users gain access to their personal USFranc portfolio interface.
              </p>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                <p className="text-gray-700 mb-4">
                  The portfolio acts as a central dashboard allowing users to:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-gray-700">Organise wallets</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-gray-700">View balances and transaction activity</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-gray-700">Manage interactions across supported blockchain environments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 Content */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Link2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 3 – Add External Wallets for Portfolio Overview</h2>
                  <p className="text-sm text-gray-600 mt-1">Consolidated visibility and management</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Users may add their own external wallets, created outside of USFranc Wallet, to their portfolio for consolidated visibility and management.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">External wallets remain fully owned and controlled by the user</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Private keys for external wallets are never stored or controlled by USFranc</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">External wallets are added for visibility, monitoring, and organisational purposes only</p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">
                    USFranc Wallet does not take custody of external wallets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 Content */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 4 – Custodial Holding, Portfolio Interaction & Transactions</h2>
                  <p className="text-sm text-gray-600 mt-1">Secure custodial wallet service for USFC</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                USFranc Wallet operates a custodial wallet service for USFC (USFranc Coin).
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Users of the custodial wallet hold their USFC coins within the USFranc Wallet platform, where the assets are securely stored on behalf of the user under controlled custody infrastructure operated by USFRANC LTD.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">USFC coins held in the custodial wallet remain the property of the user</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Custody is provided solely for secure storage, portfolio interaction, and transaction execution</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Users may initiate transfers, swaps, payments, and other supported actions through the wallet interface</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">USFRANC LTD does not use, lend, pledge, or otherwise dispose of user-held USFC coins for its own account</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-gray-700">
                    Custodial storage applies only to assets placed within the USFranc custodial wallet and does not extend to external wallets linked for portfolio overview.
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-gray-700 font-medium">
                    All access and interactions are protected by Bitss login enforcement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={currentStep === 4}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 4
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {currentStep === 4 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}