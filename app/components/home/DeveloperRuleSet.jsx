"use client";
import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Key, Lock, Server, FileText, AlertCircle } from 'lucide-react';

export default function DeveloperRuleSet() {
  const [expandedRule, setExpandedRule] = useState(null);

  const rules = [
    {
      id: 1,
      title: 'RULE 1 – KEY GENERATION',
      icon: Key,
      must: [
        'Generate private keys client-side only',
        'Use secure device storage (Secure Enclave / KeyStore / WebCrypto)'
      ],
      mustNot: [
        'Generate keys on servers',
        'Pre-generate wallets',
        'Inject entropy from server'
      ]
    },
    {
      id: 2,
      title: 'RULE 2 – KEY STORAGE',
      icon: Lock,
      must: [
        'Store keys only on user device',
        'Encrypt keys locally'
      ],
      mustNot: [
        'Store keys or seeds on backend',
        'Log, cache, or transmit keys',
        'Store encrypted backups server-side'
      ]
    },
    {
      id: 3,
      title: 'RULE 3 – RECOVERY & SUPPORT',
      icon: AlertTriangle,
      must: [
        'Require users to back up seed phrase',
        'Clearly state "no recovery possible"'
      ],
      mustNot: [
        'Offer password-based recovery',
        'Offer support-based recovery',
        'Hold recovery fragments',
        'Implement "forgot wallet" reset'
      ],
      note: 'If recovery exists → custodial.'
    },
    {
      id: 4,
      title: 'RULE 4 – TRANSACTION SIGNING',
      icon: FileText,
      must: [
        'Sign all transactions locally',
        'Require explicit user confirmation'
      ],
      mustNot: [
        'Sign transactions server-side',
        'Queue or batch transactions without signature'
      ]
    },
    {
      id: 5,
      title: 'RULE 5 – SERVER ROLE',
      icon: Server,
      serverMay: [
        'Store public addresses',
        'Broadcast signed transactions',
        'Index balances',
        'Provide UI data'
      ],
      serverMustNot: [
        'Hold signing authority',
        'Have admin keys',
        'Trigger transfers autonomously'
      ]
    },
    {
      id: 6,
      title: 'RULE 6 – ADMIN / SUPPORT ACCESS',
      icon: XCircle,
      forbidden: [
        'Master keys',
        'Admin override',
        'Emergency withdrawal access',
        'Multi-sig where USFRANC holds a key'
      ],
      note: 'Any of these = custody.'
    },
    {
      id: 7,
      title: 'RULE 7 – WALLET ISSUANCE',
      icon: CheckCircle,
      allowed: [
        'Wallet creation UI',
        'Guided onboarding',
        'Mandatory backup confirmation',
        'Blocking use until seed verified'
      ],
      notAllowed: [
        'Wallet creation without seed visibility',
        'Silent wallet generation',
        'Auto-custody on behalf of user'
      ]
    },
    {
      id: 8,
      title: 'RULE 8 – LEGAL CONSISTENCY',
      icon: Shield,
      requirements: [
        'Code behaviour matches Legal Notice',
        'No feature contradicts "non-custodial"',
        'No roadmap item introduces custody without legal review'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-start gap-4">
            <div>
              <div className="text-sm font-medium mb-2 opacity-90">Developers guide - we will ask you to sign this soon as you must Apply it</div>
              <h1 className="text-3xl font-bold mb-2">2️⃣ DEVELOPER RULE SET</h1>
              <p className="text-xl font-semibold mb-2">USFRANC WALLET – NON-CUSTODIAL ENFORCEMENT RULES</p>
              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold">Purpose</p>
                <p className="text-white text-opacity-90">
                  This rule set defines mandatory technical constraints developers must follow to preserve non-custodial status.
                </p>
                <p className="text-lg font-bold">These rules are non-negotiable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
        {/* Rules */}
        {rules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
            <button
              onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <rule.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{rule.title}</h2>
              </div>
              <div className="text-gray-400">
                {expandedRule === rule.id ? '−' : '+'}
              </div>
            </button>

            {expandedRule === rule.id && (
              <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
                {/* MUST section */}
                {rule.must && (
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-gray-900">MUST:</h3>
                    </div>
                    <ul className="space-y-2">
                      {rule.must.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-green-600 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* MUST NOT section */}
                {rule.mustNot && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-gray-900">MUST NOT:</h3>
                    </div>
                    <ul className="space-y-2">
                      {rule.mustNot.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Server MAY section */}
                {rule.serverMay && (
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-gray-900">Server MAY:</h3>
                    </div>
                    <ul className="space-y-2">
                      {rule.serverMay.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-green-600 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Server MUST NOT section */}
                {rule.serverMustNot && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-gray-900">Server MUST NOT:</h3>
                    </div>
                    <ul className="space-y-2">
                      {rule.serverMustNot.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* ABSOLUTELY FORBIDDEN section */}
                {rule.forbidden && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-red-600">ABSOLUTELY FORBIDDEN:</h3>
                    </div>
                    <ul className="space-y-2">
                      {rule.forbidden.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Allowed section */}
                {rule.allowed && (
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-gray-900">Allowed:</h3>
                    </div>
                    <ul className="space-y-2">
                      {rule.allowed.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-green-600 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Not Allowed section */}
                {rule.notAllowed && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-gray-900">Not allowed:</h3>
                    </div>
                    <ul className="space-y-2">
                      {rule.notAllowed.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements section */}
                {rule.requirements && (
                  <div className="pt-4">
                    <p className="font-bold text-gray-900 mb-3">Developers must ensure:</p>
                    <ul className="space-y-2">
                      {rule.requirements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Note */}
                {rule.note && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm font-bold text-red-700">{rule.note}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Developer Warning */}
        <div className="bg-indigo-600 text-white rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-4">Developer Warning (Strong)</h2>
              <div className="space-y-3">
                <p className="text-lg font-semibold">If USFRANC can move coins without the user → it is custodial.</p>
                <p className="text-lg font-semibold">If USFRANC can recover wallets → it is custodial.</p>
                <p className="text-xl font-bold mt-4">There is no middle ground.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}