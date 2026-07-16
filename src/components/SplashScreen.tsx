import React from 'react';
import { Rocket } from 'lucide-react';

const SplashScreen = () => {
  const name = 'Ismail A. Olaiya';

  return (
    <div
      id="splash-screen"
      className="fixed inset-0 z-[100] grid place-items-center bg-neutral-950 transition-opacity duration-700 ease-out"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="splash-logo">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10">
            <Rocket className="size-8 text-white" />
          </div>
        </div>
        <div className="splash-text text-2xl font-semibold text-foreground tracking-wide">
          {name.split('').map((char, index) => (
            <span
              key={index}
              style={{ animationDelay: `${0.8 + index * 0.05}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
