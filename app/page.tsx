import Link from 'next/link';

export default function Home() {
  return (
    <section className="home">
      <h2>David Winer</h2>
      {/* <h1>Building AI products, writing occasionally, and living in San Francisco.</h1> */}
      <div className="intro">
        <p>
          I&apos;m the cofounder and CTO of <a href="https://www.ciro.io">Ciro</a> (YC S22), an AI agent for B2B sales teams. Before that, I worked on the Kotlin programming language at Google and studied CS at Berkeley and business at Stanford.
        </p>
        <p>
          This site is a small archive of projects, essays, notes on startups, machine learning,
          vegetarian food, books, and the odd internet rabbit hole.
        </p>
      </div>

      <div className="projects">
        <section>
          <h3>Work</h3>
          <ul>
            <li>
              <a href="https://www.ciro.io">Ciro</a>
              <span>AI agent for B2B sales</span>
            </li>
          </ul>
        </section>

        <section>
          <h3>Side projects</h3>
          <ul>
            <li>
              <a href="https://www.zeitgeisthq.com/">Zeitgeist</a>
              <span>Turn any trend into a stock portfolio</span>
            </li>
            <li>
              <Link href="/blog/">Blog</Link>
              <span>Essays, notes, and old projects</span>
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
