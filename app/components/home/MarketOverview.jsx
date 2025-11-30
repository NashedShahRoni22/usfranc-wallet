"use client";
import { ArrowDownRight, ArrowUpRight, Eye, Star, TrendingUp, ChevronLeft, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MarketOverview() {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10); // Total pages available
  const [refreshCountdown, setRefreshCountdown] = useState(30);
  const itemsPerPage = 10;
  
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=${currentPage}`,
          { next: { revalidate: 30 } } // Next.js caching for 30 seconds
        );
        const data = await res.json();

        setMarketData(data);
        setRefreshCountdown(30);
      } catch (e) {
        console.error("API error:", e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    const interval = setInterval(loadData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [currentPage]);

  // Countdown timer for refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2 md:mr-3" />
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Market{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Overview
              </span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Track real-time cryptocurrency prices and market movements
          </p>
          
          {/* Refresh Timer */}
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshCountdown <= 5 ? 'animate-spin' : ''}`} />
            <span>Auto-refresh in {refreshCountdown}s</span>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white backdrop-blur-xl rounded-2xl md:rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-2 md:mr-3" />
                Top Cryptocurrencies
              </h3>
              <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
                        #
                      </th>
                      <th className="text-left py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
                        Asset
                      </th>
                      <th className="text-right py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
                        Price
                      </th>
                      <th className="text-right py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
                        24h Change
                      </th>
                      <th className="text-right py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm hidden lg:table-cell">
                        Market Cap
                      </th>
                      <th className="text-right py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm hidden xl:table-cell">
                        Volume (24h)
                      </th>
                      <th className="text-center py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {marketData.map((coin) => (
                      <tr
                        key={coin.id}
                        className="border-b border-gray-100 hover:bg-blue-50/50 transition-all duration-200 group"
                      >
                        <td className="py-4 lg:py-5 px-4 lg:px-6 text-gray-700 font-semibold">
                          {coin.market_cap_rank}
                        </td>

                        <td className="py-4 lg:py-5 px-4 lg:px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 relative rounded-full overflow-hidden shadow-lg">
                              <Image
                                src={coin.image}
                                alt={coin.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <div>
                              <div className="text-gray-900 font-semibold text-sm lg:text-base group-hover:text-blue-700 transition-colors">
                                {coin.name}
                              </div>
                              <div className="text-gray-500 text-xs lg:text-sm font-medium uppercase">
                                {coin.symbol}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 lg:py-5 px-4 lg:px-6 text-right text-gray-900 font-bold">
                          ${coin.current_price.toLocaleString()}
                        </td>

                        <td className="py-4 lg:py-5 px-4 lg:px-6 text-right">
                          <div
                            className={`inline-flex items-center space-x-1 px-2 lg:px-3 py-1 rounded-full font-semibold text-xs lg:text-sm ${
                              coin.price_change_percentage_24h > 0
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-red-100 text-red-700 border border-red-200"
                            }`}
                          >
                            {coin.price_change_percentage_24h > 0 ? (
                              <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 lg:w-4 lg:h-4" />
                            )}
                            <span>{Math.abs(coin.price_change_percentage_24h?.toFixed(2) || 0)}%</span>
                          </div>
                        </td>

                        <td className="py-4 lg:py-5 px-4 lg:px-6 text-right text-gray-700 font-medium text-sm hidden lg:table-cell">
                          ${(coin.market_cap / 1e9).toFixed(2)}B
                        </td>

                        <td className="py-4 lg:py-5 px-4 lg:px-6 text-right text-gray-700 font-medium text-sm hidden xl:table-cell">
                          ${(coin.total_volume / 1e9).toFixed(2)}B
                        </td>

                        <td className="py-4 lg:py-5 px-4 lg:px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 shadow-md">
                              Buy
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-gray-200">
                              <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {marketData.map((coin) => (
                  <div key={coin.id} className="p-4 hover:bg-blue-50/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 relative rounded-full overflow-hidden shadow-lg">
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <div className="text-gray-900 font-semibold">{coin.name}</div>
                          <div className="text-gray-500 text-sm uppercase">{coin.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-900 font-bold">${coin.current_price.toLocaleString()}</div>
                        <div
                          className={`text-sm font-semibold ${
                            coin.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {coin.price_change_percentage_24h > 0 ? "+" : ""}
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div>
                        <div className="text-xs text-gray-500">Market Cap</div>
                        <div className="font-medium">${(coin.market_cap / 1e9).toFixed(2)}B</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Volume</div>
                        <div className="font-medium">${(coin.total_volume / 1e9).toFixed(2)}B</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg text-sm font-medium">
                        Buy
                      </button>
                      <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Footer with Pagination */}
          <div className="bg-gray-50 border-t border-gray-200 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-gray-500 text-xs md:text-sm">
                Showing {itemsPerPage * (currentPage - 1) + 1}-{itemsPerPage * currentPage} • Updated every 30 seconds
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = idx + 1;
                    } else if (currentPage <= 3) {
                      pageNum = idx + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + idx;
                    } else {
                      pageNum = currentPage - 2 + idx;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300"
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}