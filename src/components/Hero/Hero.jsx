import { useState, useEffect, useRef } from 'react';
import {
  FiGithub, FiLinkedin, FiTwitter, FiMail,
  FiArrowRight, FiDownload, FiCode, FiZap, FiStar
} from 'react-icons/fi';
import './Hero.css';

const roles = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'UI/UX Enthusiast',
  'Problem Solver',
];

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    color: ['#7c3aed', '#a855f7', '#c084fc'][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-20px',
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting && displayText === currentRole) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 60 : 100;
      timeoutRef.current = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting
            ? prev.slice(0, -1)
            : currentRole.slice(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, roleIndex]);

  const handleScrollDown = (e) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <Particles />
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content">
        {/* Left: Text */}
        <div className="hero-text">
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Available for opportunities
          </div>

          <h1 className="hero-name">
            Hi, I'm{' '}
            <span className="hero-name-gradient">Ayush</span>
          </h1>

          <p className="hero-role">
            <span className="hero-role-static">I'm a </span>
            <span className="typewriter" aria-live="polite">{displayText}</span>
          </p>

          <p className="hero-description">
            Passionate about crafting beautiful, performant web experiences.
            I turn ideas into elegant code and complex problems into simple solutions.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
              View My Work <FiArrowRight />
            </a>
            <a href="#contact" className="btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <FiDownload /> Download CV
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">2+</span>
              <span className="hero-stat-label">Years Exp.</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">20+</span>
              <span className="hero-stat-label">Projects</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">10+</span>
              <span className="hero-stat-label">Technologies</span>
            </div>
          </div>

          <div className="hero-social">
            <span className="hero-social-label">Find me on</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="mailto:ayush@email.com" className="hero-social-link" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="hero-visual">
          <div className="hero-avatar-wrapper">
            <div className="hero-avatar-ring" aria-hidden="true" />
            <div className="hero-avatar">
              <span role="img" aria-label="Developer avatar">👨‍💻</span>
            </div>
          </div>

          <div className="hero-float-badge hero-float-badge-1" aria-hidden="true">
            <FiCode style={{ color: '#a855f7' }} />
            Clean Code
          </div>
          <div className="hero-float-badge hero-float-badge-2" aria-hidden="true">
            <FiZap style={{ color: '#f59e0b' }} />
            Fast & Scalable
          </div>
          <div className="hero-float-badge hero-float-badge-3" aria-hidden="true">
            <FiStar style={{ color: '#22c55e' }} />
            5★ Projects
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="hero-scroll"
        onClick={handleScrollDown}
        aria-label="Scroll down to About section"
      >
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        scroll
      </a>
    </section>
  );
}

export default Hero;
