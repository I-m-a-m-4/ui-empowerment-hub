'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MotionWrap from "./MotionWrap";

const faqs = [
    {
        question: "What kind of clients do you work with as a business strategist?",
        answer: "As a business strategist for Muslims, I primarily work with entrepreneurs, leaders, and organizations aiming to grow their ventures on Islamic principles. My clients range from startups to established enterprises seeking clarity and long-term success."
    },
    {
        question: "What is a 'Pro-Islamic business consultant'?",
        answer: "A Pro-Islamic business consultant integrates timeless Islamic ethics into modern business practices. This approach, which I use as a growth strategist, focuses on fairness, integrity, and community benefit to build enterprises that are not only profitable but also pleasing to Allah."
    },
    {
        question: "Are your mentorship sessions only for businesses?",
        answer: "While many of my clients are business owners seeking a business developer, my mentorship is also for individuals. Whether you're a student or a professional, I provide brand strategist insights to help you monetize your expertise and build a strong, authentic personal brand."
    },
    {
        question: "How do I prepare for a session with a growth strategist?",
        answer: "To maximize our time, come prepared with specific challenges you're facing. Sharing business plans or metrics beforehand helps me, as your business consultant, dive right into providing tailored, actionable solutions."
    },
     {
        question: "What makes your approach different from other business strategists?",
        answer: "My methodology is uniquely grounded in an Islamic worldview. I combine modern growth strategies with timeless principles from the Qur'an and Sunnah. The focus is not just on financial success, but on building a legacy that aligns with our ultimate purpose as Muslims."
    },
]

const Faq = () => {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <MotionWrap>
            <section id="faq" className="py-20" style={{'--animation-delay': '0.5s'} as React.CSSProperties}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl tracking-tight font-semibold">Frequently Asked Questions</h2>
                        <p className="mt-3 text-muted-foreground">Find answers below. If you can’t find what you’re looking for, we’re a message away.</p>
                    </header>
                    <div className="mt-10 max-w-4xl mx-auto">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className={`rounded-lg glass-card p-1 anim d-${index + 2}`}>
                                    <AccordionTrigger className="text-left font-medium hover:no-underline p-4">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="p-4 pt-0">
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </MotionWrap>
    );
};

export default Faq;
