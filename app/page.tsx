"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function Home() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const scrollPointerEvents = useTransform(scrollOpacity, (opacity) =>
    opacity < 0.05 ? "none" : "auto",
  );

  return (
    <main>
      <header>
        <a className="name" href="#top">Wen-Yong Lim</a>
        <nav aria-label="Primary navigation">
          <a href="#notes">Notes</a>
          <a href="#cv">CV</a>
        </nav>
      </header>

      <section className="hero" id="top" ref={heroRef}>
        <h1>Thoughts,<br />occasionally.</h1>
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
            transition={{ duration: 0.75, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
              transition={{
                duration: 1.8,
                delay: 1.9,
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
