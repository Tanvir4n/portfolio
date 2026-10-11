import React from 'react';

export type AstronautMood = 'neutral' | 'happy' | 'sad' | 'focused' | 'thinking' | 'wow';
export type AstronautAction =
  | 'idle'
  | 'wave'
  | 'scan'
  | 'drill'
  | 'flag'
  | 'sample'
  | 'celebrate'
  | 'walk'
  | 'slump';
export type AstronautSayAlign = 'left' | 'right' | 'side';

export interface AstronautProps {
  mood?: AstronautMood;
  action?: AstronautAction;
  size?: number;
  say?: string;
  sayAlign?: AstronautSayAlign;
  className?: string;
  onClick?: () => void;
}

export const Astronaut: React.FC<AstronautProps> = ({
  mood = 'neutral',
  action = 'idle',
  size = 160,
  say,
  sayAlign = 'side',
  className = '',
  onClick,
}) => {
  const width = size;
  const height = Math.round(size * (200 / 160));

  return (
    <div
      className={`astro-wrapper relative inline-flex flex-col items-center select-none ${className}`}
      style={{ width: `${width}px` }}
      onClick={onClick}
    >
      {/* Optional Speech Bubble */}
      {say && (
        <div
          className={`astro-speech-bubble astro-speech-${sayAlign}`}
          role="status"
          aria-live="polite"
        >
          <span className="astro-speech-text">{say}</span>
          <span className="astro-speech-tail" aria-hidden="true" />
        </div>
      )}

      {/* Main SVG Astronaut Illustration */}
      <svg
        viewBox="0 0 160 200"
        className="astro w-full overflow-visible"
        data-action={action}
        data-mood={mood}
        style={{ width: `${width}px`, height: `${height}px` }}
        role="img"
        aria-label={`Astronaut Astra in ${action} state with ${mood} expression`}
      >
        <defs>
          <linearGradient id="astro-visor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1d2742" />
            <stop offset="100%" stopColor="#090c16" />
          </linearGradient>
          <linearGradient id="astro-suit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3f0ea" />
            <stop offset="100%" stopColor="#cfcac0" />
          </linearGradient>
          <linearGradient id="astro-gold-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="astro-scan-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Contact Shadow */}
        <ellipse
          className="astro-shadow"
          cx="80"
          cy="192"
          rx="30"
          ry="3.6"
          fill="#000"
          opacity="0.45"
        />

        {/* Floating / Bobbing Body Group */}
        <g className={`astro-body ${action === 'slump' ? 'astro-body-slump' : ''}`}>
          {/* Backpack (Life Support System) */}
          <rect
            className="astro-backpack"
            x="50"
            y="76"
            width="60"
            height="58"
            rx="12"
            fill="#bdb7ac"
            stroke="#2f3035"
            strokeWidth="1.4"
          />
          {/* Oxygen Tank Lines on Backpack */}
          <line x1="58" y1="84" x2="58" y2="124" stroke="#8d887e" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
          <line x1="102" y1="84" x2="102" y2="124" stroke="#8d887e" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />

          {/* Action Attachment: Flag Pole behind body if action is flag */}
          {action === 'flag' && (
            <g className="astro-tool-flag" transform="translate(108, 48)">
              <line x1="0" y1="0" x2="0" y2="110" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="0,4 28,14 0,24" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
              <circle cx="12" cy="14" r="3.2" fill="#ffffff" />
            </g>
          )}

          {/* Legs & Boots */}
          <g className={`astro-leg-l ${action === 'walk' ? 'astro-leg-l-walk' : ''}`}>
            <rect
              x="62"
              y="124"
              width="16"
              height="44"
              rx="7"
              fill="url(#astro-suit)"
              stroke="#2f3035"
              strokeWidth="1.4"
            />
            <rect
              x="58"
              y="162"
              width="22"
              height="13"
              rx="6"
              fill="#8d887e"
              stroke="#2f3035"
              strokeWidth="1.4"
            />
            {/* Boot Tread Stripe */}
            <line x1="60" y1="172" x2="78" y2="172" stroke="#2f3035" strokeWidth="1.2" />
          </g>
          <g className={`astro-leg-r ${action === 'walk' ? 'astro-leg-r-walk' : ''}`}>
            <rect
              x="82"
              y="124"
              width="16"
              height="44"
              rx="7"
              fill="url(#astro-suit)"
              stroke="#2f3035"
              strokeWidth="1.4"
            />
            <rect
              x="80"
              y="162"
              width="22"
              height="13"
              rx="6"
              fill="#8d887e"
              stroke="#2f3035"
              strokeWidth="1.4"
            />
            {/* Boot Tread Stripe */}
            <line x1="82" y1="172" x2="100" y2="172" stroke="#2f3035" strokeWidth="1.2" />
          </g>

          {/* Torso */}
          <rect
            className="astro-torso"
            x="56"
            y="80"
            width="48"
            height="52"
            rx="16"
            fill="url(#astro-suit)"
            stroke="#2f3035"
            strokeWidth="1.4"
          />

          {/* Torso Chest Display & LED Indicators */}
          <rect
            x="67"
            y="95"
            width="26"
            height="17"
            rx="4"
            fill="#16171b"
            stroke="#2f3035"
          />
          <circle className="astro-led astro-led-1" cx="73" cy="103.5" r="2" fill="#f2c879" />
          <circle className="astro-led astro-led-2" cx="80" cy="103.5" r="2" fill="#8fb4ea" />
          <circle className="astro-led astro-led-3" cx="87" cy="103.5" r="2" fill="#7cc8a0" />

          {/* Torso Mission Badge */}
          <polygon points="80,85 83,89 87,89 84,92 85,96 80,93 75,96 76,92 73,89 77,89" fill="url(#astro-gold-accent)" opacity="0.85" />

          {/* Left Arm: Pivot is Left Shoulder (57, 93) */}
          <g className={`astro-arm-l astro-arm-l-${action}`}>
            {action === 'celebrate' ? (
              <g transform="translate(57, 93) rotate(135)">
                <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
              </g>
            ) : action === 'walk' ? (
              <g transform="translate(57, 93)">
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="15; -15; 15"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                  <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                  <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
                </g>
              </g>
            ) : action === 'slump' ? (
              <g transform="translate(57, 93) rotate(8)">
                <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
              </g>
            ) : (
              <g transform="translate(57, 93)">
                <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
              </g>
            )}
          </g>

          {/* Right Arm: Pivot is Right Shoulder (103, 93) */}
          <g className={`astro-arm-r astro-arm-r-${action}`}>
            {action === 'wave' ? (
              <g transform="translate(103, 93)">
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="-135; -152; -135"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                  <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                  <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
                </g>
              </g>
            ) : action === 'celebrate' ? (
              <g transform="translate(103, 93) rotate(-135)">
                <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
              </g>
            ) : action === 'scan' ? (
              <g transform="translate(103, 93) rotate(-75)">
                <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
                <rect x="-5" y="39" width="10" height="12" rx="2" fill="#0284c7" stroke="#2f3035" strokeWidth="1" />
                <polygon points="5,45 60,25 60,65" fill="url(#astro-scan-beam)" className="astro-scan-light" />
              </g>
            ) : action === 'drill' ? (
              <g transform="translate(103, 93) rotate(-50)">
                <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
                <rect x="-4" y="39" width="8" height="14" rx="2" fill="#475569" stroke="#2f3035" strokeWidth="1" />
                <polygon points="0,53 -3,68 3,68" fill="#94a3b8" stroke="#334155" strokeWidth="1" className="astro-drill-bit" />
              </g>
            ) : action === 'sample' ? (
              <g transform="translate(103, 93) rotate(-40)">
                <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
                <polygon points="0,38 9,42 7,52 -3,50" fill="#f97316" stroke="#c2410c" strokeWidth="1" className="astro-glowing-sample" />
              </g>
            ) : action === 'walk' ? (
              <g transform="translate(103, 93)">
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="-15; 15; -15"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                  <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                  <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
                </g>
              </g>
            ) : action === 'slump' ? (
              <g transform="translate(103, 93) rotate(-8)">
                <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
              </g>
            ) : (
              <g transform="translate(103, 93)">
                <rect x="-7" y="-7" width="14" height="42" rx="7" fill="url(#astro-suit)" stroke="#2f3035" strokeWidth="1.4" />
                <circle cx="0" cy="38" r="6.5" fill="#8d887e" stroke="#2f3035" strokeWidth="1.4" />
              </g>
            )}
          </g>

          {/* Celebrate Stars Particles */}
          {action === 'celebrate' && (
            <g className="astro-celebrate-particles" fill="#fef08a">
              <circle cx="36" cy="42" r="2.5" />
              <circle cx="124" cy="42" r="2.5" />
              <polygon points="80,18 82,23 87,24 83,27 84,32 80,29 76,32 77,27 73,24 78,23" fill="#fde047" />
            </g>
          )}

          {/* Helmet & Visor */}
          <g className={`astro-head ${action === 'slump' ? 'astro-head-slump' : ''}`}>
            {/* Outer Helmet Sphere */}
            <circle
              cx="80"
              cy="56"
              r="30"
              fill="url(#astro-suit)"
              stroke="#2f3035"
              strokeWidth="1.5"
            />
            {/* Helmet Spotlight Lamp */}
            <circle
              cx="62"
              cy="34"
              r="2.2"
              fill="#f2c879"
              className="astro-lamp"
            />
            {/* Visor Screen */}
            <rect
              className="astro-visor-screen"
              x="57"
              y="40"
              width="46"
              height="32"
              rx="15"
              fill="url(#astro-visor)"
              stroke="#2f3035"
              strokeWidth="1.4"
            />
            {/* Visor Glare Curve */}
            <path
              d="M 64 45 Q 75 42 86 45"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Visor HUD Face (Expression swaps based on mood prop) */}
            <g className="astro-face" stroke="#f2c879" fill="none" strokeWidth="2.2">
              {mood === 'neutral' && (
                <g className="face face-neutral">
                  <circle cx="71" cy="56" r="2.1" fill="#f2c879" stroke="none" />
                  <circle cx="89" cy="56" r="2.1" fill="#f2c879" stroke="none" />
                  <path d="M76 64 L84 64" strokeLinecap="round" />
                </g>
              )}

              {mood === 'happy' && (
                <g className="face face-happy">
                  <path d="M68 57 Q71 52 74 57" strokeLinecap="round" />
                  <path d="M86 57 Q89 52 92 57" strokeLinecap="round" />
                  <path d="M75 62 Q80 67 85 62" strokeLinecap="round" />
                </g>
              )}

              {mood === 'sad' && (
                <g className="face face-sad">
                  <circle cx="71" cy="57" r="2.1" fill="#f2c879" stroke="none" />
                  <circle cx="89" cy="57" r="2.1" fill="#f2c879" stroke="none" />
                  <path d="M76 66 Q80 62 84 66" strokeLinecap="round" />
                </g>
              )}

              {mood === 'focused' && (
                <g className="face face-focused">
                  <line x1="68" y1="54" x2="74" y2="56" strokeLinecap="round" />
                  <line x1="92" y1="54" x2="86" y2="56" strokeLinecap="round" />
                  <circle cx="71" cy="57" r="1.8" fill="#f2c879" stroke="none" />
                  <circle cx="89" cy="57" r="1.8" fill="#f2c879" stroke="none" />
                  <line x1="77" y1="64" x2="83" y2="64" strokeLinecap="round" strokeWidth="1.8" />
                </g>
              )}

              {mood === 'thinking' && (
                <g className="face face-thinking">
                  <circle cx="71" cy="55" r="2.1" fill="#f2c879" stroke="none" />
                  <path d="M86 53 Q89 50 92 53" strokeLinecap="round" />
                  <path d="M76 64 Q80 62 84 64" strokeLinecap="round" />
                </g>
              )}

              {mood === 'wow' && (
                <g className="face face-wow">
                  <circle cx="71" cy="55" r="2.8" fill="#f2c879" stroke="none" />
                  <circle cx="89" cy="55" r="2.8" fill="#f2c879" stroke="none" />
                  <ellipse cx="80" cy="64.5" rx="3.5" ry="4.2" strokeWidth="1.8" />
                </g>
              )}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Astronaut;
