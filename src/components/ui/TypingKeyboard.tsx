import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TypingKeyboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text to auto-type in a loop */
  autoTypeText?: string;
  /** [min, max] ms delay between keystrokes */
  typingSpeed?: [number, number];
  /** Overall scale factor (optional; auto-scales if not provided) */
  scale?: number;
  /** Accent color (modifier keys + screen glow) */
  accentColor?: string;
  /** Secondary accent (enter key) */
  secondaryAccent?: string;
  /** Optional interactive prompt badge */
  showControls?: boolean;
}

// ─── Key sub-component ──────────────────────────────────────────────────────

function Key({ size = "", accent = "" }: { size?: string; accent?: string }) {
  const s = size ? `--${size}` : "";
  const a1 = accent === "b" ? " tk-face--b" : accent === "o" ? " tk-face--o" : "";

  return (
    <div className={`tk-key tk-flex${size ? ` tk-key${s}` : ""}`}>
      <div className={`tk-key__front tk-face${size ? ` tk-key__front${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b3" : a1 === " tk-face--o" ? " tk-face--o3" : ""}`} />
      <div className={`tk-key__back tk-face${size ? ` tk-key__back${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}`} />
      <div className={`tk-key__right tk-face${size ? ` tk-key__right${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}`} />
      <div className={`tk-key__left tk-face${size ? ` tk-key__left${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b2" : a1 === " tk-face--o" ? " tk-face--o2" : ""}`} />
      <div className={`tk-key__top tk-face${size ? ` tk-key__top${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}`} />
      <div className={`tk-key__bottom tk-face${size ? ` tk-key__bottom${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b2" : a1 === " tk-face--o" ? " tk-face--o2" : ""}`} />
    </div>
  );
}

// ─── Keycode → DOM index map ────────────────────────────────────────────────

const KC_MAP: Record<number, number> = {
  81: 15, 87: 16, 69: 17, 82: 18, 84: 19, 89: 20, 85: 21, 73: 22, 79: 23, 80: 24,
  65: 29, 83: 30, 68: 31, 70: 32, 71: 33, 72: 34, 74: 35, 75: 36, 76: 37,
  90: 41, 88: 42, 67: 43, 86: 44, 66: 45, 78: 46, 77: 47,
  32: 56, 13: 39, 8: 27,
};

// ─── Main Component ─────────────────────────────────────────────────────────

export function TypingKeyboard({
  className,
  autoTypeText = "Hi, I’m Tanvir. A curious developer, passionate about AI, and obsessed with building things that matter. Crafted with ambition, driven by curiosity, and always building something new.",
  typingSpeed = [35, 95],
  scale,
  accentColor = "#3b82f6",
  secondaryAccent = "#ff6545",
  showControls = true,
  ...props
}: TypingKeyboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const kbRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const [activeAccent, setActiveAccent] = useState(accentColor);
  const [activeSecondary, setActiveSecondary] = useState(secondaryAccent);
  const [effectiveScale, setEffectiveScale] = useState(scale ?? 0.82);
  const [isTypingManual, setIsTypingManual] = useState(false);

  // Responsive scale detection
  useEffect(() => {
    if (scale !== undefined) {
      setEffectiveScale(scale);
      return;
    }
    const updateScale = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      if (w < 480) {
        setEffectiveScale(0.44);
      } else if (w < 640) {
        setEffectiveScale(0.55);
      } else if (w < 820) {
        setEffectiveScale(0.68);
      } else if (w < 1024) {
        setEffectiveScale(0.78);
      } else {
        setEffectiveScale(0.85);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [scale]);

  // Press key helper
  const pressKey = useCallback((kc: number) => {
    const kb = kbRef.current;
    if (!kb) return;
    const allKeys = kb.querySelectorAll<HTMLDivElement>(".tk-key");
    const domIdx = KC_MAP[kc];
    const el = allKeys[domIdx];
    if (el) {
      el.classList.add("tk-key--down");
      setTimeout(() => el.classList.remove("tk-key--down"), 90);
    }
  }, []);

  // Auto-typing animation loop
  useEffect(() => {
    const kb = kbRef.current;
    const screen = screenRef.current;
    if (!kb || !screen) return;

    // Set fixed isometric perspective
    kb.style.transform = "perspective(10000px) rotateX(55deg) rotateZ(-30deg)";

    let alive = true;
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (!alive || !screen) return;
      if (isTypingManual) {
        // Paused if user clicked or typed manually
        timer = setTimeout(typeNext, 500);
        return;
      }

      const char = autoTypeText[idx];
      if (char !== undefined) {
        const kc = char === " " ? 32 : char.toUpperCase().charCodeAt(0);
        pressKey(kc);
        screen.innerHTML += char === " " ? " " : char;
        // Auto scroll screen to bottom as text fills
        screen.scrollTop = screen.scrollHeight;
      }

      idx++;
      if (idx >= autoTypeText.length) {
        timer = setTimeout(() => {
          if (!alive) return;
          screen.innerHTML = "";
          idx = 0;
          timer = setTimeout(typeNext, 1200);
        }, 2800);
      } else {
        const delay = typingSpeed[0] + Math.random() * (typingSpeed[1] - typingSpeed[0]);
        timer = setTimeout(typeNext, delay);
      }
    };

    timer = setTimeout(typeNext, 1200);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [autoTypeText, typingSpeed, pressKey, isTypingManual]);

  // Handle manual keyboard typing from visitor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if focused on an input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      const screen = screenRef.current;
      if (!screen) return;

      const kc = e.keyCode || e.which;
      if (KC_MAP[kc] !== undefined) {
        pressKey(kc);
        setIsTypingManual(true);

        if (kc === 8) {
          // Backspace
          screen.innerHTML = screen.innerHTML.slice(0, -1);
        } else if (kc === 13) {
          // Enter
          screen.innerHTML += "<br/>";
        } else if (kc === 32) {
          screen.innerHTML += " ";
        } else if (e.key && e.key.length === 1) {
          screen.innerHTML += e.key;
        }
        screen.scrollTop = screen.scrollHeight;

        // Resume auto-typing after 5s of inactivity
        const resetTimer = setTimeout(() => {
          setIsTypingManual(false);
        }, 5000);
        return () => clearTimeout(resetTimer);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pressKey]);

  return (
    <div className={cn("tk-wrapper", className)} ref={containerRef} {...props}>
      <style>{`
        .tk-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 24px 12px 10px;
        }

        .tk-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 920px;
          margin-bottom: 22px;
          padding: 0 10px;
          font-family: var(--mono, monospace);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted, #666);
          flex-wrap: wrap;
          gap: 12px;
          z-index: 2;
        }

        .tk-controls {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .tk-palette-btn {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          border: 1.5px solid var(--ink, #171717);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 1.5px 1.5px 0 var(--ink, #171717);
        }
        .tk-palette-btn:hover {
          transform: translateY(-1px);
        }

        .tk-container * { transform-style: preserve-3d; }
        .tk-container {
          width: 100%;
          height: 520px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: var(--sans, sans-serif);
          font-weight: bolder;
          color: rgba(255,255,251,0.7);
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
        }
        .tk-main {
          width: 800px;
          height: 560px;
          position: relative;
          cursor: pointer;
          transform: scale(${effectiveScale}) translateY(40px);
          transform-origin: center center;
          transition: transform 0.25s ease-out;
          margin-top: 30px;
        }
        .tk-flex { display: flex; justify-content: center; align-items: center; }
        .tk-face { position: absolute; }

        /* Keyboard body */
        .tk-keyboard {
          width: 500px;
          height: 160px;
          transform: perspective(10000px) rotateX(55deg) rotateZ(-30deg);
        }
        .tk-keyboard__front {
          width: 500px;
          height: 25px;
          transform: rotateX(-90deg) translateZ(80px);
          background-color: #9C9C9C;
          border-bottom: 2px solid #555;
        }
        .tk-keyboard__back {
          width: 500px;
          height: 25px;
          transform: rotateX(90deg) translateZ(80px);
          background-color: #FFFFFB;
        }
        .tk-keyboard__top {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 500px;
          height: 160px;
          transform: rotateY(0deg) translateZ(12.5px);
          background-image: linear-gradient(to bottom, color-mix(in srgb, ${activeAccent} 35%, #eef2ff), color-mix(in srgb, #1a1919 85%, #fff));
          border: 1px solid rgba(0,0,0,0.15);
        }
        .tk-keyboard__bottom {
          width: 500px;
          height: 160px;
          transform: rotateY(180deg) translateZ(12.5px);
          background-color: #EAE7E5;
        }
        .tk-keyboard__right {
          width: 25px;
          height: 160px;
          transform: rotateY(90deg) translateZ(250px);
          background-color: #FFFFFB;
        }
        .tk-keyboard__left {
          width: 25px;
          height: 160px;
          transform: rotateY(90deg) translateZ(-250px);
          background-color: #EAE7E5;
        }

        /* Screen */
        .tk-screen {
          width: 320px;
          height: 225px;
          transform: translateZ(155px) translateY(-175px) rotateX(270deg);
          background-color: ${activeAccent};
          border-radius: 8px;
          padding: 16px 18px;
          font-family: var(--mono, "Space Mono", monospace);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.55;
          word-wrap: break-word;
          white-space: pre-wrap;
          overflow-y: auto;
          overflow-x: hidden;
          text-transform: none;
          letter-spacing: 0.5px;
          color: #ffffff;
          align-items: flex-start !important;
          justify-content: flex-start !important;
          border: 2px solid rgba(255,255,255,0.4);
          box-shadow:
            0 0 8px color-mix(in srgb, ${activeAccent} 85%, transparent),
            0 0 16px color-mix(in srgb, ${activeAccent} 70%, transparent),
            0 0 28px color-mix(in srgb, ${activeAccent} 60%, transparent),
            0 0 45px color-mix(in srgb, ${activeAccent} 45%, transparent),
            0 0 65px color-mix(in srgb, ${activeAccent} 30%, transparent);
          animation: tk-screen-flicker 1.8s ease-in alternate infinite;
          scrollbar-width: thin;
        }
        .tk-screen::-webkit-scrollbar {
          width: 4px;
        }
        .tk-screen::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 4px;
        }
        @keyframes tk-screen-flicker {
          0%, 92%, 97% {
            background-color: ${activeAccent};
            opacity: 1;
          }
          94%, 100% {
            background-color: color-mix(in srgb, ${activeAccent} 82%, black);
            opacity: 0.94;
          }
        }

        /* Keys container */
        .tk-keys {
          display: flex;
          justify-content: space-between;
          width: 100%;
          transform: translateZ(4px);
          padding: 0 3px;
        }

        /* Individual key — depth is 8px */
        .tk-key { width: 30px; height: 27px; transition: transform 0.05s ease, filter 0.05s ease; cursor: pointer; }
        .tk-key--w2 { width: 60px; }
        .tk-key--w3 { width: 90px; }
        .tk-key--w6 { width: 195px; }

        .tk-key__front { width: 30px; height: 8px; transform: rotateX(-90deg) translateZ(13.5px); background-color: #838383; }
        .tk-key__front--w2 { width: 60px; }
        .tk-key__front--w3 { width: 90px; }
        .tk-key__front--w6 { width: 195px; }

        .tk-key__back { width: 30px; height: 8px; transform: rotateX(90deg) translateZ(13.5px); background-color: #FFFFFB; }
        .tk-key__back--w2 { width: 60px; }
        .tk-key__back--w3 { width: 90px; }
        .tk-key__back--w6 { width: 195px; }

        .tk-key__top {
          width: 30px;
          height: 27px;
          transform: rotateY(0deg) translateZ(4px);
          background-color: #FFFFFB;
          background-image: linear-gradient(to bottom, color-mix(in srgb, ${activeAccent} 25%, white), #FFFFFB);
          box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.12), 0 -1px 2px rgba(0,0,0,0.08);
        }
        .tk-key__top--w2 { width: 60px; }
        .tk-key__top--w3 { width: 90px; }
        .tk-key__top--w6 { width: 195px; }

        .tk-key__bottom { width: 30px; height: 27px; transform: rotateY(180deg) translateZ(4px); background-color: #838383; }
        .tk-key__bottom--w2 { width: 60px; }
        .tk-key__bottom--w3 { width: 90px; }
        .tk-key__bottom--w6 { width: 195px; }

        .tk-key__right { width: 8px; height: 27px; transform: rotateY(90deg) translateZ(15px); background-color: #838383; }
        .tk-key__right--w2 { transform: rotateY(90deg) translateZ(30px); }
        .tk-key__right--w3 { transform: rotateY(90deg) translateZ(45px); }
        .tk-key__right--w6 { transform: rotateY(90deg) translateZ(97.5px); }

        .tk-key__left {
          width: 8px;
          height: 27px;
          transform: rotateY(90deg) translateZ(-15px);
          background-image: linear-gradient(to bottom, #c4c4c4, #b8b8b8);
        }
        .tk-key__left--w2 { transform: rotateY(90deg) translateZ(-30px); }
        .tk-key__left--w3 { transform: rotateY(90deg) translateZ(-45px); }
        .tk-key__left--w6 { transform: rotateY(90deg) translateZ(-97.5px); }

        /* Accent colors */
        .tk-face--b1 { background: ${activeAccent}; }
        .tk-face--b2 { background-image: linear-gradient(to bottom, color-mix(in srgb, ${activeAccent} 80%, black), ${activeAccent}); }
        .tk-face--b3 { background-color: color-mix(in srgb, ${activeAccent} 60%, black); }

        .tk-face--o1 { background: ${activeSecondary}; }
        .tk-face--o2 { background-image: linear-gradient(to bottom, color-mix(in srgb, ${activeSecondary} 80%, black), ${activeSecondary}); }
        .tk-face--o3 { background-color: color-mix(in srgb, ${activeSecondary} 60%, black); }

        /* Pressed state */
        .tk-key--down {
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translateZ(-5px);
          transition: transform 0.04s ease;
        }
        .tk-key--down > .tk-key__top {
          background: color-mix(in srgb, ${activeSecondary} 85%, white) !important;
          box-shadow: 0 0 6px ${activeSecondary};
        }

        .tk-hint-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border: 1px solid var(--soft-line, #e5e5e5);
          background: var(--paper, #fff);
          color: var(--ink, #171717);
          box-shadow: 2px 2px 0 var(--ink, #171717);
        }

        html[data-theme=dark] .tk-hint-pill {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.18);
          box-shadow: 2px 2px 0 #000;
          color: #fff;
        }
      `}</style>

      {showControls && (
        <div className="tk-top-bar">
          <div className="tk-hint-pill">
            <span style={{ color: activeAccent }}>●</span>
            <span>{isTypingManual ? "USER INPUT ACTIVE (PRESS ANY KEY)" : "LIVE ISOMETRIC TERMINAL"}</span>
          </div>

          <div className="tk-controls">
            <span>THEME:</span>
            <button
              type="button"
              className="tk-palette-btn"
              style={{ backgroundColor: "#3b82f6" }}
              title="Cyan Blue HUD"
              onClick={() => {
                setActiveAccent("#3b82f6");
                setActiveSecondary("#ff6545");
              }}
            />
            <button
              type="button"
              className="tk-palette-btn"
              style={{ backgroundColor: "#10b981" }}
              title="Matrix / Cyber Green"
              onClick={() => {
                setActiveAccent("#10b981");
                setActiveSecondary("#dbfe38");
              }}
            />
            <button
              type="button"
              className="tk-palette-btn"
              style={{ backgroundColor: "#a855f7" }}
              title="Neon Violet"
              onClick={() => {
                setActiveAccent("#a855f7");
                setActiveSecondary("#ff6545");
              }}
            />
            <button
              type="button"
              className="tk-palette-btn"
              style={{ backgroundColor: "#ff6545" }}
              title="Solar Amber Coral"
              onClick={() => {
                setActiveAccent("#ff6545");
                setActiveSecondary("#3b82f6");
              }}
            />
          </div>
        </div>
      )}

      <div className="tk-container">
        <div
          className="tk-main tk-flex"
          ref={mainRef}
          onClick={() => {
            // Click to trigger a random key press animation
            const sampleKeys = [65, 83, 68, 70, 74, 75, 76, 32, 13];
            const randKey = sampleKeys[Math.floor(Math.random() * sampleKeys.length)];
            pressKey(randKey);
          }}
          title="Click keys or type on your physical keyboard!"
        >
          <div className="tk-keyboard tk-flex" ref={kbRef}>
            <div className="tk-screen tk-flex" ref={screenRef} />

            <div className="tk-keyboard__front tk-face" />
            <div className="tk-keyboard__back tk-face" />
            <div className="tk-keyboard__right tk-face" />
            <div className="tk-keyboard__left tk-face" />
            <div className="tk-keyboard__top tk-face">
              {/* Row 1 */}
              <div className="tk-keys">
                <Key accent="b" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <Key key={`r1-${i}`} />
                ))}
                <Key size="w2" accent="b" />
              </div>

              {/* Row 2 */}
              <div className="tk-keys">
                <Key size="w2" accent="b" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <Key key={`r2-${i}`} />
                ))}
                <Key accent="b" />
              </div>

              {/* Row 3 */}
              <div className="tk-keys">
                <Key size="w3" accent="b" />
                {Array.from({ length: 10 }).map((_, i) => (
                  <Key key={`r3-${i}`} />
                ))}
                <Key size="w2" accent="o" />
              </div>

              {/* Row 4 */}
              <div className="tk-keys">
                <Key size="w2" accent="b" />
                {Array.from({ length: 11 }).map((_, i) => (
                  <Key key={`r4-${i}`} />
                ))}
                <Key size="w3" accent="b" />
              </div>

              {/* Row 5 */}
              <div className="tk-keys">
                <Key accent="b" />
                <Key accent="o" />
                {Array.from({ length: 2 }).map((_, i) => (
                  <Key key={`r5a-${i}`} accent="b" />
                ))}
                <Key size="w6" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Key key={`r5b-${i}`} accent="b" />
                ))}
              </div>
            </div>
            <div className="tk-keyboard__bottom tk-face" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingKeyboard;
