export default function CallToActionSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Optimize Your Taxes?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of Indians who are already saving lakhs in taxes with our AI-powered recommendations. Start your journey to financial freedom today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center space-x-2 text-white/90">
              <span className="text-green-400">✓</span>
              <span>Free Tax Analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <span className="text-green-400">✓</span>
              <span>Personalized Recommendations</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <span className="text-green-400">✓</span>
              <span>Expert-Backed Strategies</span>
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button className="w-full sm:w-auto bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              🚀 Start Free Analysis
            </button>
            <button className="w-full sm:w-auto bg-transparent text-white font-semibold px-8 py-4 rounded-xl border-2 border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm">
              📱 Talk to Our AI Assistant
            </button>
          </div>
          
          <div className="mt-8 text-white/80 text-sm">
            <p>🔒 Your financial data is encrypted and secure</p>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-white/70 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50,000+</div>
            <div>Users Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">₹500Cr+</div>
            <div>Tax Savings Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.8/5</div>
            <div>User Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div>Uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}
