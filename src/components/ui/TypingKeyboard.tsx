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

interface KeyProps {
  size?: string;
  accent?: string;
  label?: string;
  subLabel?: string;
  homing?: boolean;
}

function Key({ size = "", accent = "", label = "", subLabel = "", homing = false }: KeyProps) {
  const s = size ? `--${size}` : "";
  const a1 = accent === "b" ? " tk-face--b" : accent === "o" ? " tk-face--o" : "";

  return (
    <div className={`tk-key tk-flex${size ? ` tk-key${s}` : ""}`}>
      <div className={`tk-key__front tk-face${size ? ` tk-key__front${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b3" : a1 === " tk-face--o" ? " tk-face--o3" : ""}`} />
      <div className={`tk-key__back tk-face${size ? ` tk-key__back${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}`} />
      <div className={`tk-key__right tk-face${size ? ` tk-key__right${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}`} />
      <div className={`tk-key__left tk-face${size ? ` tk-key__left${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b2" : a1 === " tk-face--o" ? " tk-face--o2" : ""}`} />
      <div className={`tk-key__top tk-face${size ? ` tk-key__top${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b1" : a1 === " tk-face--o" ? " tk-face--o1" : ""}`}>
        {label ? (
          <span className="tk-key__legend">
            {subLabel && <span className="tk-key__sublegend">{subLabel}</span>}
            <span className="tk-key__main-label">{label}</span>
            {homing && <span className="tk-key__homing-notch" />}
          </span>
        ) : null}
      </div>
      <div className={`tk-key__bottom tk-face${size ? ` tk-key__bottom${s}` : ""}${a1 === " tk-face--b" ? " tk-face--b2" : a1 === " tk-face--o" ? " tk-face--o2" : ""}`} />
    </div>
  );
}

// ─── Keycode → DOM index map ────────────────────────────────────────────────
// Matches precise 0-indexed DOM child positions
const KC_MAP: Record<number, number> = {
  81: 15, 87: 16, 69: 17, 82: 18, 84: 19, 89: 20, 85: 21, 73: 22, 79: 23, 80: 24,
  65: 29, 83: 30, 68: 31, 70: 32, 71: 33, 72: 34, 74: 35, 75: 36, 76: 37,
  90: 41, 88: 42, 67: 43, 86: 44, 66: 45, 78: 46, 77: 47,
  32: 56, 13: 39, 8: 13,
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
  const screenScrollRef = useRef<HTMLDivElement>(null);
  const screenTextRef = useRef<HTMLSpanElement>(null);

  const [activeAccent, setActiveAccent] = useState(accentColor);
  const [activeSecondary, setActiveSecondary] = useState(secondaryAccent);
  const [effectiveScale, setEffectiveScale] = useState(scale ?? 0.82);
  const [isTypingManual, setIsTypingManual] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [isInViewport, setIsInViewport] = useState(false);
  const isInViewportRef = useRef(false);

  // Track viewport visibility: only play sound when user is actually at this section
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInViewport(true);
      isInViewportRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.1;
        setIsInViewport(visible);
        isInViewportRef.current = visible;
      },
      { threshold: [0, 0.1, 0.3] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Persistent shared AudioContext (prevents browser context limit exhaustion)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return null;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, []);

  // Web Audio mechanical switch click synthesizer using shared context
  const playClickSound = useCallback(() => {
    // Only play sound if SFX is enabled, section is in viewport, and page tab is active
    if (!sfxEnabled || !isInViewportRef.current || document.hidden) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = "sine";
      const freq = 600 + (Math.random() - 0.5) * 160;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.028);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Audio fallback
    }
  }, [sfxEnabled, getAudioContext]);

  // Unlock browser audio context on first user click or keypress
  useEffect(() => {
    const unlockAudio = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // Responsive scale detection
  useEffect(() => {
    if (scale !== undefined) {
      setEffectiveScale(scale);
      return;
    }
    const updateScale = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      if (w < 480) {
        const mobileScale = Math.min(0.46, Math.max(0.33, (w - 16) / 800));
        setEffectiveScale(mobileScale);
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
      playClickSound();
      setTimeout(() => el.classList.remove("tk-key--down"), 90);
    }
  }, [playClickSound]);

  // Auto-typing animation loop
  useEffect(() => {
    const kb = kbRef.current;
    const screenText = screenTextRef.current;
    const scrollBox = screenScrollRef.current;
    if (!kb || !screenText) return;

    // Fixed isometric perspective matching user's exact chosen layout
    kb.style.transform = "perspective(10000px) rotateX(55deg) rotateZ(-30deg)";

    let alive = true;
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (!alive || !screenText) return;
      if (isTypingManual) {
        timer = setTimeout(typeNext, 500);
        return;
      }

      const char = autoTypeText[idx];
      if (char !== undefined) {
        const kc = char === " " ? 32 : char.toUpperCase().charCodeAt(0);
        pressKey(kc);
        screenText.innerHTML += char === " " ? " " : char;
        if (scrollBox) {
          scrollBox.scrollTop = scrollBox.scrollHeight;
        }
      }

      idx++;
      if (idx >= autoTypeText.length) {
        timer = setTimeout(() => {
          if (!alive) return;
          screenText.innerHTML = "";
          idx = 0;
          timer = setTimeout(typeNext, 1200);
        }, 3000);
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
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      const screenText = screenTextRef.current;
      const scrollBox = screenScrollRef.current;
      if (!screenText) return;

      const kc = e.keyCode || e.which;
      if (KC_MAP[kc] !== undefined) {
        pressKey(kc);
        setIsTypingManual(true);

        if (kc === 8) {
          screenText.innerHTML = screenText.innerHTML.slice(0, -1);
        } else if (kc === 13) {
          screenText.innerHTML += "<br/>";
        } else if (kc === 32) {
          screenText.innerHTML += " ";
        } else if (e.key && e.key.length === 1) {
          screenText.innerHTML += e.key;
        }
        if (scrollBox) {
          scrollBox.scrollTop = scrollBox.scrollHeight;
        }

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
          overflow: visible !important;
          padding: 16px 8px 10px;
        }

        .tk-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 920px;
          margin-bottom: 18px;
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
          gap: 8px;
        }

        .tk-sfx-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--ink, #171717);
          background: var(--paper, #fff);
          border: 1px solid var(--soft-line, #ccc);
          box-shadow: 1.5px 1.5px 0 var(--ink, #171717);
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        .tk-sfx-toggle:hover {
          transform: translateY(-1px);
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

        .tk-container,
        .tk-container * {
          transform-style: preserve-3d !important;
          -webkit-transform-style: preserve-3d !important;
          backface-visibility: visible !important;
          -webkit-backface-visibility: visible !important;
        }
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
          overflow: visible !important;
          perspective: 10000px;
          -webkit-perspective: 10000px;
        }
        .tk-main {
          width: 800px !important;
          min-width: 800px !important;
          max-width: 800px !important;
          height: 560px !important;
          min-height: 560px !important;
          flex-shrink: 0 !important;
          flex-grow: 0 !important;
          position: relative;
          cursor: pointer;
          transform: scale(${effectiveScale}) translateY(40px);
          -webkit-transform: scale(${effectiveScale}) translateY(40px);
          transform-origin: center center;
          -webkit-transform-origin: center center;
          transition: transform 0.25s ease-out;
          margin-top: 30px;
          overflow: visible !important;
        }
        .tk-flex { display: flex; justify-content: center; align-items: center; }
        .tk-face { position: absolute; }

        /* Ambient ground shadow */
        .tk-desk-shadow {
          position: absolute;
          width: 530px;
          height: 190px;
          background: radial-gradient(ellipse at center, rgba(15, 23, 42, 0.28) 0%, rgba(15, 23, 42, 0.08) 55%, transparent 75%);
          filter: blur(16px);
          transform: perspective(10000px) rotateX(55deg) rotateZ(-30deg) translateZ(-42px) translateY(38px);
          border-radius: 40px;
          pointer-events: none;
          z-index: 0;
        }
        html[data-theme=dark] .tk-desk-shadow {
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 55%, transparent 75%);
          filter: blur(22px);
        }

        /* Keyboard body (anodized finish) */
        .tk-keyboard {
          width: 500px;
          height: 160px;
          transform: perspective(10000px) rotateX(55deg) rotateZ(-30deg);
          box-shadow: 0 20px 30px -10px rgba(0,0,0,0.2);
        }
        .tk-keyboard__front {
          width: 500px;
          height: 25px;
          transform: rotateX(-90deg) translateZ(80px);
          background: linear-gradient(180deg, #adadad 0%, #828282 100%);
          border-bottom: 2px solid #444;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
        }
        .tk-keyboard__back {
          width: 500px;
          height: 25px;
          transform: rotateX(90deg) translateZ(80px);
          background: linear-gradient(180deg, #ffffff 0%, #dedede 100%);
        }
        .tk-keyboard__top {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 500px;
          height: 160px;
          transform: rotateY(0deg) translateZ(12.5px);
          background-image: linear-gradient(to bottom, color-mix(in srgb, ${activeAccent} 30%, #e2e8f0), color-mix(in srgb, #1e293b 80%, #ffffff));
          border: 1px solid rgba(0,0,0,0.2);
          box-shadow: inset 0 0 4px rgba(0,0,0,0.25);
        }
        .tk-keyboard__bottom {
          width: 500px;
          height: 160px;
          transform: rotateY(180deg) translateZ(12.5px);
          background-color: #2b2b2b;
        }
        .tk-keyboard__right {
          width: 25px;
          height: 160px;
          transform: rotateY(90deg) translateZ(250px);
          background: linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 100%);
        }
        .tk-keyboard__left {
          width: 25px;
          height: 160px;
          transform: rotateY(90deg) translateZ(-250px);
          background: linear-gradient(180deg, #a1a1aa 0%, #71717a 100%);
        }

        /* Screen - Position maintained accurately */
        .tk-screen {
          width: 320px;
          height: 225px;
          transform: translateZ(155px) translateY(-175px) rotateX(270deg);
          background-color: ${activeAccent};
          border-radius: 9px;
          padding: 12px 14px;
          font-family: var(--mono, "Space Mono", monospace);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.5;
          text-transform: none;
          letter-spacing: 0.3px;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          border: 2px solid rgba(255,255,255,0.48);
          box-shadow:
            inset 0 0 15px rgba(0,0,0,0.35),
            0 0 10px color-mix(in srgb, ${activeAccent} 90%, transparent),
            0 0 20px color-mix(in srgb, ${activeAccent} 75%, transparent),
            0 0 35px color-mix(in srgb, ${activeAccent} 55%, transparent),
            0 0 55px color-mix(in srgb, ${activeAccent} 35%, transparent);
          animation: tk-screen-flicker 2s ease-in alternate infinite;
          overflow: hidden;
          position: relative;
        }

        .tk-screen-glass {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.03) 45%, transparent 65%);
          z-index: 3;
        }

        .tk-screen-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 8px;
          background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px);
          z-index: 2;
          opacity: 0.5;
        }

        .tk-screen-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 6px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.28);
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          z-index: 1;
        }

        .tk-screen-dots {
          display: flex;
          gap: 4px;
        }
        .tk-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }
        .tk-dot-red { background: #ff5f56; }
        .tk-dot-yellow { background: #ffbd2e; }
        .tk-dot-green { background: #27c93f; }

        .tk-screen-title {
          font-weight: 700;
          opacity: 0.95;
        }
        .tk-screen-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 8px;
          background: rgba(255,255,255,0.2);
          padding: 1px 4px;
          border-radius: 2px;
        }

        .tk-screen-body {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          word-wrap: break-word;
          white-space: pre-wrap;
          z-index: 1;
          text-shadow: 0 0 6px rgba(255,255,255,0.7), 0 0 14px color-mix(in srgb, ${activeAccent} 80%, white);
        }
        .tk-screen-body::-webkit-scrollbar {
          width: 3px;
        }
        .tk-screen-body::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.35);
          border-radius: 2px;
        }

        .tk-prompt {
          color: rgba(255, 255, 255, 0.75);
          font-weight: 700;
          user-select: none;
        }

        .tk-cursor {
          display: inline-block;
          color: #ffffff;
          margin-left: 1px;
          animation: tk-cursor-blink 0.85s steps(2, start) infinite;
          vertical-align: baseline;
          font-size: 13px;
        }
        @keyframes tk-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes tk-screen-flicker {
          0%, 93%, 97% {
            background-color: ${activeAccent};
            opacity: 1;
          }
          95%, 100% {
            background-color: color-mix(in srgb, ${activeAccent} 84%, black);
            opacity: 0.95;
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

        /* Individual key */
        .tk-key { width: 30px; height: 27px; transition: transform 0.04s ease; cursor: pointer; }
        .tk-key--w2 { width: 60px; }
        .tk-key--w3 { width: 90px; }
        .tk-key--w6 { width: 195px; }

        .tk-key__front { width: 30px; height: 8px; transform: rotateX(-90deg) translateZ(13.5px); background-color: #78716c; }
        .tk-key__front--w2 { width: 60px; }
        .tk-key__front--w3 { width: 90px; }
        .tk-key__front--w6 { width: 195px; }

        .tk-key__back { width: 30px; height: 8px; transform: rotateX(90deg) translateZ(13.5px); background-color: #fafaf9; }
        .tk-key__back--w2 { width: 60px; }
        .tk-key__back--w3 { width: 90px; }
        .tk-key__back--w6 { width: 195px; }

        .tk-key__top {
          width: 30px;
          height: 27px;
          transform: rotateY(0deg) translateZ(4px);
          background-color: #fafaf9;
          background-image: linear-gradient(to bottom, color-mix(in srgb, ${activeAccent} 18%, #ffffff), #f5f5f4);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.85), inset 0 -1.5px 2px rgba(0,0,0,0.14), 0 1px 2px rgba(0,0,0,0.1);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tk-key__top--w2 { width: 60px; }
        .tk-key__top--w3 { width: 90px; }
        .tk-key__top--w6 { width: 195px; }

        .tk-key__legend {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-family: var(--mono, "Space Mono", monospace);
          font-size: 7.5px;
          font-weight: 700;
          color: #475569;
          letter-spacing: 0;
          user-select: none;
          pointer-events: none;
          line-height: 1;
          position: relative;
        }
        .tk-key__sublegend {
          font-size: 5px;
          opacity: 0.65;
          margin-bottom: 1px;
        }
        .tk-key__main-label {
          letter-spacing: 0;
        }
        .tk-key__homing-notch {
          position: absolute;
          bottom: 2px;
          width: 6px;
          height: 1.5px;
          background: #64748b;
          border-radius: 1px;
        }

        .tk-face--b1 .tk-key__legend,
        .tk-face--o1 .tk-key__legend {
          color: #ffffff !important;
        }

        .tk-key__bottom { width: 30px; height: 27px; transform: rotateY(180deg) translateZ(4px); background-color: #57534e; }
        .tk-key__bottom--w2 { width: 60px; }
        .tk-key__bottom--w3 { width: 90px; }
        .tk-key__bottom--w6 { width: 195px; }

        .tk-key__right { width: 8px; height: 27px; transform: rotateY(90deg) translateZ(15px); background-color: #78716c; }
        .tk-key__right--w2 { transform: rotateY(90deg) translateZ(30px); }
        .tk-key__right--w3 { transform: rotateY(90deg) translateZ(45px); }
        .tk-key__right--w6 { transform: rotateY(90deg) translateZ(97.5px); }

        .tk-key__left {
          width: 8px;
          height: 27px;
          transform: rotateY(90deg) translateZ(-15px);
          background-image: linear-gradient(to bottom, #d6d3d1, #a8a29e);
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
          transition: transform 0.03s ease;
        }
        .tk-key--down > .tk-key__top {
          background: color-mix(in srgb, ${activeSecondary} 85%, white) !important;
          box-shadow: 0 0 8px ${activeSecondary};
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
            <span>{isTypingManual ? "USER INPUT ACTIVE (TYPE FREELY)" : "LIVE ISOMETRIC TERMINAL"}</span>
          </div>

          <div className="tk-controls">
            <button
              type="button"
              className="tk-sfx-toggle"
              onClick={() => {
                const next = !sfxEnabled;
                setSfxEnabled(next);
                if (next) {
                  const ctx = getAudioContext();
                  if (ctx && ctx.state === "suspended") {
                    ctx.resume();
                  }
                }
              }}
              title="Toggle Mechanical Key Sounds"
            >
              <span>{sfxEnabled ? (isInViewport ? "🔊" : "🔈") : "🔇"}</span>
              <span>SFX: {sfxEnabled ? (isInViewport ? "ON" : "STANDBY") : "OFF"}</span>
            </button>

            <span>THEME:</span>
            <button
              type="button"
              className="tk-palette-btn"
              style={{ backgroundColor: "#3b82f6" }}
              title="Cobalt Blue HUD"
              onClick={() => {
                setActiveAccent("#3b82f6");
                setActiveSecondary("#ff6545");
              }}
            />
            <button
              type="button"
              className="tk-palette-btn"
              style={{ backgroundColor: "#10b981" }}
              title="Matrix Cyber Green"
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
              title="Amber Solar Coral"
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
            const sampleKeys = [65, 83, 68, 70, 74, 75, 76, 32, 13];
            const randKey = sampleKeys[Math.floor(Math.random() * sampleKeys.length)];
            pressKey(randKey);
          }}
          title="Click keys or type on your physical keyboard!"
        >
          {/* Soft Ground Contact Shadow */}
          <div className="tk-desk-shadow" />

          <div className="tk-keyboard tk-flex" ref={kbRef}>
            {/* Monitor - Position maintained accurately as chosen */}
            <div className="tk-screen" ref={screenScrollRef}>
              <div className="tk-screen-glass" />
              <div className="tk-screen-scanlines" />

              <div className="tk-screen-header">
                <div className="tk-screen-dots">
                  <span className="tk-dot tk-dot-red" />
                  <span className="tk-dot tk-dot-yellow" />
                  <span className="tk-dot tk-dot-green" />
                </div>
                <span className="tk-screen-title">TTY1 // TANVIR_KERNEL</span>
                <span className="tk-screen-badge">REC ●</span>
              </div>

              <div className="tk-screen-body">
                <span className="tk-prompt">tanvir@core:~$ </span>
                <span className="tk-screen-text" ref={screenTextRef} />
                <span className="tk-cursor">█</span>
              </div>
            </div>

            <div className="tk-keyboard__front tk-face" />
            <div className="tk-keyboard__back tk-face" />
            <div className="tk-keyboard__right tk-face" />
            <div className="tk-keyboard__left tk-face" />
            <div className="tk-keyboard__top tk-face">
              {/* Row 1 - 14 keys */}
              <div className="tk-keys">
                <Key accent="b" label="ESC" />
                <Key label="1" subLabel="!" />
                <Key label="2" subLabel="@" />
                <Key label="3" subLabel="#" />
                <Key label="4" subLabel="$" />
                <Key label="5" subLabel="%" />
                <Key label="6" subLabel="^" />
                <Key label="7" subLabel="&" />
                <Key label="8" subLabel="*" />
                <Key label="9" subLabel="(" />
                <Key label="0" subLabel=")" />
                <Key label="-" subLabel="_" />
                <Key label="=" subLabel="+" />
                <Key size="w2" accent="b" label="BSPC" />
              </div>

              {/* Row 2 - 14 keys */}
              <div className="tk-keys">
                <Key size="w2" accent="b" label="TAB" />
                <Key label="Q" />
                <Key label="W" />
                <Key label="E" />
                <Key label="R" />
                <Key label="T" />
                <Key label="Y" />
                <Key label="U" />
                <Key label="I" />
                <Key label="O" />
                <Key label="P" />
                <Key label="[" subLabel="{" />
                <Key label="]" subLabel="}" />
                <Key accent="b" label="\" subLabel="|" />
              </div>

              {/* Row 3 - 12 keys */}
              <div className="tk-keys">
                <Key size="w3" accent="b" label="CAPS" />
                <Key label="A" />
                <Key label="S" />
                <Key label="D" />
                <Key label="F" homing={true} />
                <Key label="G" />
                <Key label="H" />
                <Key label="J" homing={true} />
                <Key label="K" />
                <Key label="L" />
                <Key label=";" subLabel=":" />
                <Key size="w2" accent="o" label="ENTER" />
              </div>

              {/* Row 4 - 13 keys */}
              <div className="tk-keys">
                <Key size="w2" accent="b" label="SHIFT" />
                <Key label="Z" />
                <Key label="X" />
                <Key label="C" />
                <Key label="V" />
                <Key label="B" />
                <Key label="N" />
                <Key label="M" />
                <Key label="," subLabel="<" />
                <Key label="." subLabel=">" />
                <Key label="/" subLabel="?" />
                <Key size="w3" accent="b" label="SHIFT" />
                <Key accent="b" label="▲" />
              </div>

              {/* Row 5 - 10 keys (mapped for spacebar at index 56) */}
              <div className="tk-keys">
                <Key accent="b" label="CTRL" />
                <Key accent="o" label="❖" />
                <Key accent="b" label="ALT" />
                <Key size="w6" label="—" />
                <Key accent="b" label="ALT" />
                <Key accent="b" label="FN" />
                <Key accent="b" label="CTRL" />
                <Key accent="b" label="◄" />
                <Key accent="b" label="▼" />
                <Key accent="b" label="►" />
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
