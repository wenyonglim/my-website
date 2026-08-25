"use client";

import { useRef, useState, type CSSProperties } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const displayName = "Wen-Yong Lim";
const confettiColors = ["#ff5c5c", "#f2c14e", "#3ec1d3", "#7bd389", "#9b6dff", "#ffffff"];

type ConfettiPiece = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  delay: number;
  color: string;
  round: boolean;
};

const playDiscoveryChime = () => {
  const AudioContextClass = window.AudioContext
    ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const start = context.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];

  void context.resume();

  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const noteStart = start + index * 0.055;

    oscillator.type = index === notes.length - 1 ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(frequency, noteStart);
    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.035, noteStart + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.22);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteStart + 0.24);
  });

  window.setTimeout(() => void context.close(), 700);
};

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [nameFlip, setNameFlip] = useState(0);
  const [headlineHovered, setHeadlineHovered] = useState(false);
  const [headlineEyeRevealed, setHeadlineEyeRevealed] = useState(false);
  const [headlineEyeCollected, setHeadlineEyeCollected] = useState(false);
  const [headlineConfetti, setHeadlineConfetti] = useState<ConfettiPiece[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineSpotlightRef = useRef<HTMLSpanElement>(null);
  const headlineEyeRef = useRef<HTMLButtonElement>(null);
  const headlineEyePositionedRef = useRef(false);
  const headlineX = useMotionValue(-200);
  const headlineY = useMotionValue(-200);
  const smoothHeadlineX = useSpring(headlineX, {
    stiffness: reduceMotion ? 1000 : 420,
    damping: reduceMotion ? 100 : 38,
    mass: 0.22,
  });
  const smoothHeadlineY = useSpring(headlineY, {
    stiffness: reduceMotion ? 1000 : 420,
    damping: reduceMotion ? 100 : 38,
    mass: 0.22,
  });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const scrollPointerEvents = useTransform(scrollOpacity, (opacity) =>
    opacity < 0.05 ? "none" : "auto",
  );

  const positionHeadlineEye = (headline: HTMLDivElement) => {
    if (headlineEyePositionedRef.current) return;

    headline.style.setProperty("--eye-x", `${18 + Math.random() * 64}%`);
    headline.style.setProperty("--eye-y", `${20 + Math.random() * 54}%`);
    headlineEyePositionedRef.current = true;
  };

  const moveHeadlineSpotlight = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    headlineX.set(event.clientX - bounds.left);
    headlineY.set(event.clientY - bounds.top);

    if (headlineEyeCollected) {
      setHeadlineEyeRevealed(false);
      return;
    }

    const spotlightBounds = headlineSpotlightRef.current?.getBoundingClientRect();
    const eyeBounds = headlineEyeRef.current?.getBoundingClientRect();

    if (spotlightBounds && eyeBounds) {
      const eyeX = eyeBounds.left + eyeBounds.width / 2;
      const eyeY = eyeBounds.top + eyeBounds.height / 2;
      const revealRadius = Math.max(
        24,
        spotlightBounds.width / 2 - eyeBounds.width / 2 - 6,
      );
      const distance = Math.hypot(event.clientX - eyeX, event.clientY - eyeY);

      setHeadlineEyeRevealed(distance <= revealRadius);
    }
  };

  const focusHeadlineEye = () => {
    if (headlineEyeCollected || !headlineRef.current) return;

    positionHeadlineEye(headlineRef.current);

    const headlineBounds = headlineRef.current.getBoundingClientRect();
    const eyeBounds = headlineEyeRef.current?.getBoundingClientRect();

    if (!eyeBounds) return;

    headlineX.set(eyeBounds.left + eyeBounds.width / 2 - headlineBounds.left);
    headlineY.set(eyeBounds.top + eyeBounds.height / 2 - headlineBounds.top);
    setHeadlineHovered(true);
    setHeadlineEyeRevealed(true);
  };

  const collectHeadlineEye = () => {
    if (headlineEyeCollected) return;

    const pieces = reduceMotion
      ? []
      : Array.from({ length: 30 }, (_, index) => {
          const angle = (Math.PI * 2 * index) / 30 + (Math.random() - 0.5) * 0.35;
          const distance = 80 + Math.random() * 150;

          return {
            id: index,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotate: (Math.random() - 0.5) * 720,
            delay: Math.random() * 0.08,
            color: confettiColors[index % confettiColors.length],
            round: index % 4 === 0,
          };
        });

    setHeadlineEyeCollected(true);
    setHeadlineEyeRevealed(false);
    setHeadlineConfetti(pieces);
    playDiscoveryChime();
    window.setTimeout(() => setHeadlineConfetti([]), 1400);
  };

  return (
    <main>
      <header>
        <a
          className="name"
          href="#top"
          aria-label={displayName}
          onClick={() => setNameFlip((flip) => flip + 1)}
        >
          <span className="name-mark" aria-hidden="true" />
          {displayName.split("").map((character, index) => (
            <motion.span
              className="name-letter"
              aria-hidden="true"
              key={`${nameFlip}-${index}`}
              initial={nameFlip === 0 || reduceMotion ? false : {
                opacity: 1,
                rotateX: 0,
                y: 0,
              }}
              animate={nameFlip === 0 || reduceMotion ? undefined : {
                opacity: [1, 0.25, 1],
                rotateX: [0, -180, -360],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 0.58,
                delay: index * 0.045,
                ease: [0.45, 0, 0.2, 1],
              }}
            >
              {character === " " ? "\u00a0" : character}
            </motion.span>
          ))}
        </a>
        <nav aria-label="Primary navigation">
          <a href="#notes">Notes</a>
          <a href="#cv">CV</a>
        </nav>
      </header>

      <section className="hero" id="top" ref={heroRef}>
        <div
          ref={headlineRef}
          className="headline"
          onPointerEnter={(event) => {
            if (event.pointerType === "touch") return;
            positionHeadlineEye(event.currentTarget);
            moveHeadlineSpotlight(event);
            setHeadlineHovered(true);
          }}
          onPointerMove={moveHeadlineSpotlight}
          onPointerLeave={() => {
            setHeadlineHovered(false);
            setHeadlineEyeRevealed(false);
          }}
        >
          <motion.span
            ref={headlineSpotlightRef}
            className="headline-spotlight"
            aria-hidden="true"
            initial={false}
            animate={{
              opacity: headlineHovered ? 1 : 0,
              scale: reduceMotion ? 1 : headlineHovered ? 1 : 0.72,
            }}
            style={{ x: smoothHeadlineX, y: smoothHeadlineY }}
            transition={{
              opacity: { duration: 0.16 },
              scale: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
            }}
          />
          <motion.button
            ref={headlineEyeRef}
            className={`headline-doodle${headlineEyeRevealed ? " is-revealed" : ""}`}
            type="button"
            aria-label="Collect the hidden eye"
            disabled={headlineEyeCollected}
            initial={false}
            animate={{
              opacity: headlineEyeRevealed && !headlineEyeCollected ? 1 : 0,
              scale: reduceMotion ? 1 : headlineEyeRevealed && !headlineEyeCollected ? 1 : 0.86,
            }}
            transition={{
              opacity: { duration: 0.12 },
              scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
            }}
            onFocus={focusHeadlineEye}
            onBlur={() => {
              setHeadlineHovered(false);
              setHeadlineEyeRevealed(false);
            }}
            onClick={collectHeadlineEye}
          >
            <motion.span
              className="headline-eye"
              animate={
                headlineEyeRevealed && !reduceMotion
                  ? { scaleY: [1, 0.08, 1] }
                  : { scaleY: 1 }
              }
              transition={{
                duration: 0.36,
                delay: headlineEyeRevealed ? 0.18 : 0,
                ease: "easeInOut",
              }}
            >
              <span className="headline-eye-pupil" />
            </motion.span>
          </motion.button>
          {headlineConfetti.length > 0 && (
            <span className="headline-confetti" aria-hidden="true">
              {headlineConfetti.map((piece) => (
                <motion.span
                  className="headline-confetti-piece"
                  key={piece.id}
                  initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.45 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: piece.x,
                    y: [0, piece.y, piece.y + 72],
                    rotate: piece.rotate,
                    scale: [0.45, 1, 0.9, 0.65],
                  }}
                  style={{
                    backgroundColor: piece.color,
                    borderRadius: piece.round ? "999px" : "1px",
                  }}
                  transition={{
                    duration: 1.05,
                    delay: piece.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </span>
          )}
          <h1 aria-label="Thoughts, occasionally.">
            <span className="headline-line" aria-hidden="true">
              <motion.span
                initial={reduceMotion ? false : {
                  opacity: 0,
                  y: "110%",
                  rotate: 1.5,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: "0%",
                  rotate: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: reduceMotion ? 0 : 1.88,
                  delay: reduceMotion ? 0 : 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Thoughts,
              </motion.span>
            </span>
            <span className="headline-line" aria-hidden="true">
              <motion.span
                initial={reduceMotion ? false : {
                  opacity: 0,
                  y: "115%",
                  rotate: -1.5,
                  filter: "blur(12px)",
                }}
                animate={{
                  opacity: 1,
                  y: "0%",
                  rotate: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: reduceMotion ? 0 : 1.98,
                  delay: reduceMotion ? 0 : 0.23,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                occasionally.
              </motion.span>
            </span>
          </h1>
        </div>
        <motion.a
          className="scroll-cue"
          href="#notes"
          aria-label="Continue to Notes and CV"
          style={{
            "--scroll-cue-opacity": scrollOpacity,
            pointerEvents: scrollPointerEvents,
          } as CSSProperties}
        >
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: 4 }}
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            transition={{ duration: 0.75, delay: 2.17, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
              transition={{
                duration: 1.8,
                delay: 3.17,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
            >
              ↓
            </motion.span>
          </motion.span>
        </motion.a>
      </section>

      <section className="row" id="notes">
        <h2>Notes</h2>
        <p>Nothing here yet.</p>
      </section>

      <section className="cv" id="cv">
        <h2>CV</h2>

        <div className="cv-content">
          <div className="cv-group">
            <p className="label">Experience</p>
            <article>
              <p>Finance Analyst</p>
              <p>evyve</p>
              <time>2025—Now</time>
            </article>
            <article>
              <p>Finance Clerk</p>
              <p>RAAM Construction</p>
              <time>2023—25</time>
            </article>
            <article>
              <p>Photographer / Filmmaker</p>
              <p>Limelight Visuals</p>
              <time>2021—24</time>
            </article>
          </div>

          <div className="cv-group">
            <p className="label">Education</p>
            <article>
              <p>Accounting &amp; Finance, First Class</p>
              <p>University of East Anglia</p>
              <time>2018—21</time>
            </article>
            <article>
              <p>ACCA</p>
              <p>Part-qualified</p>
              <time>Current</time>
            </article>
          </div>

        </div>
      </section>

      <footer>
        <span>London</span>
        <a href="https://github.com/wenyonglim">GitHub ↗</a>
      </footer>
    </main>
  );
}
