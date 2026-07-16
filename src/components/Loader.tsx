const Loader = () => {
  return (
    <div
      id="loader"
      className="fixed inset-0 z-[100] grid place-items-center bg-neutral-950 transition-opacity duration-700 ease-out"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative inline-grid h-16 w-16 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20">
          <span className="text-3xl font-bold tracking-tight text-white">
            I
          </span>
        </div>
        <p className="animate-pulse text-lg font-semibold text-white">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
