
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllProducts } from '@/lib/products';
import ShopPageClient from './ShopPageClient';
import { Metadata } from 'next';
import Image from 'next/image';
import placeholderData from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Shop | Scale with Olaiya',
    description: 'Purchase essential resources like e-books and guides designed to help you build a thriving, Deen-aligned business. Authored by a practicing Pro-Islamic business strategist.',
    keywords: ['islamic business books', 'muslim entrepreneur resources', 'deen-aligned business', 'buy business books', 'Ismail Adekunle-Olaiya books'],
    openGraph: {
        title: 'Shop for Business Resources | Scale with Olaiya',
        description: 'Purchase essential resources to help you build a thriving, Deen-aligned business.',
        type: 'website',
        url: 'https://www.scalewitholaiya.com/shop',
    },
};

const ShopPage = async () => {
    const products = await getAllProducts();
    const heroImage = placeholderData.placeholderImages.find(p => p.id === 'shop-banner');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
       <section className="relative h-[80vh] overflow-hidden bg-neutral-900">
          <div id="heroBackground" className="absolute inset-0 hero-parallax-bg animate-on-scroll image-reveal stagger-1">
            <Image 
                src="/An-old-Islamic-manuscript.jpg" 
                alt="An old Islamic manuscript representing timeless knowledge" 
                className="h-full w-full object-cover object-center" 
                fill 
                priority
            />
            <div id="heroGradient" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-[url(/images/grain.jpg)] opacity-[0.025] pointer-events-none"></div>

          </div>
          <div className="relative z-10 flex h-full max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center">
            <div className="max-w-xl text-white hero-content">
              <p className="text-sm/6 uppercase tracking-widest opacity-80 animate-on-scroll text-reveal stagger-1">Knowledge · Strategy · Growth</p>
              <h1 className="mt-3 text-5xl md:text-6xl tracking-tight font-semibold animate-on-scroll text-reveal stagger-2">Essential Resources</h1>
              <p className="text-base/7 md:text-lg/8 opacity-90 mt-4 animate-on-scroll text-reveal stagger-3">
                Your hub for essential resources designed to help you build and scale a thriving, Deen-aligned business. Authored by a practicing Pro-Islamic business strategist.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Button size="lg" asChild className="animate-on-scroll scale-in stagger-4">
                    <Link href="#products">Explore Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black animate-on-scroll slide-left stagger-5">
                    New Releases
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 {products.length > 0 ? (
                    <ShopPageClient products={products} />
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold">Coming Soon</h2>
                        <p className="mt-2 text-muted-foreground">New products will be added shortly. Join the waitlist to be notified!</p>
                    </div>
                )}
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
