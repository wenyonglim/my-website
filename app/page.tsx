const notes = [
  {
    date: "Soon",
    title: "The first note",
    description:
      "This is where essays, observations, working theories and useful fragments will live.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Cheng Lim, home">
          CL
        </a>
        <nav aria-label="Primary navigation">
          <a href="#writing">Writing</a>
          <a href="#cv">CV</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">Cheng Lim / London</p>
        <h1>A place for thoughts<br />worth keeping.</h1>
        <p className="intro">
          Notes on work, technology, finance, design, and the interesting bits
          that refuse to fit neatly between them.
        </p>
      </section>

      <section className="section" id="writing">
        <div className="section-heading">
          <p className="index">01</p>
          <h2>Writing</h2>
        </div>
        <div className="notes-list">
          {notes.map((note) => (
            <article className="note" key={note.title}>
              <p className="note-date">{note.date}</p>
              <div>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section cv-section" id="cv">
        <div className="section-heading">
          <p className="index">02</p>
          <h2>Curriculum vitae</h2>
        </div>
        <div className="cv-copy">
          <p>
            A concise account of the work, projects and experience behind the
            thinking. Full CV coming shortly.
          </p>
          <p className="status">CV coming shortly</p>
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Cheng Lim</p>
        <a href="https://github.com/wenyonglim">GitHub ↗</a>
      </footer>
    </main>
  );
}
