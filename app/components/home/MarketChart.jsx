"use client";
import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, TrendingUp, Eye, Star } from 'lucide-react';

export default function MarketChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [marketData] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: 45230, change: 5.2, volume: '28.4B', marketCap: '884B', icon: '₿', rank: 1 },
    { name: 'Ethereum', symbol: 'ETH', price: 2840, change: -2.1, volume: '15.2B', marketCap: '341B', icon: 'Ξ', rank: 2 },
    { name: 'USFranc', symbol: 'USF', price: 1.02, change: 8.7, volume: '2.1B', marketCap: '95B', icon: 'UF', rank: 3 },
    { name: 'Cardano', symbol: 'ADA', price: 0.85, change: 3.4, volume: '1.8B', marketCap: '30B', icon: '₳', rank: 4 },
    { name: 'Solana', symbol: 'SOL', price: 98.45, change: -1.8, volume: '3.2B', marketCap: '44B', icon: '◎', rank: 5 },
    { name: 'Polkadot', symbol: 'DOT', price: 12.34, change: 4.2, volume: '980M', marketCap: '18B', icon: '●', rank: 6 }
  ]);

  const timeframes = ['1h', '24h', '7d', '30d', '1y'];

  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString()}`;
    return `$${price.toFixed(2)}`;
  };

  const formatVolume = (volume) => {
    return volume;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Market <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Overview</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track real-time cryptocurrency prices and market movements
          </p>
        </div>

        {/* Market Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white backdrop-blur-xl rounded-2xl border border-blue-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-sm font-medium mb-1">Total Market Cap</div>
            <div className="text-gray-900 text-2xl font-bold">$2.4T</div>
            <div className="text-green-600 text-sm flex items-center mt-2">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +2.4% (24h)
            </div>
          </div>
          <div className="bg-white backdrop-blur-xl rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-gray-600 text-sm font-medium mb-1">24h Volume</div>
            <div className="text-gray-900 text-2xl font-bold">$89.2B</div>
            <div className="text-red-600 text-sm flex items-center mt-2">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              -1.2% (24h)
            </div>
          </div>
          <div className="bg-white backdrop-blur-xl rounded-2xl border border-blue-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-sm font-medium mb-1">BTC Dominance</div>
            <div className="text-gray-900 text-2xl font-bold">52.3%</div>
            <div className="text-green-600 text-sm flex items-center mt-2">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +0.8% (24h)
            </div>
          </div>
        </div>

        {/* Main Market Table */}
        <div className="bg-white backdrop-blur-xl rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-6 h-6 text-blue-600 mr-3" />
                Top Cryptocurrencies
              </h3>
              <div className="flex items-center space-x-2 bg-white rounded-xl p-1 border border-gray-300 shadow-sm">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTimeframe === timeframe
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">#</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-sm">Asset</th>
                  <th className="text-right py-4 px-6 text-gray-600 font-semibold text-sm">Price</th>
                  <th className="text-right py-4 px-6 text-gray-600 font-semibold text-sm">24h Change</th>
                  <th className="text-right py-4 px-6 text-gray-600 font-semibold text-sm hidden md:table-cell">Market Cap</th>
                  <th className="text-right py-4 px-6 text-gray-600 font-semibold text-sm hidden lg:table-cell">Volume (24h)</th>
                  <th className="text-center py-4 px-6 text-gray-600 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((coin, index) => (
                  <tr 
                    key={coin.symbol} 
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-all duration-200 group"
                  >
                    <td className="py-5 px-6">
                      <div className="text-gray-700 font-semibold">{coin.rank}</div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {coin.icon}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-900 font-semibold text-base group-hover:text-blue-700 transition-colors">{coin.name}</div>
                          <div className="text-gray-500 text-sm font-medium">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="text-gray-900 font-bold text-lg">
                        {formatPrice(coin.price)}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full font-semibold text-sm ${
                        coin.change > 0 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {coin.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span>{Math.abs(coin.change)}%</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right text-gray-700 font-medium hidden md:table-cell">
                      ${coin.marketCap}
                    </td>
                    <td className="py-5 px-6 text-right text-gray-700 font-medium hidden lg:table-cell">
                      {formatVolume(coin.volume)}
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                          Buy
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-gray-200">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-gray-500 text-sm">
                Showing top 6 cryptocurrencies • Updated every 30 seconds
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                View All Markets →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}