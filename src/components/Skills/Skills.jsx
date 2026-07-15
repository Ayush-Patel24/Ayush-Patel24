import { useState, useEffect, useRef } from 'react';
import './Skills.css';

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

const skills = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'Frontend', level: 90, badge: 'Expert' },
  { name: 'JavaScript', icon: '🟨', category: 'Frontend', level: 88, badge: 'Expert' },
  { name: 'TypeScript', icon: '🔷', category: 'Frontend', level: 80, badge: 'Advanced' },
  { name: 'HTML5', icon: '🌐', category: 'Frontend', level: 95, badge: 'Expert' },
  { name: 'CSS3', icon: '🎨', category: 'Frontend', level: 88, badge: 'Expert' },
  { name: 'Next.js', icon: '▲', category: 'Frontend', level: 78, badge: 'Advanced' },
  { name: 'Tailwind', icon: '💨', category: 'Frontend', level: 85, badge: 'Expert' },
  { name: 'Redux', icon: '🔄', category: 'Frontend', level: 75, badge: 'Advanced' },
  // Backend
  { name: 'Node.js', icon: '🟩', category: 'Backend', level: 85, badge: 'Expert' },
  { name: 'Express.js', icon: '🚂', category: 'Backend', level: 82, badge: 'Advanced' },
  { name: 'Python', icon: '🐍', category: 'Backend', level: 72, badge: 'Intermediate' },
  { name: 'REST APIs', icon: '🔗', category: 'Backend', level: 88, badge: 'Expert' },
  { name: 'GraphQL', icon: '◈', category: 'Backend', level: 68, badge: 'Intermediate' },
  // Database
  { name: 'MongoDB', icon: '🍃', category: 'Database', level: 80, badge: 'Advanced' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Database', level: 75, badge: 'Advanced' },
  { name: 'MySQL', icon: '🐬', category: 'Database', level: 72, badge: 'Advanced' },
  { name: 'Redis', icon: '🔴', category: 'Database', level: 60, badge: 'Intermediate' },
  // Tools
  { name: 'Git', icon: '🌿', category: 'Tools', level: 90, badge: 'Expert' },
  { name: 'Docker', icon: '🐳', category: 'Tools', level: 70, badge: 'Intermediate' },
  { name: 'Vite', icon: '⚡', category: 'Tools', level: 85, badge: 'Advanced' },
  { name: 'Figma', icon: '🎭', category: 'Tools', level: 72, badge: 'Advanced' },
  { name: 'AWS', icon: '☁️', category: 'Tools', level: 62, badge: 'Intermediate' },
];

function SkillCard({ skill, animate }) {
  return (
    <div className="skill-card">
      <div className="skill-icon" aria-hidden="true">{skill.icon}</div>
      <span className="skill-name">{skill.name}</span>
      <span className="skill-badge">{skill.badge}</span>
      <div className="skill-level" aria-label={`${skill.name} proficiency ${skill.level}%`}>
        <div
          className={`skill-level-bar${animate ? ' animate' : ''}`}
          style={{ '--target-width': `${skill.level / 100}` }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Re-animate on category change
  useEffect(() => {
    if (animated) {
      setAnimated(false);
      setTimeout(() => setAnimated(true), 50);
    }
  }, [activeCategory]);

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="skills-header reveal" ref={ref}>
          <span className="section-label">What I know</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A curated set of tools and technologies I use to build modern web applications.
          </p>
        </div>

        <div className="skills-tabs" role="tablist" aria-label="Skill categories">
          {categories.map(cat => (
            <button
              key={cat}
              id={`skills-tab-${cat}`}
              className={`skills-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skills-grid" role="tabpanel">
          {filtered.map(skill => (
            <SkillCard key={skill.name} skill={skill} animate={animated} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
