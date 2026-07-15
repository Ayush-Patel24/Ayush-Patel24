import { useState, useEffect, useRef } from 'react';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import './Projects.css';

const allProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with cart, payments, and admin dashboard. Supports 1000+ products with real-time inventory management.',
    category: 'Full Stack',
    emoji: '🛒',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Real-Time Chat App',
    description: 'Socket.io powered chat application with rooms, file sharing, and end-to-end encryption.',
    category: 'Full Stack',
    emoji: '💬',
    tech: ['React', 'Socket.io', 'Express', 'Redis'],
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'AI Task Manager',
    description: 'Smart productivity app using OpenAI to auto-categorize and prioritize tasks. Includes analytics dashboard.',
    category: 'Frontend',
    emoji: '🤖',
    tech: ['React', 'OpenAI API', 'Tailwind', 'TypeScript'],
    github: '#',
    live: '#',
  },
  {
    id: 4,
    title: 'Dev Blog Platform',
    description: 'A markdown-powered blogging platform with SEO optimization, dark mode, and code syntax highlighting.',
    category: 'Full Stack',
    emoji: '📝',
    tech: ['Next.js', 'MDX', 'PostgreSQL', 'Vercel'],
    github: '#',
    live: '#',
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with hourly & weekly forecasts, interactive maps, and location-based alerts.',
    category: 'Frontend',
    emoji: '🌤️',
    tech: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
    github: '#',
    live: '#',
  },
  {
    id: 6,
    title: 'REST API Boilerplate',
    description: 'Production-ready Node.js API template with auth, rate-limiting, logging, and Docker support.',
    category: 'Backend',
    emoji: '🔧',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
    github: '#',
    live: '#',
  },
];

const filters = ['All', 'Full Stack', 'Frontend', 'Backend'];

function ProjectCard({ project, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`project-card reveal${project.featured ? ' featured' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
    >
      {project.featured && (
        <span className="project-featured-badge">⭐ Featured</span>
      )}

      <div className="project-image">
        <div className="project-image-emoji" aria-hidden="true">{project.emoji}</div>
        <div className="project-image-overlay">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-link-btn" aria-label={`${project.title} GitHub`}>
            <FiGithub />
          </a>
          <a href={project.live} target="_blank" rel="noreferrer" className="project-link-btn" aria-label={`${project.title} Live Demo`}>
            <FiExternalLink />
          </a>
        </div>
      </div>

      <div className="project-info">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tech">
          {project.tech.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
            <FiGithub /> Code
          </a>
          <a href={project.live} target="_blank" rel="noreferrer" className="project-link">
            <FiExternalLink /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div className="projects-header reveal">
          <span className="section-label">My work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of projects I've built — ranging from full-stack apps to open-source tools.
          </p>
        </div>

        <div className="projects-filters" role="group" aria-label="Filter projects">
          {filters.map(f => (
            <button
              key={f}
              id={`filter-${f.replace(' ', '-')}`}
              className={`projects-filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="projects-cta">
          <p>Want to see more of my work?</p>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary">
            <FiGithub /> View All on GitHub <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
