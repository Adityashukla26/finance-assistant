export default function BlueprintSection() {
  const phases = [
    {
      number: "01",
      title: "Trust Foundation",
      subtitle: "Building Credibility & User Confidence",
      description: "Establish platform reliability through transparent tax calculations, secure data handling, and proven savings results to build initial user trust.",
      features: ["Transparent Calculations", "Secure Data Protection", "Proven Track Record", "User Testimonials"],
      color: "from-blue-500 to-purple-600"
    },
    {
      number: "02", 
      title: "Coach Pro",
      subtitle: "Advanced AI Coaching Features",
      description: "Deploy sophisticated AI coaching capabilities with personalized recommendations, real-time guidance, and adaptive learning algorithms.",
      features: ["Personalized Strategies", "Real-time Guidance", "Adaptive Learning", "Expert Insights"],
      color: "from-purple-500 to-pink-600"
    },
    {
      number: "03",
      title: "Goal Accelerator", 
      subtitle: "Advanced Goal Achievement",
      description: "Implement advanced goal-setting frameworks with milestone tracking, progress analytics, and achievement optimization for maximum tax savings.",
      features: ["Smart Goal Setting", "Milestone Tracking", "Progress Analytics", "Achievement Optimization"],
      color: "from-pink-500 to-red-600"
    }
  ];

  return (
    <section id="blueprint" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"  >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Strategic Business Blueprint
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our three-phase approach to building a comprehensive tax optimization platform
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 h-full"></div>

          {phases.map((phase, index) => (
            <div key={phase.number} className="relative mb-8 md:mb-24">
              {/* Timeline dot - enhanced design */}
              <div className={`hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${phase.color} shadow-lg border-2 border-white/30 z-10 flex items-center justify-center`}>
                <div className="w-3 h-3 bg-white/80 rounded-full"></div>
              </div>
              
              <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/20 w-full md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg mx-auto sm:mx-0`}>
                    {phase.number}
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-blue-200 text-base md:text-lg mb-4 font-medium">
                      {phase.subtitle}
                    </p>
                    <p className="text-blue-100 mb-6 leading-relaxed text-sm md:text-base">
                      {phase.description}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {phase.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center sm:justify-start space-x-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${phase.color}`}></div>
                          <span className="text-blue-100 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-blue-100 font-medium">Strategic Development in Progress</span>
          </div>
        </div>
      </div>
    </section>
  );
}
