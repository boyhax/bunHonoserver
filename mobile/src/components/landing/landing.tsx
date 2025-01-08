import Hero from '@/components/landing/hero'
import FeaturedShops from '@/components/landing/featured-shops'
import FeaturedProducts from '@/components/landing/FeaturedProducts'
import Footer from '@/components/landing/footer'
import FeaturedCategories from './FeaturedCategories'

export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main className="flex-grow overflow-y-auto">
        <Hero />
        <FeaturedCategories />
        <FeaturedShops />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}

