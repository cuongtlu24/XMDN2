import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { InvestmentSection } from "@/components/investment-section"
import { AmenitiesSection } from "@/components/amenities-section"
import { PotentialSection } from "@/components/potential-section"
import { LegalSection } from "@/components/legal-section"
import { FeaturesSection } from "@/components/features-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <InvestmentSection />
      <AmenitiesSection />
      <PotentialSection />
      <LegalSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
