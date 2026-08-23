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

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [nameFlip, setNameFlip] = useState(0);
  const [headlineHovered, setHeadlineHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
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

  const moveHeadlineSpotlight = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    headlineX.set(event.clientX - bounds.left);
    headlineY.set(event.clientY - bounds.top);
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
          className="headline"
          onPointerEnter={(event) => {
            if (event.pointerType === "touch") return;
            moveHeadlineSpotlight(event);
            setHeadlineHovered(true);
          }}
          onPointerMove={moveHeadlineSpotlight}
          onPointerLeave={() => setHeadlineHovered(false)}
        >
          <motion.span
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
          <motion.span
            className="headline-doodle"
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
          >
            <motion.span
              className="headline-eye"
              animate={
                headlineHovered && !reduceMotion
                  ? { scaleY: [1, 0.08, 1] }
                  : { scaleY: 1 }
              }
              transition={{
                duration: 0.36,
                delay: headlineHovered ? 0.28 : 0,
                ease: "easeInOut",
              }}
            >
              <span className="headline-eye-pupil" />
            </motion.span>
          </motion.span>
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
