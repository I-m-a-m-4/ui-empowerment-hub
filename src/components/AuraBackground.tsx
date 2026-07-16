
'use client';

const AuraBackground = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="aura-bg"></div>
      </div>
      <style jsx>{`
        .aura-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 140vmax;
          height: 140vmax;
          background-image: radial-gradient(circle, #ff0000 0%, #ff0000 10%, transparent 40%),
                            radial-gradient(circle, #8A2BE2 20%, #8A2BE2 30%, transparent 60%);
          mix-blend-mode: screen;
          filter: blur(100px);
          animation: rotateAura 20s linear infinite, scaleAura 30s ease-in-out infinite alternate;
          transform-origin: center center;
        }

        @keyframes rotateAura {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes scaleAura {
          from { transform: translate(-50%, -50%) scale(0.8); }
          to { transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </>
  );
};

export default AuraBackground;
