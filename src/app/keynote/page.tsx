
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Sparkles, ArrowDown, Mic } from 'lucide-react';
import AuraBackground from '@/components/AuraBackground';
import PodcastPlayer from '@/components/PodcastPlayer';
import MotionWrap from '@/components/MotionWrap';

async function getKeynoteContent() {
    try {
        const docRef = doc(db, 'siteContent', 'keynotePage');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
    } catch (error) {
        console.error("Error fetching keynote content: ", error);
    }
    // Return default content if fetch fails or document doesn't exist
    return {
        title: 'Keynote Sessions with Olaiya',
        subtitle: 'Your Direct Line to Strategic Clarity',
        description: 'This is a unique opportunity to engage directly with me in a group setting. I’ll address your most pressing pain points, answer common questions, and provide live, unscripted strategic advice to help you overcome your business challenges.',
        priceInfo: 'Free for all of 2025 — an investment in our Ummah.'
    };
}

const KeynotePage = async () => {
    const content = await getKeynoteContent();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section id="hero" className="relative min-h-screen w-full flex items-center justify-center text-center overflow-hidden">
            <AuraBackground />
            <div className="relative z-10 p-6 max-w-4xl mx-auto anim d-1">
                 <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-gray-300 mb-6 backdrop-blur-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Live & Interactive Sessions
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white anim d-2">
                    {content.title}
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto anim d-3">
                    {content.subtitle}
                </p>
                <div className="mt-10 anim d-4">
                    <Button asChild size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm">
                        <a href="#sessions-content">
                            <ArrowDown className="mr-2 h-4 w-4" />
                            Explore Sessions
                        </a>
                    </Button>
                </div>
            </div>
        </section>

        <section id="sessions-content" className="py-20 bg-background">
            <MotionWrap>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Column 1: About Section */}
                        <div className="lg:sticky lg:top-24">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6 anim d-1">
                                <Mic className="w-4 h-4" />
                                <span>About The Sessions</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4 anim d-2">
                                {content.subtitle}
                            </h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground anim d-3">
                               <p>{content.description}</p>
                            </div>
                            <div className="mt-8 p-6 rounded-2xl border border-primary/20 bg-primary/5 anim d-4">
                              <p className="text-lg font-semibold text-primary">{content.priceInfo}</p>
                              <p className="text-sm text-muted-foreground mt-1">Take advantage of this free opportunity before it becomes a paid offering!</p>
                            </div>
                        </div>

                        {/* Column 2: Player Section */}
                        <div>
                             <header className="mb-8 anim d-2">
                                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                                    Listen to Past Sessions
                                </h2>
                                <p className="mt-2 text-muted-foreground">
                                    Catch up on previous keynotes and gain valuable insights at your own pace.
                                </p>
                            </header>
                            <PodcastPlayer />
                        </div>
                    </div>
                </div>
            </MotionWrap>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KeynotePage;
