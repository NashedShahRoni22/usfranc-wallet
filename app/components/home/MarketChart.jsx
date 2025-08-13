"use client";
import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function MarketChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [marketData] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: 45230, change: 5.2, volume: '28.4B', icon: '₿' },
    { name: 'Ethereum', symbol: 'ETH', price: 2840, change: -2.1, volume: '15.2B', icon: 'Ξ' },
    { name: 'USFranc', symbol: 'USF', price: 1.02, change: 8.7, volume: '2.1B', icon: 'UF' },
    { name: 'Cardano', symbol: 'ADA', price: 0.85, change: 3.4, volume: '1.8B', icon: '₳' },
    { name: 'Solana', symbol: 'SOL', price: 98.45, change: -1.8, volume: '3.2B', icon: '◎' },
    { name: 'Polkadot', symbol: 'DOT', price: 12.34, change: 4.2, volume: '980M', icon: '●' }
  ]);

  const timeframes = ['1h', '24h', '7d', '30d', '1y'];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Market <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Overview</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Stay updated with real-time cryptocurrency market data and trends
          </p>
        </div>

        {/* Market Stats Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-8">
          {/* Timeframe Selector */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Top Cryptocurrencies</h3>
            <div className="flex items-center space-x-2 bg-slate-800/50 rounded-xl p-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeframe === timeframe
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          {/* Market Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">#</th>
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Name</th>
                  <th className="text-right py-4 px-4 text-slate-400 font-medium">Price</th>
                  <th className="text-right py-4 px-4 text-slate-400 font-medium">24h Change</th>
                  <th className="text-right py-4 px-4 text-slate-400 font-medium">Volume</th>
                  <th className="text-right py-4 px-4 text-slate-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((coin, index) => (
                  <tr key={coin.symbol} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 text-slate-300">{index + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {coin.icon}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{coin.name}</div>
                          <div className="text-slate-400 text-sm">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-white font-semibold">
                      ${coin.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        coin.change > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {coin.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span className="font-semibold">{Math.abs(coin.change)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-slate-300">{coin.volume}</td>
                    <td className="py-4 px-4 text-right">
                      <button className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-3 py-1 rounded-lg text-sm transition-all">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
