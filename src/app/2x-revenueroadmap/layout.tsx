import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '2x Revenue Roadmap | Scale with Olaiya',
    description: 'Join the webinar to 2x your revenue by doing less than you are already doing.',
};

export default function RevenueRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
