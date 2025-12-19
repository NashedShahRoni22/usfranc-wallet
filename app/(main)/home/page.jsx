import FAQ from "@/app/components/home/Faq";
import Features from "@/app/components/home/Features";
import LandingBanner from "@/app/components/home/LandingBanner";
import MarketOverview from "@/app/components/home/MarketOverview";
import Newsletter from "@/app/components/home/Newsletter";
import OnboardingFlow from "@/app/components/home/OnboardingFlow";

export default function page() {
  return (
    <section>
      <LandingBanner/>
      <MarketOverview/>
      {/* <MarketChart/> */}
      {/* <Features/> */}
      <OnboardingFlow/>
      <FAQ/>
      <Newsletter/>
    </section>
  )
}
