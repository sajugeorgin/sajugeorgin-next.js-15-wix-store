export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Shopping Bag Icon */}
        <div className="relative">
          <div className="h-20 w-20 animate-bounce">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                d="M12 20L16 52H48L52 20H12Z"
                fill="#FF6B35"
                className="animate-pulse"
              />
              <path
                d="M12 20L16 52H48L52 20H12Z"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 20V16C22 10.4772 26.4772 6 32 6C37.5228 6 42 10.4772 42 16V20"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Pulsing Circle Background */}
          <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-pink-200 opacity-30" />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-wide">Loading</h2>
          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-800 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-800 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
