const focusAreas = [
  'Python',
  'JavaScript',
  'Automation',
  'Full-stack fundamentals',
  'AI-assisted workflows',
  'Clear documentation',
];

const proofCards = [
  {
    eyebrow: 'Business systems',
    title: '100+ drafting projects shipped',
    body: 'Owned residential drafting work from client conversations through finished plan sets, building judgment around precision, constraints, and real-world handoffs.',
  },
  {
    eyebrow: 'Practical tools',
    title: 'Python and Excel automation',
    body: 'Built internal tools for beam calculations, energy-code calculations, and cost-to-build estimates to reduce friction in construction planning work.',
  },
  {
    eyebrow: 'Public work',
    title: 'Static business site',
    body: 'Built and documented a lightweight site for Engelwood Homes, keeping the implementation simple and tied to a real business need.',
  },
];

const projects = [
  {
    name: 'Engelwood Site',
    status: 'Public',
    description:
      'A static business landing page built with HTML, CSS, organized assets, and Wrangler deployment configuration.',
    href: 'https://github.com/dana-engels/engelwood-site',
  },
  {
    name: 'Career Visibility Engine',
    status: 'In progress',
    description:
      'A local-first tool for turning LinkedIn growth into a guided sequence: profile, proof, network, content, and consistent action.',
    href: 'https://github.com/dana-engels',
  },
  {
    name: 'Practical Automation Notes',
    status: 'Coming next',
    description:
      'Short writeups on the Python and spreadsheet tools that grew out of drafting, estimating, and construction operations.',
    href: 'https://www.linkedin.com/in/dana-engels/',
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-overlay" />

        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#proof">Proof</a>
          <a href="#connect">Connect</a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">WGU Computer Science Student</p>
          <h1>Dana Engels</h1>
          <p className="hero-copy">
            Career changer building practical software tools with Python,
            JavaScript, automation, and AI-assisted workflows.
          </p>
          <div className="hero-actions" id="connect">
            <a className="primary-link" href="https://github.com/dana-engels">
              View GitHub
            </a>
            <a
              className="secondary-link"
              href="https://www.linkedin.com/in/dana-engels/"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="intro-band">
        <div>
          <p className="eyebrow">Direction</p>
          <h2>Building visible proof while learning software engineering.</h2>
        </div>
        <p>
          My path into software started with practical problems: drafting
          workflows, construction operations, business systems, and tools that
          made real work faster and clearer. I am focused on turning that
          background into shipped software, thoughtful documentation, and steady
          public progress.
        </p>
      </section>

      <section className="content-section" id="proof">
        <div className="section-heading">
          <p className="eyebrow">Proof to date</p>
          <h2>Real work first, then stronger software signals.</h2>
        </div>
        <div className="proof-grid">
          {proofCards.map((card) => (
            <article className="proof-card" key={card.title}>
              <p>{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <span>{card.body}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="focus-section">
        <div className="section-heading">
          <p className="eyebrow">Current focus</p>
          <h2>Small, practical builds with public learning attached.</h2>
        </div>
        <div className="focus-list">
          {focusAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className="content-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Work</p>
          <h2>Current public projects and near-term proof.</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <a className="project-row" href={project.href} key={project.name}>
              <span>
                <strong>{project.name}</strong>
                <small>{project.description}</small>
              </span>
              <em>{project.status}</em>
            </a>
          ))}
        </div>
      </section>

      <section className="story-band">
        <div className="portrait" aria-hidden="true" />
        <div>
          <p className="eyebrow">Background</p>
          <h2>I like finding friction, understanding the system behind it, and building something cleaner.</h2>
          <p>
            Before moving deeper into computer science, I spent years building
            systems in construction and ministry: workflows, onboarding,
            volunteer teams, livestream and audio setups, documentation, and
            operating rhythms that helped people work better at scale.
          </p>
        </div>
      </section>
    </main>
  );
}
