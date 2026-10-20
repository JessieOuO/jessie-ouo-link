export function OuoIllustration() {
  return (
    <div className="illustration">
      <svg
        className="ouo-scene"
        role="img"
        aria-labelledby="ouo-title ouo-description"
        viewBox="0 0 520 460"
        width="520"
        height="460"
        fill="none"
      >
        <title id="ouo-title">A little hello from OuO</title>
        <desc id="ouo-description">
          A smiling blue bunny with an OuO face waves hello, beside a small pink star and a letter.
        </desc>
        <path
          className="scene-ground"
          d="M77 185C91 92 176 60 269 70c91-25 179 30 191 117 31 80-7 166-89 190-79 42-170 25-233-4-81-18-104-111-61-188Z"
        />
        <path
          className="scene-cloud"
          d="M102 160c-4-15 7-26 20-23 4-19 34-19 37 1 18-7 33 14 20 24Z"
        />
        <path
          className="scene-cloud"
          d="M359 233c-4-12 6-23 18-21 5-17 28-16 32 1 16-5 28 12 18 22Z"
        />
        <g className="little-spark" stroke="#9aaecd" strokeWidth="3.5" strokeLinecap="round">
          <path d="m108 87 3-13m-13 8 20 4M450 177l4-14m-12 5 18 5" />
        </g>
        <g className="hello-bubble" stroke="#344b69" strokeWidth="3" strokeLinejoin="round">
          <path
            d="M369 59h67c15 0 25 10 25 24v19c0 14-10 24-25 24h-48l-23 16 3-20c-14-1-23-10-23-24V83c0-14 10-24 24-24Z"
            fill="#fffdf8"
          />
          <text
            x="400"
            y="103"
            textAnchor="middle"
            fill="#344b69"
            stroke="none"
            fontSize="26"
            fontWeight="800"
          >
            hello!
          </text>
        </g>
        <ellipse cx="273" cy="390" rx="144" ry="12" className="scene-floor" />
        <g
          className="ouo-character"
          stroke="#344b69"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M214 357c-9 11-14 23-6 29 10 7 33-1 42-12m61-15c14 6 28 17 23 25-5 10-30 4-42-8"
            fill="#bdddf0"
          />
          <path
            d="M190 223c-15-32-25-71-9-84 16-14 33 12 49 36 23-5 49-4 72 4 15-35 29-62 46-56 20 7 12 47-2 82 28 21 45 51 43 89-3 51-44 81-105 82-66 5-113-21-118-70-4-33 4-60 24-83Z"
            fill="#bdddf0"
          />
          <path d="M190 162c5 10 11 23 17 35m125-48-11 39" stroke="#8fb8d3" strokeWidth="10" />
          <path
            className="waving-hand"
            d="M377 270c16-6 26-30 37-27 16 5 7 23-7 37-6 6-13 10-20 13"
            fill="#bdddf0"
          />
          <ellipse cx="218" cy="281" rx="18" ry="10" fill="#f1bdc6" stroke="none" />
          <ellipse cx="336" cy="281" rx="18" ry="10" fill="#f1bdc6" stroke="none" />
          <ellipse
            className="ouo-eye"
            cx="245"
            cy="259"
            rx="7"
            ry="11"
            fill="#344b69"
            stroke="none"
          />
          <ellipse
            className="ouo-eye"
            cx="309"
            cy="259"
            rx="7"
            ry="11"
            fill="#344b69"
            stroke="none"
          />
          <path d="M265 271v5c0 16 24 16 24 0v-5" />
          <path d="M258 340c9 4 23 4 32 0" stroke="#8fb8d3" />
          <g transform="rotate(-12 185 320)">
            <rect x="135" y="287" width="103" height="73" rx="10" fill="#fffdf8" />
            <path d="m140 293 44 33c2 2 5 2 7 0l42-33m-91 59 29-25m59 25-27-25" />
            <path d="M186 315c-14-13-22 7 0 18 22-11 14-31 0-18Z" fill="#efb6c3" stroke="none" />
          </g>
          <path d="M179 301c-9-7-17-6-20 1-5 12 13 22 24 18" fill="#bdddf0" />
        </g>
        <g
          className="star-friend"
          stroke="#705066"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M103 297c4-8 11-8 15 1l12 26 27 5c10 2 11 9 3 15l-21 19 2 29c1 10-5 13-13 8l-25-15-24 15c-9 5-14 2-13-8l3-29-22-19c-7-6-5-13 4-15l29-5Z"
            fill="#f3c7d1"
          />
          <path d="M88 354v5m28-5v5m-18 4q4 7 9 0" />
          <path d="m62 363-9 4m94-4 9 4" />
        </g>
        <g className="scene-flower" transform="translate(426 332)">
          <path
            d="M0-10C-21-32-32 1-10 3-32 24 2 34 4 12c22 21 33-12 11-14C36-23 2-33 0-10Z"
            fill="#f5dfac"
            stroke="#88734b"
            strokeWidth="2.5"
          />
          <circle cx="3" cy="2" r="7" fill="#fffdf8" stroke="#88734b" strokeWidth="2.5" />
          <path d="m6 31 3 16" stroke="#96aa92" strokeWidth="3" strokeLinecap="round" />
        </g>
        <path d="M124 224c-16-15-26 7 0 21 26-14 16-36 0-21Z" fill="#f2c4ce" />
        <path d="m243 92 4-11 4 11 11 4-11 4-4 11-4-11-11-4Z" fill="#edcf85" />
      </svg>
      <p className="illustration-caption">
        a little hello from <span>OuO</span>
      </p>
    </div>
  );
}
