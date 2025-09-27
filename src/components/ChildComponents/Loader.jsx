"use client";

const Loader = ({
  text = "Loading...",
  size = 48,
  thickness = 4,
  colorClass = "border-sky-600",
  overlay = true,
  className = "",
}) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${thickness}px`,
  };

  return (
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center",
        overlay ? "bg-black/5 backdrop-blur-[1px]" : "",
        className,
      ].join(" ")}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={`rounded-full border-b-blue-800 animate-spin ${colorClass}`}
          style={spinnerStyle}
        />
        {text && (
          <p className="text-sm text-gray-700 font-medium" data-testid="loader-text">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
