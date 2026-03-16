export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Reach Your Financial
        </h2>
        <h3 className="text-4xl md:text-6xl font-extrabold leading-tight mt-2">
          <span className="gradient-text">Zenith</span>.
        </h3>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
          India's first AI-native financial coach. We simplify complexity,
          provide unbiased guidance, and help you build lasting wealth with
          confidence.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#opportunity"
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
          >
            Discover The Opportunity
          </a>
          <a
            href="#demo"
            className="bg-white text-slate-700 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-all shadow-lg border border-slate-300"
          >
            Try The AI Demo
          </a>
        </div>
      </div>
    </section>
  )
}
