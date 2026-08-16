export default function Home() {
  return (
    <main>
      <header>
        <a className="name" href="#top">Wen-Yong Lim</a>
        <nav aria-label="Primary navigation">
          <a href="#notes">Notes</a>
          <a href="#cv">CV</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <h1>Thoughts,<br />occasionally.</h1>
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
              <p>Evyve</p>
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

          <div className="cv-group tools">
            <p className="label">Tools</p>
            <p>Xero · Dext · Simpro · Power BI · Excel · Power Automate</p>
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
