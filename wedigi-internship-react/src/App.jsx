import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowDown, ArrowUpRight, ArrowRight, Code2, Layers3, Server, Box,
  BookOpen, UsersRound, GraduationCap, BriefcaseBusiness, Laptop,
  CheckCircle2, Heart, Menu, X, MoveUpRight, Sparkles, Workflow,
  MessageCircle, Rocket, Coffee, Terminal, Globe2
} from 'lucide-react';

const ORANGE = '#ff641f';
const projectLinks = {
  companyWebsite: '',
  webApplication: '',
  landingPage: '',
};

const projects = [
  {
    number: '01', title: 'Company Website Revamp', type: 'FRONTEND / FULL STACK',
    description: 'Contributed to revamping the company’s official website with a refreshed visual direction and improved user experience.',
    tags: ['Website', 'UI/UX', 'Development'], icon: Globe2, link: projectLinks.companyWebsite,
    visual: 'website',
  },
  {
    number: '02', title: 'Web Application Backend', type: 'BACKEND DEVELOPMENT',
    description: 'Worked on backend development for a web application, focusing on core functionality and reliable application workflows.',
    tags: ['Backend', 'APIs', 'Logic'], icon: Server, link: projectLinks.webApplication,
    visual: 'dashboard',
  },
  {
    number: '03', title: 'Landing Page Development', type: 'WEB DESIGN / DEVELOPMENT',
    description: 'Designed and developed a landing page with a clean, modern layout and a focus on presenting information clearly.',
    tags: ['Landing Page', 'Responsive', 'UI'], icon: Layers3, link: projectLinks.landingPage,
    visual: 'landing',
  },
];

const learnings = [
  { icon: Server, title: 'Reverse Proxy', description: 'Explored reverse proxy setups and learned how they help route requests between clients and services.' },
  { icon: Box, title: 'Coolify', description: 'Learned how Coolify supports application deployment and service management.' },
  { icon: UsersRound, title: 'Knowledge Transfer', description: 'Conducted a KT session to share what I had learned with others on the team.' },
  { icon: Workflow, title: 'The Full Lifecycle', description: 'Saw how a project moves from planning and discussions through development and deployment.' },
];

const responsibilities = [
  { icon: GraduationCap, title: 'College', label: 'ACADEMICS', description: 'Balancing classes, assignments, exams, and continuous academic growth.' },
  { icon: Globe2, title: 'Web Initiatives', label: 'SIDE PROJECTS', description: 'Building and maintaining web platforms alongside other commitments.' },
  { icon: Laptop, title: 'Internship', label: 'WEDIGI STUDIO', description: 'Working hands-on with the team, contributing to real client and internal products.' },
  { icon: BriefcaseBusiness, title: 'Freelancing', label: 'CLIENT WORK', description: 'Delivering end-to-end client projects with accountability and tight timelines.' },
];

const people = [
  { name: 'Swayam', role: 'THE CALL THAT STARTED IT', text: 'For that unexpected call that opened the door to an unforgettable chapter.' },
  { name: 'Harish PS', role: 'CTO · WEDIGI STUDIO', text: 'For the trust, thoughtful guidance, and freedom to learn through real challenges.' },
  { name: 'Suriya M', role: 'A PART OF THE JOURNEY', text: 'For the constant encouragement, insightful discussions, and camaraderie.' },
  { name: 'Sanjana', role: 'A PART OF THE JOURNEY', text: 'For making the work atmosphere welcoming, energetic, and memorable.' },
  { name: 'Ram', role: 'A PART OF THE JOURNEY', text: 'For the grounding support, shared perspectives, and valuable advice along the way.' },
  { name: 'Dhaanya', role: 'A PART OF THE JOURNEY', text: 'For the positive energy, engaging conversations, and support throughout.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} transition={{ delay }}>{children}</motion.div>;
}

function SectionHeading({ number, eyebrow, title, description }) {
  return <Reveal className="section-heading">
    <div className="section-number"><span>{number}</span><i /></div>
    <div className="section-heading-copy">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  </Reveal>;
}

function ProjectVisual({ type }) {
  if (type === 'dashboard') return <div className="mock-screen dashboard-screen">
    <div className="mock-sidebar"><span className="mock-logo">◈</span><i /><i /><i /><i /><i /></div>
    <div className="mock-content"><div className="mock-topline"><span>Overview</span><b>•••</b></div><div className="mock-metrics"><i /><i /><i /></div><div className="mock-chart"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="mock-rows"><i /><i /><i /></div></div>
  </div>;
  if (type === 'landing') return <div className="mock-screen landing-screen">
    <div className="mock-nav"><b>STUDIO<span>.</span></b><small>ABOUT&nbsp;&nbsp; WORK&nbsp;&nbsp; CONTACT</small></div>
    <div className="landing-copy"><small>THINK. CREATE. BUILD.</small><strong>Make ideas<br />matter<span>.</span></strong><i /><em>Thoughtful digital experiences.</em></div><div className="landing-orb"/><div className="landing-line"/>
  </div>;
  return <div className="mock-screen website-screen">
    <div className="mock-nav"><b>W<span>EDIGI</span></b><small>HOME&nbsp;&nbsp; SERVICES&nbsp;&nbsp; WORK&nbsp;&nbsp; CONTACT</small><i>LET’S TALK ↗</i></div>
    <div className="website-copy"><small>DIGITAL EXPERIENCES</small><strong>Building things<br />that <span>matter.</span></strong><p>Thoughtful solutions for a digital world.</p><i>EXPLORE ↗</i></div><div className="website-shape shape-one"/><div className="website-shape shape-two"/>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const ids = ['home', 'journey', 'work', 'learnings', 'balance', 'growth', 'people', 'thanks'];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-35% 0px -55% 0px' });
    ids.forEach(id => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);

  const navItems = [
    ['home', 'Home'], ['journey', 'Journey'], ['work', 'Work'], ['learnings', 'Learnings'], ['balance', 'Balance'], ['growth', 'Growth'], ['people', 'People'], ['thanks', 'Thank You'],
  ];

  return <>
    <motion.div className="scroll-progress" style={{ scaleX }} />
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Wedigi Studio journey home" onClick={() => setMenuOpen(false)}>Wedigi<span> Studio</span><i> / MY JOURNEY</i></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {navItems.map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="mobile-nav-cta" href="#thanks" onClick={() => setMenuOpen(false)}>The journey <ArrowUpRight size={15}/></a>
      </nav>
      {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
      <a className="header-cta" href="#thanks">The journey <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
    </header>

    <main>
      <section id="home" className="hero section-shell">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <motion.div className="hero-copy" initial="hidden" animate="show" variants={stagger}>
          <motion.div className="eyebrow hero-eyebrow" variants={fadeUp}><span className="live-dot"/> THREE MONTHS <b>·</b> LEARN <b>·</b> BUILD <b>·</b> GROW</motion.div>
          <motion.h1 variants={fadeUp}>My Internship<br/>Journey at<br/><span>Wedigi Studio<span className="period">.</span></span></motion.h1>
          <motion.p className="hero-description" variants={fadeUp}>A chapter of learning, building, collaborating, and discovering a better version of myself.</motion.p>
          <motion.div className="hero-actions" variants={fadeUp}><a className="button button-primary" href="#journey">Explore my journey <ArrowDown size={16}/></a><a className="button button-ghost" href="#learnings">What I learned <ArrowUpRight size={16}/></a></motion.div>
          <motion.div className="hero-stats" variants={fadeUp}>
            <div><strong>03<span> / MONTHS</span></strong><small>Learning by doing</small></div>
            <div><strong>03<span> / WORKSTREAMS</span></strong><small>Building real things</small></div>
            <div><strong>∞<span> / LESSONS</span></strong><small>To carry forward</small></div>
          </motion.div>
        </motion.div>
        <motion.div className="hero-art" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: .25 }}>
          <div className="art-label label-top"><span>FIG. 01</span> THE WORKSPACE</div>
          <div className="desk-window"><div className="window-glow"/><div className="window-bars"><i/><i/><i/></div><div className="window-city"><span/><span/><span/><span/><span/><span/><span/></div></div>
          <div className="desk-plant"><i/><b/><span/></div><div className="desk-table"/><div className="laptop"><div className="laptop-screen"><div className="code-label">IDEAS<br/><span>DEVELOPMENT</span><br/>DEPLOYMENT<br/><b>IMPACT_</b></div><div className="code-lines"><i/><i/><i/><i/><i/></div></div><div className="laptop-base"/></div><div className="desk-cup"/><div className="art-note"><span>THE PROCESS</span><strong>Better ideas.<br/>Brighter experiences.</strong><i/></div>
          <div className="art-label label-bottom"><span>CHAPTER 01</span><b>THE FIRST STEP</b></div>
        </motion.div>
        <a href="#journey" className="scroll-cue"><span/> SCROLL TO EXPLORE</a>
      </section>

      <section id="journey" className="section-shell story-section section-pad">
        <SectionHeading number="01" eyebrow="THE BEGINNING" title="It started with a random call." description="One conversation. A few doubts. One decision that led to three months I’ll always remember."/>
        <div className="story-layout">
          <Reveal className="story-copy"><p>When <strong>Swayam</strong> called me about joining Wedigi Studio for three months, my first thought wasn’t “Wow, that’s exciting!”</p><blockquote>“Can I actually do this? Am I really ready? Can I manage it all? Will I be able to fit in?”</blockquote><p>I had my doubts. I wasn’t sure whether I was the right person for the opportunity. But somewhere between all those questions, I decided to give it a shot.</p><p className="orange-copy">Looking back, I’m glad I did.</p></Reveal>
          <Reveal className="story-aside"><div className="aside-top"><Sparkles size={18}/><span>A NOTE TO MY PAST SELF</span></div><p>You don’t have to have everything figured out before you begin. Sometimes, you grow into the opportunity by showing up.</p><div className="aside-signature">— A lesson from the journey</div><div className="aside-stamp">01<span> / 07</span></div></Reveal>
        </div>
      </section>

      <section id="work" className="section-shell section-pad work-section">
        <SectionHeading number="02" eyebrow="WHAT I WORKED ON" title="Real work. Real learning." description="As a Full Stack Developer Intern, I got to contribute across different parts of the development process."/>
        <motion.div className="project-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}>
          {projects.map(project => { const Icon = project.icon; return <motion.article className="project-card" key={project.number} variants={fadeUp}>
            <div className="project-card-top"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span><Icon size={18} className="project-icon"/></div>
            <h3>{project.title}</h3><p>{project.description}</p>
            <div className="project-visual"><ProjectVisual type={project.visual}/></div>
            <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            {project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">View project <MoveUpRight size={15}/></a> : <span className="project-link project-link-muted">Project link coming soon <ArrowRight size={15}/></span>}
          </motion.article>; })}
        </motion.div>
        <Reveal className="confidential-note"><span className="note-mark">i</span><p>Project and client names are intentionally kept private here. Add approved public links in <code>src/App.jsx</code> when you’re ready to share them.</p></Reveal>
      </section>

      <section id="learnings" className="section-shell section-pad learn-section">
        <SectionHeading number="03" eyebrow="BEYOND THE CODE" title="Curiosity beyond my tasks." description="Some of the most useful lessons came from exploring how the pieces behind an application fit together."/>
        <motion.div className="learning-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}>
          {learnings.map((item, i) => { const Icon = item.icon; return <motion.article className="learning-card" key={item.title} variants={fadeUp}><div className="learning-top"><span>0{i + 1}</span><Icon size={22}/></div><h3>{item.title}</h3><p>{item.description}</p><div className="card-bottom-line"/></motion.article>; })}
        </motion.div>
        <Reveal className="kt-callout"><div className="kt-icon"><MessageCircle size={22}/></div><div><span className="eyebrow">A MOMENT THAT STUCK</span><h3>Learning it was one thing. Teaching it was another.</h3><p>Conducting a Knowledge Transfer session pushed me to organize my understanding, communicate clearly, and explain technical ideas to others.</p></div><ArrowUpRight className="kt-arrow" size={24}/></Reveal>
      </section>

      <section id="balance" className="section-shell section-pad balance-section">
        <SectionHeading number="04" eyebrow="THE MULTITASKING CHALLENGE" title="A lot of tabs open. Literally and mentally." description="Balancing different responsibilities wasn’t always easy, but it taught me how to prioritize, adapt, and keep moving."/>
        <div className="balance-layout"><Reveal className="balance-copy"><div className="big-quote-mark">“</div><h3>Learning to manage the work is part of learning the work.</h3><p>College, website responsibilities, my internship, and freelancing all needed time and attention. I learned to be more intentional about priorities and to collaborate with people from different domains.</p><div className="balance-foot"><span className="live-dot"/> STILL LEARNING. STILL IMPROVING.</div></Reveal>
          <motion.div className="responsibility-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }}>{responsibilities.map((item, i) => { const Icon = item.icon; return <motion.div className={`responsibility-card responsibility-${i + 1}`} variants={fadeUp} key={item.title}><div className="responsibility-head"><Icon size={21}/><span>0{i + 1}</span></div><small>{item.label}</small><h3>{item.title}</h3><p>{item.description}</p></motion.div>; })}</motion.div>
        </div>
      </section>

      <section id="growth" className="section-shell section-pad growth-section">
        <SectionHeading number="05" eyebrow="THE PERSONAL SIDE" title="The biggest change wasn’t technical." description="I came in with doubts about the work. I didn’t expect to leave with a different perspective on myself, too."/>
        <div className="growth-layout"><Reveal className="growth-art"><div className="sun-disc"/><div className="mountain mountain-back"/><div className="mountain mountain-front"/><div className="tiny-person"><i/><b/></div><div className="growth-art-caption"><span>OUTSIDE THE COMFORT ZONE</span><strong>Room to grow.</strong></div></Reveal>
          <Reveal className="growth-copy"><div className="eyebrow">A LITTLE MORE OPEN THAN BEFORE</div><h3>I’m a complete introvert by nature.</h3><p>Connecting with new people and starting conversations didn’t always come naturally to me. But the people I met at Wedigi Studio helped me open up, collaborate more confidently, and see things from a different perspective.</p><p>I learned that being an introvert doesn’t mean you can’t connect with people or put yourself out there. Sometimes, the right environment and the right people help you discover a side of yourself you haven’t explored yet.</p><div className="growth-checks"><div><CheckCircle2 size={17}/> Stepped outside my comfort zone</div><div><CheckCircle2 size={17}/> Grew more confident communicating</div><div><CheckCircle2 size={17}/> Collaborated across different domains</div><div><CheckCircle2 size={17}/> Learned to share what I know</div></div></Reveal>
        </div>
      </section>

      <section id="people" className="section-shell section-pad people-section">
        <SectionHeading number="06" eyebrow="PEOPLE MAKE THE JOURNEY" title="This chapter was never just about me." description="A big part of what made these three months memorable was the people I got to learn and work alongside."/>
        <motion.div className="people-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }}>{people.map((person, i) => <motion.article className={`person-card ${i < 2 ? 'person-featured' : ''}`} key={person.name} variants={fadeUp}><div className="person-index">0{i + 1}</div><div className="person-avatar">{person.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</div><div className="person-details"><h3>{person.name}</h3><span>{person.role}</span><p>{person.text}</p></div><Heart size={16} className="person-heart"/></motion.article>)}</motion.div>
        <Reveal className="gratitude-note"><Heart size={17}/><p>Thank you for the conversations, the support, the shared learning, and all the little moments that made this experience what it was.</p></Reveal>
      </section>

      <section id="thanks" className="closing-section section-shell">
        <div className="closing-horizon"><div className="closing-sun"/><div className="closing-ridge ridge-one"/><div className="closing-ridge ridge-two"/><div className="closing-ridge ridge-three"/><div className="closing-person"><i/><b/></div><div className="closing-grain"/></div>
        <div className="closing-content"><div className="eyebrow"><span className="live-dot"/> END OF CHAPTER · NOT THE END OF LEARNING</div><h2>I joined with doubts.<br/><span>I’m leaving with growth.</span></h2><p>New skills. Meaningful connections. Great memories. And a better understanding of software development — and myself.</p><div className="closing-thanks"><span>With gratitude,</span><strong>Thank you, <em>Wedigi Studio.</em></strong></div><div className="closing-rule"/><div className="closing-bottom"><p>Same person,<br/><strong>but a better version.</strong></p><a href="#home" className="back-top">BACK TO THE TOP <ArrowUpRight size={15}/></a></div></div>
      </section>
    </main>
    <footer className="site-footer"><a href="#home" className="brand">Wedigi<span> Studio</span><i> / MY JOURNEY</i></a><span>MADE WITH GRATITUDE & A LOT OF LEARNING</span><a href="#home" aria-label="Back to top"><ArrowUpRight size={17}/></a></footer>
  </>;
}

export default App;
