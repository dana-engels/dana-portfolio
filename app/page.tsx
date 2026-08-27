'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Mode = 'day' | 'night' | 'ridiculous';
type ProjectKey = 'whatcom' | 'product-os';

const modeNotes: Record<Mode, string> = {
  day: 'Balanced and bright. The recruiter-friendly default.',
  night: 'Focused contrast for a builder-at-work feel.',
  ridiculous: 'Maximum color, animated edges, cursor trails, and entirely reasonable excess.',
};

const projects = {
  whatcom: {
    label: 'Business website / Live',
    title: 'Whatcom House Plans',
    summary:
      'The public website for the residential drafting company I own. It explains our services and process, presents selected work and client reviews, and creates a clear path from interest to estimate request.',
    value:
      'A real business surface shaped around clarity and trust. I directed the content, structure, and build to help prospective clients understand the work before starting a conversation.',
    stack: ['Site direction', 'Content structure', 'Responsive UX', 'Lead intake'],
    href: 'https://whatcomhp.com/',
    action: 'Open live site',
  },
  'product-os': {
    label: 'Interactive portfolio / Current build',
    title: 'Dana Product OS',
    summary:
      'This app-like personal workspace turns a conventional portfolio into an interactive review experience with three interface modes, a command menu, and responsive recruiter-friendly navigation.',
    value:
      'A transparent snapshot of how I am learning to shape software around a user. The interface is intentionally polished, while the claims inside it stay grounded in work I can support today.',
    stack: ['React', 'Next.js', 'Interaction design', 'Accessibility'],
    href: 'https://github.com/dana-engels/dana-portfolio',
    action: 'View source',
  },
} satisfies Record<ProjectKey, {
  label: string;
  title: string;
  summary: string;
  value: string;
  stack: string[];
  href: string;
  action: string;
}>;

const professionalStack = [
  {
    number: '01',
    title: 'Precision',
    body: 'More than 100 residential drafting projects trained me to respect constraints, revisions, and details that affect the finished result.',
  },
  {
    number: '02',
    title: 'Ownership',
    body: 'Running a small business means taking work from an unclear request through scope, communication, delivery, and follow-through.',
  },
  {
    number: '03',
    title: 'Communication',
    body: 'Years in ministry and client work taught me to explain complex ideas clearly and keep people oriented when the path is messy.',
  },
  {
    number: '04',
    title: 'Systems thinking',
    body: 'Across construction, operations, and leadership, I keep looking for the structure underneath a problem and the next useful improvement.',
  },
];

function burst(x: number, y: number, ridiculous: boolean) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const colors = ridiculous
    ? ['#00d5ff', '#ff4dff', '#00ff85', '#ffffff', '#a3ff12']
    : ['#2563eb', '#0d8f86', '#c43c8f'];
  const count = ridiculous ? 24 : 8;

  for (let index = 0; index < count; index += 1) {
    const spark = document.createElement('span');
    const angle = (Math.PI * 2 * index) / count;
    const distance = (ridiculous ? 64 : 28) + Math.random() * 30;
    spark.className = 'spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--spark-color', colors[index % colors.length]);
    spark.style.setProperty('--spark-x', `${Math.cos(angle) * distance}px`);
    spark.style.setProperty('--spark-y', `${Math.sin(angle) * distance}px`);
    document.body.appendChild(spark);
    window.setTimeout(() => spark.remove(), 900);
  }
}

export default function Home() {
  const [mode, setMode] = useState<Mode>('day');
  const [projectKey, setProjectKey] = useState<ProjectKey>('whatcom');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [toast, setToast] = useState('');
  const project = projects[projectKey];

  useEffect(() => {
    document.body.dataset.mode = mode;
  }, [mode]);

  useEffect(() => {
    let lastTrail = 0;

    const handlePointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);

      if (document.body.dataset.mode !== 'ridiculous') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (performance.now() - lastTrail < 42) return;

      lastTrail = performance.now();
      const trail = document.createElement('span');
      trail.className = 'cursor-trail';
      trail.style.left = `${event.clientX}px`;
      trail.style.top = `${event.clientY}px`;
      document.body.appendChild(trail);
      window.setTimeout(() => trail.remove(), 620);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === 'Escape') setPaletteOpen(false);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2300);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const chooseMode = (nextMode: Mode, x: number, y: number) => {
    setMode(nextMode);
    setToast(`${nextMode[0].toUpperCase()}${nextMode.slice(1)} mode enabled`);
    burst(x, y, nextMode === 'ridiculous');
  };

  const chooseProject = (key: ProjectKey, x: number, y: number) => {
    setProjectKey(key);
    setToast(`${projects[key].title} module loaded`);
    burst(x, y, mode === 'ridiculous');
  };

  const runReview = (x: number, y: number) => {
    burst(x, y, mode === 'ridiculous');
    setLaunching(true);
    window.setTimeout(() => {
      setLaunching(false);
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
      setToast('Project workspace ready');
    }, 1200);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="wrap nav" aria-label="Main navigation">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">DE</span>
            <span>Dana Engels</span>
          </a>
          <label className="mobile-mode-select">
            <span>Mode</span>
            <select
              aria-label="Interface mode"
              value={mode}
              onChange={(event) => {
                const nextMode = event.target.value as Mode;
                setMode(nextMode);
                setToast(`${nextMode[0].toUpperCase()}${nextMode.slice(1)} mode enabled`);
              }}
            >
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="ridiculous">Ridiculous</option>
            </select>
          </label>
          <div className="nav-links">
            <a href="#projects">Work</a>
            <a href="#experience">Experience</a>
            <a href="#learning">Learning</a>
            <button className="command-button" type="button" onClick={() => setPaletteOpen(true)}>
              Command <kbd>K</kbd>
            </button>
            <a className="primary-link" href="#contact">Connect</a>
          </div>
        </nav>
      </header>

      <main className="wrap shell" id="main">
        <aside className="sidebar" aria-label="Profile and interface controls">
          <section className="profile-card panel magnetic">
            <Image src="/dana-engels-profile.jpg" alt="Dana Engels" width={68} height={68} priority />
            <h1>Dana Engels</h1>
            <p>WGU Computer Science Student</p>
            <div className="status"><span aria-hidden="true" /> Building toward software + AI</div>
          </section>

          <section className="quick-card panel" aria-label="Quick links">
            <a href="https://github.com/dana-engels"><span>GitHub</span><span>Code &#8599;</span></a>
            <a href="https://www.linkedin.com/in/dana-engels/"><span>LinkedIn</span><span>Connect &#8599;</span></a>
            <a href="https://whatcomhp.com/"><span>Whatcom HP</span><span>Live &#8599;</span></a>
            <button type="button" onClick={() => setPaletteOpen(true)}><span>Command menu</span><span>&#8984; K</span></button>
          </section>

          <section className="mode-card panel magnetic">
            <h2>Interface mode</h2>
            <div className="mode-buttons" aria-label="Interface mode">
              {(['day', 'night', 'ridiculous'] as Mode[]).map((item) => (
                <button
                  className={mode === item ? 'active' : ''}
                  type="button"
                  aria-pressed={mode === item}
                  key={item}
                  onClick={(event) => chooseMode(item, event.clientX, event.clientY)}
                >
                  {item[0].toUpperCase()}{item.slice(1)}
                </button>
              ))}
            </div>
            <p className="mode-note">{modeNotes[mode]}</p>
          </section>

          <section className="identity-card panel magnetic">
            <h2>Working style</h2>
            <p>Warm communicator, practical builder, curious learner, calm inside ambiguity.</p>
          </section>
        </aside>

        <div className="workspace">
          <section className="window hero-window" id="top">
            <div className="window-bar">
              <div className="traffic" aria-hidden="true"><span /><span /><span /></div>
              <span>portfolio.workspace / product-os</span>
            </div>
            <div className="hero-body">
              <div className="hero-copy">
                <p className="eyebrow">Student / Career Changer / Systems Thinker</p>
                <h2>Learning to build useful software, clearly.</h2>
                <p>
                  I am a WGU Computer Science student bringing practical experience
                  from drafting, business ownership, construction, and ministry into
                  a new technical chapter.
                </p>
                <div className="hero-status" aria-label="Working style">
                  <span>Honest about the curve</span>
                  <span>Serious about the work</span>
                  <span>Easy to work with</span>
                </div>
                <div className="hero-actions">
                  <button className="button" type="button" onClick={(event) => runReview(event.clientX, event.clientY)}>Launch review</button>
                  <a className="button secondary" href="#experience">Working style</a>
                </div>
              </div>

              <div className="workspace-preview" aria-label="Animated product workspace preview">
                <div className="preview-toolbar"><span>career.workspace</span><span>online</span></div>
                <div className="preview-launch">
                  <strong>Current sequence</strong>
                  <p><span>01</span> Build CS foundation <b>active</b></p>
                  <p><span>02</span> Capture real proof <b>ready</b></p>
                  <p><span>03</span> Grow public work <b>next</b></p>
                </div>
                <div className="preview-grid">
                  <article>
                    <strong>Proof queue</strong>
                    <span className="preview-line wide" />
                    <span className="preview-line medium" />
                    <span className="preview-line short" />
                  </article>
                  <article className="preview-score">
                    <strong>Direction</strong>
                    <div>SE<span>+ AI</span></div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className="metric-row" aria-label="Current proof">
            <article className="metric-card panel magnetic"><strong>WGU</strong><span>Computer Science student</span></article>
            <article className="metric-card panel magnetic"><strong>100+</strong><span>Residential drafting projects</span></article>
            <article className="metric-card panel magnetic"><strong>1</strong><span>Business owned and operated</span></article>
            <article className="metric-card panel magnetic"><strong>4</strong><span>Interface modes, because one was not enough</span></article>
          </section>

          <section className="personal-grid" aria-label="Professional direction">
            <article className="principle-card featured magnetic">
              <small>What I want teams to feel</small>
              <h3>Capable without pretending to be finished.</h3>
              <p>I bring professional maturity, ownership, and communication to the room while I build the technical depth to match.</p>
            </article>
            <div className="principle-list">
              <article className="principle-card panel magnetic">
                <small>Product instinct</small>
                <h3>Make the next action clear.</h3>
                <p>Useful systems reduce friction instead of adding ceremony.</p>
              </article>
              <article className="principle-card panel magnetic">
                <small>Learning instinct</small>
                <h3>Proof over broad claims.</h3>
                <p>Show the work, explain the decision, improve the next version.</p>
              </article>
            </div>
          </section>

          <section id="projects">
            <div className="section-head">
              <div><span>01</span><h3>Project workspace</h3></div>
              <p>Only work I can support today. This area will grow as school and real projects give it something worth showing.</p>
            </div>
            <div className="project-os">
              <div className="project-list" role="tablist" aria-label="Selected projects">
                {(Object.keys(projects) as ProjectKey[]).map((key) => (
                  <button
                    className={`project-tab ${projectKey === key ? 'active' : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={projectKey === key}
                    key={key}
                    onClick={(event) => chooseProject(key, event.clientX, event.clientY)}
                  >
                    <small>{projects[key].label}</small>
                    <strong>{projects[key].title}</strong>
                    <span>{key === 'whatcom' ? 'Real business, public website' : 'This interactive portfolio'}</span>
                  </button>
                ))}
              </div>
              <article className="project-detail panel" aria-live="polite">
                <div className="detail-visual">
                  <p>{project.label}</p>
                  <h4>{project.title}</h4>
                  <span>Selected build / 2026</span>
                </div>
                <div className="detail-body">
                  <div>
                    <h5>What it is</h5>
                    <p>{project.summary}</p>
                    <h5>Why it matters</h5>
                    <p>{project.value}</p>
                  </div>
                  <div className="project-meta">
                    <h5>Focus</h5>
                    <div className="chips">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                    <a className="module-link" href={project.href}>{project.action} <span aria-hidden="true">&#8599;</span></a>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section id="experience">
            <div className="section-head">
              <div><span>02</span><h3>Professional stack</h3></div>
              <p>A new technical direction, built on years of work that still counts.</p>
            </div>
            <div className="timeline">
              {professionalStack.map((item) => (
                <article className="timeline-card panel magnetic" key={item.number}>
                  <b>{item.number}</b><h4>{item.title}</h4><p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="learning">
            <div className="section-head">
              <div><span>03</span><h3>Learning pipeline</h3></div>
              <p>The active system: school first, small builds second, public proof when it earns its place.</p>
            </div>
            <div className="learning-grid">
              <article className="learning-card panel magnetic">
                <small>Current focus</small><h3>Computer Science Foundation</h3>
                <p>Structured coursework through WGU, with attention to concepts I can explain instead of merely complete.</p>
                <ul><li>Core CS concepts</li><li>Python and JavaScript</li><li>Technical problem-solving</li></ul>
              </article>
              <article className="learning-card panel magnetic">
                <small>Build rule</small><h3>Small, Honest, Finished</h3>
                <p>I am not forcing a fake portfolio backlog. New work appears here when it solves something and can be discussed clearly.</p>
                <ul><li>Start from a real need</li><li>Finish a useful scope</li><li>Document the decisions</li></ul>
              </article>
              <article className="learning-card panel magnetic">
                <small>Direction</small><h3>Software + AI Engineering</h3>
                <p>The long-term direction is clear. The near-term job is to build the fundamentals that make that direction credible.</p>
                <ul><li>Software craftsmanship</li><li>Backend and systems</li><li>Applied AI over time</li></ul>
              </article>
            </div>
          </section>

          <section className="contact-panel panel" id="contact">
            <div>
              <span>04 / Connect</span>
              <h3>Say hello. I am building in public.</h3>
              <p>I am especially glad to meet WGU students and alumni, software engineers, mentors, and people who value practical learning and thoughtful work.</p>
            </div>
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/dana-engels/"><span>LinkedIn</span><span>Connect &#8599;</span></a>
              <a href="https://github.com/dana-engels"><span>GitHub</span><span>View code &#8599;</span></a>
              <a href="https://whatcomhp.com/"><span>Whatcom House Plans</span><span>Visit &#8599;</span></a>
            </div>
          </section>

          <footer><span>Dana Engels / Bellingham, Washington</span><span>Product OS / 2026</span></footer>
        </div>
      </main>

      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>

      <div className={`launch-overlay ${launching ? 'running' : ''}`} aria-hidden={!launching}>
        <div className="launch-box"><span>Portfolio review sequence</span><h2>Loading the good stuff.</h2><div><i /></div></div>
      </div>

      <div className={`palette ${paletteOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={(event) => { if (event.target === event.currentTarget) setPaletteOpen(false); }}>
        <div className="palette-panel">
          <div className="palette-head"><span>Dana OS command menu</span><button type="button" onClick={() => setPaletteOpen(false)}>Close</button></div>
          <div className="palette-actions">
            <a href="#projects" onClick={() => setPaletteOpen(false)}><span>Review selected work</span><span>Projects</span></a>
            <a href="#experience" onClick={() => setPaletteOpen(false)}><span>See transferable experience</span><span>Experience</span></a>
            <a href="#learning" onClick={() => setPaletteOpen(false)}><span>Open learning pipeline</span><span>Learning</span></a>
            <a href="#contact" onClick={() => setPaletteOpen(false)}><span>Jump to contact</span><span>Connect</span></a>
            <button type="button" onClick={() => { setMode('ridiculous'); setPaletteOpen(false); setToast('Ridiculous mode enabled'); }}><span>Make it ridiculous</span><span>Ridiculous</span></button>
          </div>
        </div>
      </div>
    </>
  );
}
