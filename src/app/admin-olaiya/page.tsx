
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getCountFromServer, doc, getDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Mic, ShoppingBag, Star, Loader2, ListChecks, MousePointerClick, Calendar, Newspaper, GraduationCap, BookHeart } from 'lucide-react';

type AnalyticsData = {
    [key: string]: number;
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    posts: 0,
    products: 0,
    podcasts: 0,
    testimonials: 0,
    waitlist: 0,
    events: 0,
    newsletter: 0,
    smeGrant: 0,
    pageToPurpose: 0,
  });
  const [analytics, setAnalytics] = useState<AnalyticsData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const postCount = (await getCountFromServer(collection(db, 'blogPosts'))).data().count;
        const productCount = (await getCountFromServer(collection(db, 'products'))).data().count;
        const podcastCount = (await getCountFromServer(collection(db, 'podcasts'))).data().count;
        const testimonialCount = (await getCountFromServer(collection(db, 'testimonials'))).data().count;
        const waitlistCount = (await getCountFromServer(collection(db, 'waitlist'))).data().count;
        const eventCount = (await getCountFromServer(collection(db, 'events'))).data().count;
        const newsletterCount = (await getCountFromServer(collection(db, 'newsletterSubscriptions'))).data().count;
        const smeGrantCount = (await getCountFromServer(collection(db, 'smeGrantBootcampRegistrations'))).data().count;
        const p2pCount = (await getCountFromServer(collection(db, 'pageToPurposeRegistrations'))).data().count;
        
        setStats({
          posts: postCount,
          products: productCount,
          podcasts: podcastCount,
          testimonials: testimonialCount,
          waitlist: waitlistCount,
          events: eventCount,
          newsletter: newsletterCount,
          smeGrant: smeGrantCount,
          pageToPurpose: p2pCount,
        });

        // Fetch analytics data
        const analyticsSnap = await getDoc(doc(db, 'analytics', 'button_clicks'));
        if (analyticsSnap.exists()) {
            setAnalytics(analyticsSnap.data());
        }

      } catch (error) {
        console.error("Error fetching stats: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Blog Posts', icon: BookOpen, count: stats.posts, color: 'text-sky-500' },
    { title: 'Products', icon: ShoppingBag, count: stats.products, color: 'text-orange-500' },
    { title: 'Keynote Sessions', icon: Mic, count: stats.podcasts, color: 'text-purple-500' },
    { title: 'Testimonials', icon: Star, count: stats.testimonials, color: 'text-yellow-500' },
    { title: 'Events', icon: Calendar, count: stats.events, color: 'text-red-500' },
    { title: 'Waitlist', icon: ListChecks, count: stats.waitlist, color: 'text-green-500' },
    { title: 'Newsletter', icon: Newspaper, count: stats.newsletter, color: 'text-blue-500' },
    { title: 'SME Grant', icon: GraduationCap, count: stats.smeGrant, color: 'text-indigo-500' },
    { title: 'Page to Purpose', icon: BookHeart, count: stats.pageToPurpose, color: 'text-teal-500' },
  ];
  
  const analyticsCards = [
    { title: 'Book Session Clicks', icon: MousePointerClick, count: analytics.hero_book_session || 0, color: 'text-pink-500' },
    { title: 'Add to Cart Clicks', icon: MousePointerClick, count: analytics.add_to_cart || 0, color: 'text-blue-500' },
    { title: 'Blog CTA Clicks', icon: MousePointerClick, count: analytics.blog_cta_book_session || 0, color: 'text-indigo-500' },
  ];


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 text-muted-foreground ${card.color}`} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{card.count}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {analyticsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 text-muted-foreground ${card.color}`} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{card.count}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
