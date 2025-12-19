import { Wallet } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  External Wallet Visibility & Portfolio Aggregation
                </h2>

                <p className="text-gray-700 leading-relaxed mb-4">
                  USFranc Wallet allows users to register and display external
                  wallets within their personal portfolio for overview,
                  monitoring, and management purposes.
                </p>

                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                    <span>
                      External wallets are created, owned, and controlled
                      entirely outside of USFranc Wallet.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                    <span>
                      Users may add (link or reference) their external wallets
                      to their USFranc portfolio to obtain a consolidated view
                      of their digital assets.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                    <span>
                      External wallets displayed in the portfolio remain fully
                      non-custodial and under the sole control of the user at
                      all times.
                    </span>
                  </li>
                </ul>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-3">
                    USFranc Wallet:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      <span>Does not take custody of external wallets;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      <span>
                        Does not hold private keys for external wallets;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      <span>
                        Does not initiate transactions on external wallets
                        without explicit user action and supported connection
                        mechanisms.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Portfolio aggregation is provided solely as a technical
                  visibility and management feature, enabling users to view
                  balances, monitor activity, and manage interactions across
                  wallets from a single interface.
                </p>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Interaction & Management Clarification
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    Where supported by the connected blockchain or service,
                    users may initiate actions (such as transfers or swaps) from
                    their external wallets, subject to user authentication and
                    external wallet confirmation.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    USFranc Wallet acts as an interface layer only and does not
                    assume control, custody, or discretionary authority over
                    external wallets or their assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
