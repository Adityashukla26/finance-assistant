import Header from './modules/landing/components/Header'
import HeroSection from './modules/landing/components/HeroSection'
import OpportunitySection from './modules/landing/components/OpportunitySection'
import SolutionSection from './modules/landing/components/SolutionSection'
import DemoSection from './modules/landing/components/DemoSection'
import BlueprintSection from './modules/landing/components/BlueprintSection'
import Form from './modules/landing/components/form'
import CallToActionSection from './modules/landing/components/CallToActionSection'
import Footer from './modules/landing/components/Footer'

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <OpportunitySection />
        <SolutionSection />
        <DemoSection />
        <BlueprintSection />
        <Form />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  )
}
