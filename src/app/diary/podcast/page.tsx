
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PodcastPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20">
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

export default PodcastPage;
