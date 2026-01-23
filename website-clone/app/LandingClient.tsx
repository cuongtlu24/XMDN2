"use client";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { InvestmentSection } from "@/components/investment-section";
import { AmenitiesSection } from "@/components/amenities-section";
import { PotentialSection } from "@/components/potential-section";
import { LegalSection } from "@/components/legal-section";
import { FeaturesSection } from "@/components/features-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function LandingClient({ bizData }: { bizData: any }) {
  return (
    <main className="overflow-x-hidden">
      <Header biz={bizData} />
      <HeroSection biz={bizData} />
      <InvestmentSection biz={bizData} />
      <AmenitiesSection biz={bizData} />
      <PotentialSection biz={bizData} />
      <LegalSection biz={bizData} />
      <FeaturesSection biz={bizData} />
      <ContactSection biz={bizData} />
      <Footer biz={bizData} />
    </main>
  );
}
