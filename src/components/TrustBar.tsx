
'use client';

import Image from "next/image";

const TrustBar = () => {
    return (
        <section className="dark:border-neutral-700 transition-colors duration-300 dark:bg-neutral-900 bg-neutral-50 border-neutral-200 border-t">
            <div className="max-w-7xl mx-auto py-16 px-6">
                <div className="text-center animate-on-scroll blur-slide">
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <span className="animate-on-scroll slide-left stagger-1 text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold italic text-neutral-900 dark:text-white">Timeless wisdom,</span>
                        <Image src="https://images.unsplash.com/photo-1543002588-b9b6db0226c1?q=80&w=1080&auto=format&fit=crop" alt="Open book" width={56} height={56} className="animate-on-scroll rotate-in stagger-2 inline-block sm:h-12 sm:w-12 md:h-14 md:w-14 bg-white w-10 h-10 object-cover ring-white ring-4 rounded-2xl shadow-xl -rotate-6" />
                        <span className="animate-on-scroll slide-right stagger-3 text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold italic text-neutral-900 dark:text-white">modern strategies,</span>
                        <Image src="https://images.unsplash.com/photo-1600880292210-f79b9424c382?q=80&w=1080&auto=format&fit=crop" alt="Business meeting" width={56} height={56} className="animate-on-scroll rotate-in stagger-4 inline-block sm:h-12 sm:w-12 md:h-14 md:w-14 ring-white ring-4 bg-white w-10 h-10 object-cover rounded-2xl shadow-xl rotate-6" />
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <Image src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1080&auto=format&fit=crop" alt="Team collaboration" width={96} height={56} className="animate-on-scroll scale-up stagger-5 inline-block sm:h-12 sm:w-20 md:h-14 md:w-24 ring-white ring-4 w-0 h-0 object-cover rounded-2xl shadow-xl -rotate-3" />
                        <span className="animate-on-scroll slide-up stagger-6 text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold italic text-neutral-900 dark:text-white">unwavering faith.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
