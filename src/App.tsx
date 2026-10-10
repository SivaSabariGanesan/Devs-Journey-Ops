import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Github,
  Linkedin,
  Sun,
  Moon,
  Check,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

type Project = {
  number: string
  name: string
  category: string
  description: string
  detail: string
  tag: string
}

const projects: Project[] = [
  {
    number: '01',
    name: 'DEVS Society Portal',
    category: 'COMMUNITY PLATFORM',
    description: 'A digital home for the society, supporting registrations and payments.',
    detail: '60+ successful payments with real-time verification',
    tag: 'COMMUNITY',
  },
  {
    number: '02',
    name: 'SIH Internal Portal',
    category: 'SUBMISSION WORKFLOW',
    description: 'Co-led a team building a structured first-round submission process for the college.',
    detail: 'College-wide submissions & automated review pipeline',
    tag: 'WORKFLOW',
  },
  {
    number: '03',
    name: 'DEVS PMS',
    category: 'INTERNAL TOOLING',
    description: 'A project management system for tracking work, ownership, and team workflows.',
    detail: 'Built custom for DEVS-REC operational cycles',
    tag: 'OPERATIONS',
  },
  {
    number: '04',
    name: 'Radium',
    category: 'EVENT MANAGEMENT',
    description: 'Led development while helping juniors learn through real product work.',
    detail: '200+ registered users & real-time team check-ins',
    tag: 'EVENT TECH',
  },
  {
    number: '05',
    name: 'Film Club OTT',
    category: 'MEDIA PLATFORM',
    description: 'A custom streaming platform engineered specifically for the Film Club. We build for colleges, other clubs, and our community.',
    detail: 'Mentorship-driven architecture & community media delivery',
    tag: 'CLUBS & MEDIA',
  },
  {
    number: '06',
    name: 'REC Kiosk',
    category: 'MOBILE FOOD ORDERING',
    description: 'A campus food ordering platform allowing students and faculty to order canteen food directly through mobile.',
    detail: 'Mobile food ordering, live menu sync & queue management',
    tag: 'CAMPUS & FOOD',
  },
]

const milestones = [
  {
    year: '2024',
    index: '01',
    title: 'The first contribution.',
    body: 'I joined DEVS-REC as a board member. My first task was creating the header and footer for the Investiture website. Then came DevsFest 2024, where I helped with what I knew and contributed to automating certificates for participants.',
    note: 'BOARD MEMBER · LEARNING BY DOING',
  },
  {
    year: 'THE VISION',
    index: '02',
    title: 'More than just code.',
    body: 'Alongside Gokulakrishnan K and Akash MK, I shared a vision for DevsLab: creating room for people from every domain to collaborate on technology. Different backgrounds, different strengths, one shared instinct to build.',
    note: 'DEVSLAB · CROSS-DOMAIN COLLABORATION',
  },
  {
    year: '2025—26',
    index: '03',
    title: 'Taking ownership.',
    body: 'As Operations Head, I led the DEVS-REC technical team. The work expanded from individual contributions to coordinating people, supporting projects, solving problems, and helping turn ideas into reliable systems.',
    note: 'OPERATIONS HEAD · TECH TEAM LEAD',
  },
  {
    year: 'THE PEOPLE',
    index: '04',
    title: 'Learning goes both ways.',
    body: 'Leading Radium and the Film Club OTT platform gave me the chance to teach and guide my juniors while building real products. Sharing what I had learned—and watching others become more confident—became one of the most rewarding parts of the journey.',
    note: 'RADIUM · FILM CLUB OTT · MENTORSHIP',
  },
  {
    year: 'THE NEXT CHAPTER',
    index: '05',
    title: 'Make room for what comes next.',
    body: 'Towards the end of my tenure, I contributed to the DEVS Core Recruitment Portal, helping create a path for the next generation. More than 50 applicants applied to become part of the incoming core team.',
    note: 'CORE RECRUITMENT · 50+ APPLICANTS',
  },
]

function StatCounter({ value, suffix = '', label }: { value: string; suffix?: string; label: string }) {
  return (
    <div className="apple-card keynote-stat-card">
      <div className="metric-value">
        {value}
        {suffix && <span>{suffix}</span>}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  )
}

function TypewriterSigningOff() {
  const fullText = "Signing off — SSG."
  const [displayedText, setDisplayedText] = useState("")
  const [isDone, setIsDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasStartedRef = useRef(false)

  const startTyping = () => {
    setDisplayedText("")
    setIsDone(false)
    let index = 0
    const timer = setInterval(() => {
      index++
      setDisplayedText(fullText.slice(0, index))
      if (index >= fullText.length) {
        clearInterval(timer)
        setIsDone(true)
      }
    }, 75)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true
            startTyping()
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="typewriter-container"
      ref={containerRef}
      onClick={startTyping}
      title="Click to replay typing animation"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') startTyping()
      }}
    >
      <span className="typewriter-text">{displayedText || '\u00A0'}</span>
      <span className={`typewriter-cursor ${isDone ? 'is-blinking' : 'is-solid'}`}>|</span>
    </div>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduced ? null : new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
    let rafId = 0
    if (lenis) {
      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
      lenis.on('scroll', ScrollTrigger.update)
    }

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.from('.hero-topline, .hero-title-line, .hero-copy, .hero-actions, .hero-bottom', {
          y: 35,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.1,
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }
          )
        })
        gsap.utils.toArray<HTMLElement>('.metric-value').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.2, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            }
          )
        })
      }
    }, root)

    return () => {
      ctx.revert()
      if (lenis) lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const navTo = (id: string) => {
    closeMenu()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="site-shell" ref={root}>
      <div className="ambient-spotlight" aria-hidden="true" />

      {/* Apple Frosted Topbar Navigation */}
      <header className="topbar">
        <a href="#top" className="wordmark" onClick={closeMenu} aria-label="Back to top">
          <span className="wordmark-badge">SSG</span>
          <span className="wordmark-divider">/</span>
          <span className="wordmark-sub">DEVS-REC JOURNEY</span>
        </a>

        <div className="nav-actions">
          <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <button onClick={() => navTo('story')}>The Story</button>
            <button onClick={() => navTo('work')}>Selected Work</button>
            <button onClick={() => navTo('impact')}>The Impact</button>
            <button onClick={() => navTo('closing')}>
              Farewell <ArrowUpRight size={12} />
            </button>
          </nav>

          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to Apple Light Mode' : 'Switch to Apple Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="hero section-pad">
          <div className="hero-topline">
            <span className="status-pill">
              <span className="status-dot" /> A PERSONAL ARCHIVE · 2024—2026
            </span>
            <span className="hero-edition">CHAPTER NO. 01</span>
          </div>

          <div className="hero-title" aria-label="Two years. Countless builds. One journey.">
            <div className="hero-title-line hero-title-gradient">
              TWO YEARS<span className="hero-title-period">.</span>
            </div>
            <div className="hero-title-line hero-title-indent">
              COUNTLESS <span className="outline-word">BUILDS.</span>
            </div>
            <div className="hero-title-line hero-title-last">
              ONE <span className="highlight-word">JOURNEY.</span>
            </div>
          </div>

          <div className="hero-lower">
            <p className="hero-copy">
              A story about learning in public, building with people, and discovering that leadership is less about having
              answers—and more about helping others find theirs.
            </p>
            <div className="hero-actions">
              <button className="apple-btn-primary" onClick={() => navTo('story')}>
                Explore Story <ArrowDown size={14} />
              </button>
              <button className="apple-btn-secondary" onClick={() => navTo('work')}>
                Selected Work <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          <div className="hero-bottom">
            <span>SIVA SABARI GANESAN</span>
            <span>OPERATIONS HEAD · DEVS-REC</span>
            <span>CHENNAI, INDIA</span>
          </div>
        </section>

        {/* 01 / The Beginning */}
        <section className="intro section-pad" id="intro">
          <div className="section-label" data-reveal>
            <span>01 / THE BEGINNING</span>
            <span>BOARD MEMBER · 2024</span>
          </div>
          <div className="intro-grid">
            <h2 data-reveal>
              I came here
              <br />
              to <span className="highlight-gradient">learn.</span>
            </h2>
            <div className="intro-text" data-reveal>
              <p>
                When I joined DEVS-REC in 2024 as a board member, I had no idea how much this decision would shape me—as
                a developer, a collaborator, and a person.
              </p>
              <p>
                My first task was simple: creating the header and footer for the DEVS-REC Investiture website. Then came
                DevsFest 2024, where I helped with what I knew and contributed to automating certificates for participants.
              </p>
              <p>Small beginnings. Real people. A lot left to learn.</p>
            </div>
          </div>
          <div className="pull-quote" data-reveal>
            <p>
              “DEVS-REC gave me a platform to learn, collaborate, experiment, and contribute beyond what I already knew.”
            </p>
            <span className="quote-credit">— THE TURNING POINT THAT SHAPED EVERYTHING</span>
          </div>
        </section>

        {/* 02 / The Idea - DevsLab */}
        <section className="manifesto section-pad" id="story">
          <div className="section-label" data-reveal>
            <span>02 / THE IDEA</span>
            <span>DEVSLAB</span>
          </div>
          <div className="manifesto-content" data-reveal>
            <span className="eyebrow">A VISION SHARED WITH GOKULAKRISHNAN K & AKASH MK</span>
            <h2>
              Technology isn't
              <br />
              just for <span className="highlight-gradient">technologists.</span>
            </h2>
            <p className="manifesto-copy">
              We believed people from every domain should have a way to contribute to technology. Design, creativity,
              management, operations—different perspectives make better things when they build together. That belief became
              the vision behind DevsLab.
            </p>
            <div className="manifesto-foot">
              <span>DIFFERENT DOMAINS.</span>
              <span>SHARED OWNERSHIP.</span>
              <span>BETTER THINGS, TOGETHER.</span>
            </div>
          </div>
        </section>

        {/* 03 / The Evolution */}
        <section className="timeline section-pad">
          <div className="section-label" data-reveal>
            <span>03 / THE EVOLUTION</span>
            <span>FROM CONTRIBUTOR TO LEADER</span>
          </div>
          <div className="timeline-heading" data-reveal>
            <h2>
              The work changed.
              <br />
              <span className="highlight-gradient">So did I.</span>
            </h2>
            <p>Every stage brought a different kind of responsibility. None of it happened all at once.</p>
          </div>
          <div className="timeline-list">
            {milestones.map((item) => (
              <article className="apple-card timeline-card" key={item.index} data-reveal>
                <div className="timeline-index">{item.index}</div>
                <div className="timeline-main">
                  <span className="eyebrow">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className="timeline-note">{item.note}</span>
                </div>
                <ArrowDownRight className="timeline-arrow" size={22} />
              </article>
            ))}
          </div>
        </section>

        {/* 04 / Selected Work (Apple Bento Grid) */}
        <section className="work section-pad" id="work">
          <div className="section-label" data-reveal>
            <span>04 / SELECTED WORK</span>
            <span>BUILT WITH THE TEAM</span>
          </div>
          <div className="work-heading" data-reveal>
            <h2>
              Not just screens.
              <br />
              <span className="highlight-gradient">Systems.</span>
            </h2>
            <p>We build for colleges, other clubs, and our community. Platforms engineered for people and real-world scale.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <button
                key={project.number}
                className={`apple-card project-bento-card ${activeProject === project.number ? 'is-active' : ''}`}
                onClick={() => setActiveProject(activeProject === project.number ? null : project.number)}
                aria-expanded={activeProject === project.number}
              >
                <div className="project-card-top">
                  <span>{project.number} / {project.category}</span>
                  <span className="project-tag-pill">{project.tag}</span>
                  <span className="project-action-circle">
                    {activeProject === project.number ? <X size={15} /> : <ArrowUpRight size={15} />}
                  </span>
                </div>

                <div className="project-card-bottom">
                  <span className="eyebrow">{project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {activeProject === project.number && (
                    <div className="project-detail-pill">
                      <span>{project.detail}</span>
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          <p className="work-footnote">
            A curated selection of engineering and leadership initiatives from 2024–2026.
          </p>
        </section>

        {/* 05 / Real-World Impact - Hostel App */}
        <section className="hostel section-pad">
          <div className="hostel-copy" data-reveal>
            <div className="section-label">
              <span>05 / REAL-WORLD IMPACT</span>
              <span>HOSTEL APP</span>
            </div>
            <span className="eyebrow">OPERATIONS HEAD · DEVELOPER</span>
            <h2>
              When the work
              <br />
              reaches <span className="highlight-gradient">real life.</span>
            </h2>
            <p>
              During my Operations Head tenure, I helped manage the Hostel App and contributed as a developer. It made
              the responsibility tangible: this wasn't just an application, but an essential system students depended on daily.
            </p>
            <p>
              Towards the end of my tenure, I returned to hands-on development, contributing to both the Hostel App and
              the Timetable App—a full-circle reminder of where the journey began.
            </p>
          </div>

          <div className="hostel-metrics-panel" data-reveal>
            <div className="apple-card hostel-stat-card">
              <div className="metric-value">
                3,000<span>+</span>
              </div>
              <div className="metric-label">FIRST-YEAR STUDENTS BOOKED HOSTEL ACCOMMODATION</div>
            </div>

            <div className="apple-card hostel-stat-card">
              <div className="metric-value">
                730<span>+</span>
              </div>
              <div className="metric-label">SUCCESSFUL PAYMENTS PROCESSED</div>
            </div>
          </div>
        </section>

        {/* 06 / Titanium 2026 Keynote Stats */}
        <section className="titanium section-pad" id="impact">
          <div className="titanium-head" data-reveal>
            <div className="section-label">
              <span>06 / THE BIG ONE</span>
              <span>TITANIUM 2026</span>
            </div>
            <span className="eyebrow">WEBSITE TEAM LEAD · INAUGURAL EDITION</span>
            <h2>
              Built from scratch.
              <br />
              <span className="highlight-gradient">Engineered to scale.</span>
            </h2>
            <p className="titanium-intro">
              Leading the website team for Titanium 2026 challenged us to build everything from scratch. With tight
              deadlines, a new team, and no blueprint, we adapted rapidly to deliver an unflinching campus-wide platform.
            </p>
          </div>

          <div className="titanium-stats-grid">
            <StatCounter value="400K" suffix="+" label="TOTAL VIEWERS" />
            <StatCounter value="41K" label="UNIQUE VISITORS" />
            <StatCounter value="13,280" label="SIGNUPS & LOGINS" />
            <StatCounter value="4,796" label="EVENT REGISTRATIONS" />
            <StatCounter value="1,941" label="SUCCESSFUL PAYMENTS" />
            <StatCounter value="3,451" label="GATE PASSES SCANNED" />
          </div>

          <div className="apple-card titanium-endnote-card" data-reveal>
            <div className="check-badge">
              <Check size={20} />
            </div>
            <p>
              <strong>3,451 gate-pass scans.</strong> Without a single system error during high-traffic entry.
            </p>
            <span className="status-pill">ZERO CRITICAL FAILURES</span>
          </div>

          <div className="titanium-caption">
            <span>THE PLATFORM SERVED THOUSANDS.</span>
            <span>THE ACHIEVEMENT BELONGS TO THE TEAM.</span>
          </div>
        </section>

        {/* 07 / Ecosystem & Infrastructure */}
        <section className="infrastructure section-pad">
          <div className="section-label" data-reveal>
            <span>07 / BEYOND THE APPLICATION</span>
            <span>THE ECOSYSTEM</span>
          </div>
          <div className="infra-grid">
            <div data-reveal>
              <h2>
                Build the environment,
                <br />
                <span className="highlight-gradient">not just the app.</span>
              </h2>
              <p>
                We wanted DEVS-REC's infrastructure to be organized and aligned with modern professional software engineering
                practices—connecting internal tooling, self-hosted deployment clusters, and communication into a unified developer ecosystem.
              </p>
            </div>

            <div className="tool-stack-panel" data-reveal>
              {[
                { id: '01', name: 'Mattermost', type: 'TEAM COMMUNICATION' },
                { id: '02', name: 'ownCloud', type: 'SECURE FILE COLLABORATION' },
                { id: '03', name: 'DEVS PMS', type: 'PROJECT WORKFLOWS' },
                { id: '04', name: 'Radium', type: 'EVENT MANAGEMENT ENGINE' },
                { id: '05', name: 'Coolify', type: 'SELF-HOSTED DEPLOYMENTS' },
              ].map((tool) => (
                <div className="apple-card tool-row-card" key={tool.id}>
                  <span className="tool-index">{tool.id}</span>
                  <strong className="tool-name">{tool.name}</strong>
                  <span className="tool-badge">{tool.type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 / Next Generation */}
        <section className="nextgen section-pad">
          <div className="apple-card nextgen-metric-box" data-reveal>
            <div className="nextgen-number">
              50<span>+</span>
            </div>
            <div className="metric-label">APPLICANTS FOR THE NEXT INCOMING CORE TEAM</div>
          </div>

          <div className="nextgen-copy" data-reveal>
            <span className="eyebrow">DEVS CORE RECRUITMENT PORTAL</span>
            <h2>
              Make room for
              <br />
              <span className="highlight-gradient">what comes next.</span>
            </h2>
            <p>
              Towards the end of my tenure, I contributed to the DEVS Core Recruitment Portal. More than 50 applicants
              stepped forward to be part of the incoming core team. Building that smooth bridge for the next generation of builders
              was among the most meaningful milestones.
            </p>
          </div>
        </section>

        {/* 09 / Closing & Farewell */}
        <section className="closing section-pad" id="closing">
          <div className="section-label" data-reveal>
            <span>THE LAST PAGE</span>
            <span>2024—2026 TENURE</span>
          </div>

          <div className="closing-title" data-reveal>
            <h2>
              The tenure ends<span className="hero-title-period">.</span>
            </h2>
            <h2 className="closing-second">
              The learning <span className="highlight-gradient">doesn't.</span>
            </h2>
          </div>

          <div className="closing-body" data-reveal>
            <p>
              I joined DEVS-REC with basic web skills and an eagerness to learn. I am closing this chapter having learned
              how to design reliable architectures, lead teams with empathy, and mentor juniors through production launches.
            </p>
            <p>
              To Gokulakrishnan K, Akash MK, my teammates, my juniors, and everyone who was part of this chapter—thank you.
              The projects will evolve, the technologies will modernize, but the shared memories and camaraderie endure.
            </p>
          </div>

          <div className="apple-card signoff-plaque" data-reveal>
            <div className="signoff-plaque-top">
              <div className="signoff-status-badge">
                <span className="signoff-live-dot" />
                <span>TENURE CONCLUDED · MARCH 2026</span>
              </div>
              <span className="signoff-serial">ARCHIVE REF: DEVS-REC-2426</span>
            </div>

            <div className="signoff-plaque-body">
              <div className="signoff-signature-wrapper">
                <div className="signoff-typewriter-headline">
                  <TypewriterSigningOff />
                </div>
                <div className="signature-mark">Siva Sabari Ganesan</div>
                <div className="signoff-role-text">OPERATIONS HEAD · TECHNICAL BOARD LEAD</div>
                <div className="signoff-location">RAJALAKSHMI ENGINEERING COLLEGE · CHENNAI, INDIA</div>
              </div>

              <div className="signoff-quote-box">
                <p>“The code is in production. The systems are in trusted hands. The journey now belongs to the next generation of builders.”</p>
              </div>

              <div className="signoff-tags">
                <span className="signoff-tag">DevsLab Vision</span>
                <span className="signoff-tag">Hostel App & Timetable</span>
                <span className="signoff-tag">Titanium 2026 Lead</span>
                <span className="signoff-tag">Core Recruitment</span>
                <span className="signoff-tag">Alumni Transition</span>
              </div>

              <div className="signoff-actions">
                <a
                  href="https://www.linkedin.com/in/siva-sabari-ganesan-a-b3288a28b/"
                  target="_blank"
                  rel="noreferrer"
                  className="apple-btn-primary"
                >
                  <Linkedin size={15} /> Connect on LinkedIn
                </a>
                <a
                  href="https://github.com/SivaSabariGanesan"
                  target="_blank"
                  rel="noreferrer"
                  className="apple-btn-secondary"
                >
                  <Github size={15} /> GitHub Profile
                </a>
                <button
                  className="apple-btn-secondary signoff-scroll-top"
                  onClick={() => navTo('top')}
                >
                  Back to Beginning <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            <div className="signoff-plaque-bottom">
              <span>BOARD MEMBER (2024) ➔ OPERATIONS HEAD (2025—2026)</span>
              <span className="signoff-stamp">OFFICIALLY SIGNED OFF [✓]</span>
            </div>
          </div>
        </section>
      </main>

      {/* Apple Minimalist Footer */}
      <footer className="footer section-pad">
        <a className="footer-mark" href="#top">
          SSG<span>.</span>
        </a>
        <p>ENGINEERED WITH PASSION, PEOPLE & PROGRESS.</p>
        <div className="footer-links">
          <a
            className="footer-icon-btn"
            href="https://www.linkedin.com/in/siva-sabari-ganesan-a-b3288a28b/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={15} />
          </a>
          <a
            className="footer-icon-btn"
            href="https://github.com/SivaSabariGanesan"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
          >
            <Github size={15} />
          </a>
          <button className="footer-icon-btn" onClick={() => navTo('top')} aria-label="Back to top">
            <ArrowUpRight size={15} />
          </button>
        </div>
        <span className="footer-year">© 2026</span>
      </footer>
    </div>
  )
}

export default App
