import FAQ from './components/home/Faq'
import Features from './components/home/Features'
import LandingBanner from './components/home/LandingBanner'
import MarketChart from './components/home/MarketChart'
import Newsletter from './components/home/Newsletter'

export default function page() {
  return (
    <section>
      <LandingBanner/>
      <MarketChart/>
      <Features/>
      <FAQ/>
      <Newsletter/>
    </section>
  )
}
