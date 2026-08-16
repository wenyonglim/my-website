export default function Home() {
  return (
    <main>
      <header>
        <a className="name" href="#top">Cheng Lim</a>
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

      <section className="row" id="cv">
        <h2>CV</h2>
        <p>Coming soon.</p>
      </section>

      <footer>
        <span>London</span>
        <a href="https://github.com/wenyonglim">GitHub ↗</a>
      </footer>
    </main>
  );
}
