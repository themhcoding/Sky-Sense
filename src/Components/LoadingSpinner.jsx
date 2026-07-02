import React from "react";

const LoadingSpinner = () => {
  // 5 distinct dots, matching the standard Windows pattern
  const dots = Array.from({ length: 5 });

  return (
    <div className="flex items-center justify-center p-12">
      {/* Spinner Frame */}
      <div className="relative w-12 h-12">
        {dots.map((_, index) => (
          <div
            key={index}
            className="win-dot-container"
            style={{
              // Sweeping, elegant staggered delay (approx 160ms apart)
              animationDelay: `${index * 0.16}s`,
            }}
          >
            {/* The individual dot */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;