import { Shield, Lock, Eye, AlertCircle, FileText, CheckCircle } from "lucide-react";

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Legal Notice</h2>
          <p className="text-xl text-gray-600">Complete terms and operational disclosures</p>
        </div>

        {/* Overview Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-8 mb-12">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Overview</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                USFranc Wallet gives you one secure place to view, manage, and use your digital assets.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Create a secure account with identity verification</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>View all your wallets in one portfolio</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Add external wallets for a complete asset overview</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Hold USFC coins securely in the USFranc custodial wallet</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Transfer, swap, and pay using supported blockchains</span>
                </li>
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                Security is reinforced with Bitss login protection.
              </p>
            </div>
          </div>
        </div>

        {/* Part 2: Portfolio & Custody */}
        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Portfolio, Wallet Types & Custody</h3>
          </div>

          <div className="space-y-8">
            {/* Portfolio Functionality */}
            <div>
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">Portfolio Functionality</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                USFranc Wallet provides a portfolio-based interface allowing users to organise, monitor, and interact with multiple wallets within a single secure environment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The portfolio is designed to offer a consolidated overview and management layer for supported wallets and blockchain interactions.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">External Wallets (Non-Custodial)</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Users may add and connect external wallets that are created and controlled outside of USFranc Wallet.
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>External wallets remain fully owned and controlled by the user at all times</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Private keys for external wallets are not generated, stored, or controlled by USFranc Wallet</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>External wallets are non-custodial and remain outside the custody of USFRANC LTD</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                Where supported by the external wallet and the connected blockchain network, users may actively use their external wallets through the USFranc Wallet interface, including initiating:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4 ml-6">
                <li className="flex items-start space-x-2">
                  <span className="text-gray-400">•</span>
                  <span>Transfers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gray-400">•</span>
                  <span>Swaps</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gray-400">•</span>
                  <span>Smart-contract or blockchain interactions</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">All such actions are:</p>
              <ul className="space-y-2 text-gray-700 mb-4 ml-6">
                <li className="flex items-start space-x-2">
                  <span className="text-gray-400">•</span>
                  <span>Authorised and signed by the external wallet environment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gray-400">•</span>
                  <span>Executed on the relevant blockchain network</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gray-400">•</span>
                  <span>Subject to network availability and external wallet permissions</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                USFranc Wallet acts solely as a technical interface and orchestration layer for these interactions.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">USFranc Custodial Wallet (USFC Only)</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                USFranc Wallet operates a custodial wallet service for USFC (USFranc Coin).
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Users who choose to use the custodial wallet hold their USFC coins within the USFranc Wallet platform, where the assets are securely stored on behalf of the user under controlled custody infrastructure operated by USFRANC LTD.
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>USFC coins held in the custodial wallet remain the property of the user</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Custody is provided solely for secure storage, portfolio interaction, and transaction execution</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Users may initiate transfers, swaps, payments, and other supported actions through the wallet interface</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>USFRANC LTD does not use, lend, pledge, or otherwise dispose of user-held USFC coins for its own account</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Custodial storage applies only to assets explicitly placed within the USFranc custodial wallet and does not extend to external wallets linked for portfolio overview.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">Security & Access Control</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Access to USFranc Wallet portfolios and custodial wallets is protected by enhanced security controls, including Bitss login enforcement.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">Security measures apply to:</p>
              <ul className="space-y-2 text-gray-700 mb-4 ml-6">
                <li className="flex items-start space-x-2">
                  <span className="text-gray-400">•</span>
                  <span>User authentication and access validation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gray-400">•</span>
                  <span>Session integrity and protection against unauthorised access</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Bitss security technology provides access protection only and does not control, manage, or initiate transactions involving user assets.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">User Eligibility & Verification</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Access to USFranc Wallet services is subject to mandatory user identification and verification.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Users must be at least 18 years of age</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Identity verification is required prior to accessing wallet and portfolio functionality</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Access may be restricted or suspended if verification requirements are not met</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Part 3: Non-Custodial Model */}
        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Bank & Institutional Wallet Statement</h3>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-700 font-semibold text-center">Non-Custodial Model</p>
          </div>

          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              This document is provided to explain the non-custodial wallet and operational model of USFranc Wallet.
            </p>
            <p className="text-gray-700 leading-relaxed">
              USFranc Wallet is operated by <strong className="text-gray-900">USFRANC LTD</strong> (England & Wales, Company No. 10325829).
            </p>

            <div>
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">Wallet Model</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                USFranc Wallet operates as a non-custodial wallet interface.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Wallets issued or enabled through USFranc Wallet are non-custodial</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Private keys are generated and controlled exclusively by the user</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>USFRANC LTD does not generate, store, access, recover, or control user private keys</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>USFRANC LTD has no technical ability to initiate transactions or access user funds</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">Asset Delivery & Control</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                USFC (USFranc Coin) is delivered directly on-chain to user-controlled wallet addresses.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Coin delivery requires only the public address</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Ownership, custody, and transaction authority remain fully with the user</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Loss of keys or access remains the sole responsibility of the user</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">External Wallets & Portfolio Interface</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                USFranc Wallet may also display or connect external wallets created outside the platform for portfolio overview and interaction.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>External wallets remain fully user-controlled</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>USFRANC LTD does not assume custody of any external or internal wallet assets</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">Regulatory Positioning</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                USFranc Wallet provides wallet software and technical infrastructure only.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">USFRANC LTD:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Does not act as a custodian</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Does not provide financial or investment advice</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Does not provide discretionary asset management</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Does not safeguard or administer crypto-assets on behalf of users</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Part 4: Exchange & Third-Party Custody */}
        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Exchange & Third-Party Custody Notice</h3>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-yellow-700 text-sm">
              This notice applies only to situations where USFC coins are held by third-party custodians, including cryptocurrency exchanges.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">Custody via Exchanges</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                USFC coins acquired through or held on cryptocurrency exchanges are custodied by the exchange, not by USFRANC LTD.
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Exchanges maintain custody of digital assets on behalf of their users</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>USFRANC LTD does not control exchange wallets or exchange client accounts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Distribution of USFC to exchange users is managed exclusively by the exchange through its internal systems</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                USFRANC LTD delivers USFC coins only to exchange-controlled wallets and does not interact directly with exchange clients.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}