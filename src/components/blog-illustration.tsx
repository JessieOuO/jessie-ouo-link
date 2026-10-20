export function BlogIllustration() {
  return (
    <div className="illustration">
      <svg
        className="scene-background"
        aria-hidden="true"
        viewBox="0 0 520 460"
        width="520"
        height="460"
        fill="none"
      >
        <path
          className="scene-ground"
          d="M77 185C91 92 176 60 269 70c91-25 179 30 191 117 31 80-7 166-89 190-79 42-170 25-233-4-81-18-104-111-61-188Z"
        />
        <circle className="scene-sun" cx="372" cy="124" r="34" />
        <path
          className="scene-cloud"
          d="M92 164c-4-15 7-26 20-23 4-19 34-19 37 1 18-7 33 14 20 24Z"
        />
        <path
          className="scene-cloud"
          d="M365 224c-4-12 6-23 18-21 5-17 28-16 32 1 16-5 28 12 18 22Z"
        />
        <path
          className="scene-meadow"
          d="M61 334c47-38 92-26 137-2 54-29 99-42 156-12 45-24 97-6 119 29-15 57-94 80-196 78-111 1-186-25-216-58Z"
        />
      </svg>
      <img
        className="blog-artwork"
        src="/assets/cat-on-crocodile-960-d12645d4c3ca.webp"
        srcSet="/assets/cat-on-crocodile-480-1e6abdc95bb8.webp 480w, /assets/cat-on-crocodile-640-109533375d32.webp 640w, /assets/cat-on-crocodile-960-d12645d4c3ca.webp 960w"
        sizes="(max-width: 426px) calc(100vw - 56px), (max-width: 700px) 370px, (max-width: 1320px) 45vw, 520px"
        width="960"
        height="960"
        alt="A little cat sitting on a green crocodile, from Jessie’s blog"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
