export function ThemeToggle() {
  return (
    <span className="theme-control">
      <button
        id="theme-toggle"
        className="theme-toggle"
        type="button"
        aria-label="Dark mode"
        aria-pressed="false"
        title="Switch to dark mode"
        hidden
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path className="only-light" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          <g className="only-dark">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </g>
        </svg>
      </button>
    </span>
  );
}
