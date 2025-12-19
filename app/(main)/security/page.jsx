"use client";
import React, { useState } from 'react';
import { Shield, Lock, Clock, AlertCircle, CheckCircle, Monitor, LogOut, Wallet } from 'lucide-react';

export default function SecurityPage() {
  const [sessionTimeout, setSessionTimeout] = useState('15');
  const [bitssEnabled, setBitssEnabled] = useState(true);

  const activeSessions = [
    { device: 'Chrome on MacBook Pro', location: 'Dhaka, BD', lastActive: 'Active now', current: true },
    { device: 'Safari on iPhone 15', location: 'Dhaka, BD', lastActive: '1 hour ago', current: false },
    { device: 'Chrome on Windows', location: 'Dhaka, BD', lastActive: '2 days ago', current: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">USFranc Wallet</h1>
              <p className="text-sm text-gray-600">Portfolio & Security Management in One Interface (Compliance-Safe)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Security Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Secure Portfolio Environment</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            USFranc Wallet enables users to organise and manage multiple wallets within a secure portfolio environment designed for interaction, monitoring, and operational use.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Enhanced Access Protection</h3>
              <p className="text-sm text-gray-600">Bitss login enforcement applied</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Strengthen Authentication</h3>
              <p className="text-sm text-gray-600">Advanced authentication controls</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Session Control</h3>
              <p className="text-sm text-gray-600">Unauthorised access prevention</p>
            </div>
          </div>
        </div>

        {/* Bitss Login Enforcement */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Bitss Login Enforcement</h2>
              <p className="text-sm text-gray-600">Enhanced access protection to strengthen authentication, session control, and unauthorised access prevention</p>
            </div>
            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${bitssEnabled ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
              {bitssEnabled ? 'Active' : 'Inactive'}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium text-gray-900">Strengthen Authentication</h3>
              </div>
              <p className="text-sm text-gray-700">Bitss login enforcement applied to strengthen authentication controls</p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-green-600" />
                <h3 className="font-medium text-gray-900">Session Control</h3>
              </div>
              <p className="text-sm text-gray-700">Enhanced session control mechanisms for secure access management</p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <h3 className="font-medium text-gray-900">Unauthorised Access Prevention</h3>
              </div>
              <p className="text-sm text-gray-700">Protection mechanisms to prevent unauthorised access attempts</p>
            </div>
          </div>
        </div>

        {/* Wallet Portfolio Management */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Wallet Portfolio Management</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Wallets held within a user's portfolio may be:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Organised and Viewed Collectively</h3>
                <p className="text-sm text-gray-600">For oversight and interaction</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Used for Transactions</h3>
                <p className="text-sm text-gray-600">Internal transfers, external transfers, swaps, and supported payment functions</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Connected to Platforms</h3>
                <p className="text-sm text-gray-600">Selected platforms or services for supported transaction and commerce use cases</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-2">Important Notice</p>
              <p className="leading-relaxed mb-2">
                USFranc Wallet provides technical infrastructure and security controls only.
              </p>
              <p className="leading-relaxed mb-2">
                It does not manage user assets, exercise discretion, or provide financial or investment advice.
              </p>
              <p className="leading-relaxed font-medium text-gray-900">
                Control of wallets and transactions remains with the user.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}