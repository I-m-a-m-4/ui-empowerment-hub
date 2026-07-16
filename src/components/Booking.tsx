import { Button } from "@/components/ui/button";

const Booking = () => {
  return (
    <section id="booking" className="py-20" style={{'--animation-delay': '0.5s'} as React.CSSProperties}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Unlock Your Potential</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-neutral-300">
          Get expert mentorship from a top Islamic business strategist. Our Private Mentorship Sessions offer tailored strategies and actionable insights to help Muslim entrepreneurs and leaders tackle challenges and accelerate growth.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild className="bg-white text-neutral-900 hover:bg-neutral-200">
            <a href="#mentorship">
              View Mentorship Options
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Booking;
