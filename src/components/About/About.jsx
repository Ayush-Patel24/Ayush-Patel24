import { useEffect, useRef } from 'react';
import { FiMapPin, FiCoffee, FiMusic, FiBook, FiCode, FiHeart, FiArrowRight } from 'react-icons/fi';
import './About.css';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const facts = [
  { icon: '🌍', label: 'Based in India' },
  { icon: '☕', label: 'Coffee addict' },
  { icon: '🎵', label: 'Music lover' },
  { icon: '📚', label: 'Always learning' },
  { icon: '🎮', label: 'Gamer at heart' },
  { icon: '🚀', label: 'Open source fan' },
];

function About() {
  const leftRef = useReveal();
  const rightRef = useReveal();

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="reveal" ref={useRef(null)}>
          <span className="section-label">Who I am</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A passionate developer who loves building things that live on the internet.
          </p>
        </div>

        <div className="about-content">
          {/* Avatar Side */}
          <div className="reveal-left" ref={leftRef}>
            <div className="about-avatar-card">
              <div className="about-avatar-img">
                <span role="img" aria-label="Ayush avatar">🧑‍💻</span>
              </div>
              <div className="about-avatar-glow" aria-hidden="true" />

              <div className="about-fact-card about-fact-card-1">
                <div className="about-fact-value">2+</div>
                <div className="about-fact-label">Years Experience</div>
              </div>

              <div className="about-fact-card about-fact-card-2">
                <div className="about-fact-value">20+</div>
                <div className="about-fact-label">Projects Done</div>
              </div>
            </div>
          </div>

          {/* Bio Side */}
          <div className="reveal-right" ref={rightRef}>
            <div className="about-bio">
              <p>
                Hey! I'm <strong>Ayush</strong>, a passionate <span className="about-highlight">Full Stack Developer</span> from India.
                I love building digital products that solve real problems and deliver exceptional user experiences.
              </p>
              <p>
                With <strong>2+ years of experience</strong>, I specialize in building full-stack web applications using <strong>React, Node.js, and modern cloud technologies</strong>.
                I'm particularly passionate about creating clean, performant, and accessible UIs.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee ☕
              </p>

              <div className="about-facts-grid">
                {facts.map((f, i) => (
                  <div key={i} className="about-fact-item">
                    <span className="about-fact-icon">{f.icon}</span>
                    {f.label}
                  </div>
                ))}
              </div>

              <div className="about-actions">
                <a
                  href="#contact"
                  className="btn-primary"
                  onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Let's Talk <FiArrowRight />
                </a>
                <a href="#" className="btn-secondary">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
