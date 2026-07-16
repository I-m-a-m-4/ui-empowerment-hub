
import { User } from 'lucide-react';
import Image from 'next/image';
import placeholderData from '@/lib/placeholder-images.json';
import FunFacts from '@/components/FunFacts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Ismail Adekunle-Olaiya | Pro-Islamic Business Strategist',
    description: 'Learn about Ismail Adekunle-Olaiya (Abu Sufyaan), a leading business strategist and consultant for Muslims. Discover his journey, expertise, and mission to empower the Ummah through strategic growth.',
    keywords: ['about Ismail Adekunle-Olaiya', 'Pro-Islamic business consultant', 'Muslim business strategist', 'Abu Sufyaan', 'business developer Nigeria'],
};


const aboutImage = placeholderData.placeholderImages.find(p => p.id === 'ismail-about');
const bannerImage = placeholderData.placeholderImages.find(p => p.id === 'about-banner');

const brandLogos = [
  { name: 'Peritus Engineering', logo: '/images/Peritus-Engineering-logo.png' },
  { name: 'Pilgrim Prive', logo: '/images/pilgrimprive.svg' },
  { name: 'EasyReside LTD', logo: '/images/EasyReside-Logo.png' },
  { name: 'ResearchGains', logo: '/images/researchgains.jpg' },
  { name: 'Haamz Variety Store', logo: '/images/Haamzvarietystore.png' },
  { name: 'Sccentaura', logo: '/images/sccentaura.png' },
  { name: 'Brime Drinks', logo: '/images/brimedrinks.png' },
  { name: 'The Muslim Linguist', logo: '/images/themuslimlinguist.png' },
  { name: 'Therehla', logo: '/images/therehla.jpg' },
  { name: 'Tides & Design', logo: '/images/tides&design.jpg' },
];

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="relative h-[80vh] overflow-hidden bg-neutral-900">
          {bannerImage && (
            <div className="fixed top-0 left-0 h-screen w-screen -z-10">
                <Image 
                    src={bannerImage.imageUrl} 
                    alt={bannerImage.description}
                    className="h-full w-full object-cover object-center" 
                    fill 
                    priority
                    data-ai-hint={bannerImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-[url(/images/grain.png)] opacity-[0.05] pointer-events-none"></div>
            </div>
          )}
          <div className="relative z-10 flex h-full max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center">
            <div className="max-w-xl text-white">
              <p className="text-sm/6 uppercase tracking-widest opacity-80 anim d-1">Strategist. Mentor. Builder.</p>
              <h1 className="mt-3 text-5xl md:text-6xl tracking-tight font-semibold anim d-2">About Me</h1>
              <p className="text-base/7 md:text-lg/8 opacity-90 mt-4 anim d-3">
                Learn about my journey, expertise, and mission to empower the Ummah through strategic, Deen-aligned growth.
              </p>
              <div className="mt-8 flex items-center gap-3 anim d-4">
                  <Button size="lg" asChild>
                      <a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">Book a Session</a>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                      <Link href="#about-full">Learn More</Link>
                  </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about-full" className="relative bg-background/50 border-t border-b border-white/10 pt-24 pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <article className="grid lg:grid-cols-2 gap-16 items-start mb-24">
                <div className="anim d-1">
                  <div className="relative">
                    <div className="relative overflow-hidden h-96 md:h-[500px] ring-1 ring-white/10">
                      {aboutImage && <Image
                        src={aboutImage.imageUrl}
                        alt="Ismail Adekunle-Olaiya, a professional business strategist for Muslims"
                        fill
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 glass-card p-4 shadow-2xl">
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-foreground mb-1">5+</div>
                        <div className="text-xs text-muted-foreground">Years Experience</div>
                      </div>
                    </div>
                    <div className="absolute -top-6 -left-6 glass-card p-4 shadow-2xl">
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-foreground mb-1">50+</div>
                        <div className="text-xs text-muted-foreground">Muslim Brands Guided</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="anim d-2 lg:pl-8">
                  <span className="inline-flex items-center gap-2 px-4 py-1 bg-primary/10 ring-1 ring-inset ring-primary/20 rounded-full text-sm mb-6 font-medium text-primary">
                    <User size={16} />
                    About Your Growth Strategist
                  </span>
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground" style={{ letterSpacing: '-0.03em' }}>
                    Meet Ismail Adekunle-Olaiya
                  </h2>
                   <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-8 text-muted-foreground">
                    A Leading Business Strategist for Muslims, Mindset Architect, & Pro-Islamic Business Consultant
                  </h3>
                  <div className="space-y-6 text-muted-foreground leading-relaxed mb-10">
                     <h4>A Mission-Driven Business Developer</h4>
                     <p>
                        As a dedicated business consultant for Muslims, I help entrepreneurs and organizations unlock clarity, structure, and long-term growth strategies—empowering them to serve Allah through their wealth and leadership.
                    </p>
                    <p>
                      Ismail A. Olaiya (Abu Sufyaan) is a Pro-Islamic business strategist and growth expert dedicated to unlocking the potential of Muslims, organizations, and Islamic nations. His work as a brand strategist is rooted in clarity, structure, and long-term thinking.
                    </p>
                    <h4>Your Expert Business Consultant in Nigeria</h4>
                    <p>
                      With half a decade of experience across the SME value chain, he currently drives downstream expansion in Nigeria for Muslim business owners. As a hands-on business developer, he leads market entry, high-value deals, and Islamic-centered growth strategies across Lagos, Abuja, Ibadan, and beyond.
                    </p>
                    <p>
                        Ismail holds a Diploma in Public Administration and a BA in English & Literary Studies from Obafemi Awolowo University. He is also an exceptional trainer in psychological behavioral analysis, skills he leverages as a top-tier business consultant.
                    </p>
                    <h4>More Than a Growth Strategist: A Mentor for the Ummah</h4>
                    <p>
                        Beyond strategy, he co-founded The Agrivantage Afrika, an initiative reorienting Africans on the power of agriculture in reclaiming economic independence. He also leads an advisory body for Muslim undergraduates, empowering them to monetize their expertise before graduation. This mentorship is a core part of his identity as a business strategist for the next generation.
                    </p>
                    <p>
                      Grounded in the belief that Muslims were designed to lead—with the right mindset, strategies, and systems modeled from the Prophet ﷺ—Ismail’s vision is clear: to raise Muslims who reshape the world. Ready to grow? <a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Contact your business strategist today</a>.
                    </p>
                  </div>
                </div>
              </article>

              <div className="mt-16 border-t border-border pt-12">
                <h3 className="text-center text-sm uppercase tracking-[0.2em] text-muted-foreground anim-fade d-0">Brands I’ve Worked With</h3>
                <div
                  className="relative mt-8 w-full overflow-hidden"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                  }}
                >
                  <div className="flex w-max animate-marquee">
                    {[...brandLogos, ...brandLogos].map((brand, index) => (
                        <div key={index} className="flex-shrink-0 px-12 h-16 flex items-center">
                            <Image src={brand.logo} alt={brand.name} width={140} height={50} className="object-contain max-h-full" />
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FunFacts />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
