import Header from '@/components/landing/header'
import Hero from '@/components/landing/hero'
import FeaturedShops from '@/components/landing/featured-shops'
import ProductSamples from '@/components/landing/product-samples'
import Footer from '@/components/landing/footer'

export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main className="flex-grow overflow-y-auto">
        <Hero />
        <FeaturedShops />
        <ProductSamples />
      </main>
      <Footer />
    </div>
  )
}

