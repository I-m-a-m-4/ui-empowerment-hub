import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import placeholderData from '@/lib/placeholder-images.json';

const bannerImage = placeholderData.placeholderImages.find(p => p.id === 'press-room-banner');

const PressRoomPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="relative h-64 md:h-80 w-full flex items-center justify-center text-center text-white">
            {bannerImage && (
                <Image
                    src={bannerImage.imageUrl}
                    alt="Press Room Banner"
                    fill
                    className="object-cover"
                    data-ai-hint={bannerImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 p-4 anim d-1">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Press Room</h1>
                <p className="mt-2 text-lg md:text-xl text-white/90">Media resources, press releases, and information about Scale with Olaiya.</p>
            </div>
        </section>

        <section id="press-room-content" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-12 text-center">
                    <p className="text-lg text-muted-foreground">Coming soon...</p>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PressRoomPage;
