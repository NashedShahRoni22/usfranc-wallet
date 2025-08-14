import { Download, FileText, Send, Wallet} from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: Wallet,
            title: 'Secure Wallet',
            description: 'Store your cryptocurrencies with bank-grade security and multi-layer encryption',
            gradient: 'from-blue-500 to-cyan-500',
            stats: '99.9% Secure'
        },
        {
            icon: Send,
            title: 'Fast Transfers',
            description: 'Send crypto anywhere in the world with lightning-fast transaction speeds',
            gradient: 'from-green-500 to-emerald-500',
            stats: '<3 seconds'
        },
        {
            icon: Download,
            title: 'Easy Receive',
            description: 'Receive payments instantly with QR codes and simple wallet addresses',
            gradient: 'from-purple-500 to-indigo-500',
            stats: 'Instant'
        },
        {
            icon: FileText,
            title: 'Transaction Reports',
            description: 'Track all your transactions with detailed reports and analytics',
            gradient: 'from-orange-500 to-red-500',
            stats: 'Real-time'
        }
    ];

    return (
        <section className="min-h-screen py-20 bg-indigo-100 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
                        Powerful <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Features</span>
                    </h2>
                    <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
                        Everything you need to manage your crypto portfolio with confidence
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group relative">
                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-200 p-8 hover:border-indigo-300 transition-all duration-300 hover:transform hover:scale-105 h-full shadow-lg hover:shadow-xl">
                                {/* Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Content */}
                                <div className="space-y-4 flex flex-col h-full">
                                    <h3 className="text-xl font-bold text-indigo-900">{feature.title}</h3>
                                    <p className="text-indigo-700 leading-relaxed flex-grow">{feature.description}</p>

                                    {/* Stats */}
                                    <div className="pt-4 border-t border-indigo-200 mt-auto">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-indigo-600">Performance</span>
                                            <span className={`text-sm font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                                                {feature.stats}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional content to fill the page */}
                <div className="mt-20 text-center">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-indigo-200 p-12 shadow-lg">
                        <h3 className="text-3xl font-bold text-indigo-900 mb-6">
                            Ready to get started?
                        </h3>
                        <p className="text-indigo-700 text-lg mb-8 max-w-3xl mx-auto">
                            Join thousands of users who trust USFranc for their cryptocurrency needs. 
                            Experience the future of digital finance with our comprehensive platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                                Download App
                            </button>
                            <button className="border-2 border-indigo-600 hover:border-indigo-700 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}