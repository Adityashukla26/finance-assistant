import FeatureCard from './FeatureCard'

export default function SolutionSection() {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      ),
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Fiduciary AI Core',
      description: 'Our AI is bound to act in your best interest, providing unbiased advice to optimize your outcomes, not our revenue.'
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
          <path d="m15 5 4 4"></path>
        </svg>
      ),
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      title: 'Conversational Coaching',
      description: 'Interact with your finances naturally. Ask complex questions and get personalized insights via an intuitive chat interface.'
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
        </svg>
      ),
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      title: 'Trust by Design',
      description: 'Built on the secure, RBI-regulated Account Aggregator framework. You are always in control of your data.'
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 13V2l8 4-8 4"></path>
          <path d="M12 22v-9"></path>
          <path d="M4 6l8 4v9"></path>
          <path d="M4 6v9l8 4"></path>
        </svg>
      ),
      bgColor: 'bg-rose-100',
      iconColor: 'text-rose-600',
      title: 'Goal-Oriented Planning',
      description: 'Define your life goals, from a new car to retirement. Our AI builds a custom roadmap and tracks your progress automatically.'
    }
  ]

  return (
    <section id="solution" className="section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            A Smarter Way to Manage Your Money
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Zenith is more than an app. It's an intelligent system designed to
            educate, empower, and guide you towards your financial goals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
