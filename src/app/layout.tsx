import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: "UI Students' Union Empowerment Hub",
  description: "The University of Ibadan Students' Union Empowerment Hub is a digital platform created by the Diligent Team to provide students with easy access to practical skill acquisition opportunities.",
  keywords: ["Empowerment Hub", "UI SU", "University of Ibadan", "Skill acquisition", "Diligent Team", "Video Editing", "Social Media Marketing"],
  authors: [{ name: "The Diligent Team" }],
  creator: "The Diligent Team",
  publisher: "University of Ibadan Students' Union",
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
      title: "UI Students' Union Empowerment Hub",
      description: "Discover practical skills, connect with experienced mentors, and begin your journey toward career growth, entrepreneurship, and personal development.",
      type: 'website',
      url: 'https://www.uisuempowermenthub.com',
      images: [
        {
          url: '/images/favicon.png',
        },
      ],
  },
  twitter: {
      card: 'summary_large_image',
      title: "UI Students' Union Empowerment Hub",
      description: "Discover practical skills, connect with experienced mentors, and begin your journey toward career growth, entrepreneurship, and personal development.",
      images: ['/images/favicon.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ismail Adekunle-Olaiya",
    "alternateName": "Abu Sufyaan",
    "url": "https://www.scalewitholaiya.com",
    "jobTitle": "Business Strategist and Growth Consultant for Muslims",
    "knowsAbout": ["Business Strategy", "Growth Hacking", "Brand Strategy", "Islamic Business Ethics", "Entrepreneurship"],
    "alumniOf": "Obafemi Awolowo University",
    "nationality": "Nigerian"
  };

  const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Scale with Olaiya Business & Growth Strategy",
      "image": "/icon.jpg",
      "url": "https://www.scalewitholaiya.com",
      "telephone": "+2349073999745",
      "email": "info@scalewitholaiya.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lagos",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
      },
      "description": "A Pro-Islamic business strategist and growth expert dedicated to unlocking the potential of Muslims. As a professional business developer and brand strategist, he empowers organizations through clarity, structure, and long-term thinking.",
      "founder": {
          "@type": "Person",
          "name": "Ismail Adekunle-Olaiya"
      },
      "servesCuisine": [],
      "priceRange": "$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Friday",
            "opens": "09:00",
            "closes": "11:00"
        }
      ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
