import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import placeholderData from '@/lib/placeholder-images.json';

const allReviews = [
    {
        name: "PlushSteadDécor",
        quote: "Working with Olaiya has been a game-changer for my business and I'm pleased with the progress we've made so far. If you're looking for a deen-conscious business strategist who can help you navigate the complexities of scaling your business, I strongly recommend Olaiya."
    },
    {
        name: "Rahmatullahi Sanusi",
        quote: "If you're a Muslim Entrepreneur feeling unsure how to make money through social media without compromising your Deen, Olaiya is that missing piece really..."
    },
    {
        name: "Hamdallah Rabiu",
        quote: "His strategies for business growth are unique and exceptional. They are practical and easy to follow. Thank you so much for everything so far! I would definitely recommend him to anyone looking for a brand strategist for business growth. Especially Muslims that really care about not going beyond Allāh's boundaries in their business. Baarokallohu feek."
    },
    {
        name: "Ajadi Haneefah",
        quote: "I'm grateful for the opportunity to work under the guidance of Olaiya. His leadership style is truly inspiring, blending professionalism with genuine care for his team... He's a leader who leads by example, and I'm honored to be part of his team."
    },
    {
        name: "Aishat Elusogbon",
        quote: "Of all the things I’ve gained from working with Mr. Olaiya over the years, the one that has truly stayed with me is the value of clarity. He’s helped me see that whether it’s in Islam, business, or personal growth, clarity makes all the difference in moving forward."
    },
    {
        name: "©Nur by Ibtisaam Secret Hub",
        quote: "Sincerely, he will be the first person I have worked with on scaling my brand, and by Allah, using the required steps and following the resources he gave made it easy. If you have been doubting and you are that Muslim brand that wants to gain more halal visibility and at the same time gain reward from Almighty Allah, this is your go to."
    },
    {
        name: "Zainab Abdulakeem",
        title: "SEO copywriter and Marketing strategist",
        quote: "He’s not just a leader but a true guide—compassionate, honest, and always sticking to Islamic values in his branding and marketing. His strategies work because they come from a place of integrity and care, not shortcuts or hype."
    },
    {
        name: "Oyebode Ismatu-llah Titilope",
        quote: "The Scale with Olaiya framework provided me with a clear, step-by-step process that replaced confusion with clarity and confidence. Today, I am no longer just another professional online. I am recognized as a trusted authority in my field. This transformation has been invaluable."
    },
    {
        name: "Bello Phariat",
        quote: "He’s really easy to work with and very sharp when it comes to marketing. The way he analyzes trends, explains what type of content works best, and studies creator's pages to see what’s working in a niche is unmatched... He also reminds us that you don’t need to neglect your Deen to succeed, Allahuma barik. Truly sharp and humble."
    },
    {
        name: "Aminah Agbaje KoiKi",
        title: "Founder, SCCENTAURA",
        quote: "Learning from him has been nothing short of amazing... I'm getting to now have more clarity about my business and my eyes are now opened to better ways my business can scale in the halal way without compromising my deen. Thank you for being a person full of values Jazakumullah khayran sir🎉🎉🎉"
    },
    {
        name: "ALAAN DIGITALS",
        quote: "He is a man of vision and purpose. He says it and he does it with Allah's help. He isn't a greedy person; he wants everyone around him to grow with him—something I really respect him for. I have learnt a lot of things that even coaches have paid for haven't shared with me."
    },
    {
        name: "Kelani Monsuroh",
        quote: "When I first heard about his business strategy, which focused primarily on Muslims, I was quite skeptical. But he has shown us that, as Muslims, we can actually achieve far beyond that. His brand is not just a business; it is also a means of elevating the Ummah."
    },
    {
        name: "Kaosarat Azeez",
        quote: "Working with him has brought about many positive changes, not only for my brand but also in the way I see life from a broader perspective. I never regretted knowing him and I'm sure you will say the same."
    },
    {
        name: "Toriqatullah Sanni",
        quote: "Scale with Olaiya is the definition of exceptional. As a team member, I used to view visibility and growing of brand as a thing of luck but with Olaiya’s marketing strategy, focus, and Allah's will, positioning your brand exceptionally will become exceptionally easier."
    },
    {
        name: "Peritus Engineering",
        quote: "I have been really impressed by the works of Olaiya. He stands out."
    },
    {
        name: "©ABDULHAMID MUNIRAT",
        quote: "Scale with Olaiya has been instrumental in boosting my passion for being an outstanding Muslim entrepreneur. Through his masterclass and exceptional knowledge sharing, I've learnt how to scale my brand without compromising Islamic worth and my worth."
    }
];
const bannerImage = placeholderData.placeholderImages.find(p => p.id === 'reviews-banner');

const ReviewsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
         <section className="relative h-64 md:h-80 w-full flex items-center justify-center text-center text-white">
            {bannerImage && (
                <Image
                    src={bannerImage.imageUrl}
                    alt="Reviews Banner"
                    fill
                    className="object-cover"
                    data-ai-hint={bannerImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 p-4 anim d-1">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Client Reviews</h1>
                <p className="mt-2 text-lg md:text-xl text-white/90">Real stories and results from clients.</p>
            </div>
        </section>

        <section id="reviews-full" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {allReviews.map((review, index) => (
                    <article key={index} className={`rounded-xl glass-card p-6 hover:bg-white/20 dark:hover:bg-white/10 transition anim d-${index % 7}`}>
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="text-sm font-medium">{review.name}</p>
                                {review.title && <p className="text-xs text-muted-foreground">{review.title}</p>}
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">“{review.quote}”</p>
                    </article>
                  ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewsPage;
