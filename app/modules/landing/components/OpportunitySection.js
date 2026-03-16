export default function OpportunitySection() {
  return (
    <section id="opportunity" className="section bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            An Unprecedented Market Opportunity
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            The Indian fintech market is a juggernaut, but users are
            underserved. A clear gap exists for a product built on trust and
            usability.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
            <h3 className="text-5xl font-bold gradient-text">87%</h3>
            <p className="mt-2 text-lg font-semibold text-slate-800">
              Fintech Adoption in India
            </p>
            <p className="text-slate-600">
              Vastly outpacing the 64% global average, driven by a
              mobile-first population.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
            <h3 className="text-5xl font-bold gradient-text">$95B</h3>
            <p className="mt-2 text-lg font-semibold text-slate-800">
              Projected India Fintech Market
            </p>
            <p className="text-slate-600">
              The market is set to more than double by 2030, showcasing
              massive growth potential.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
            <h3 className="text-5xl font-bold gradient-text">15%</h3>
            <p className="mt-2 text-lg font-semibold text-slate-800">
              Lack of Financial Planning
            </p>
            <p className="text-slate-600">
              A key obstacle cited by Millennials & Gen Z, highlighting the
              need for a true "coach".
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
