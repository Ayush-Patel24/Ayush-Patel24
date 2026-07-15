import { useEffect, useRef } from 'react';
import './Experience.css';

const workExperience = [
  {
    role: 'Full Stack Developer',
    company: 'TechCorp Solutions',
    type: 'Full-time',
    period: 'Jan 2024 – Present',
    description: [
      'Built and maintained 5+ production web apps using React & Node.js',
      'Reduced API response time by 40% through query optimization and Redis caching',
      'Led a team of 3 developers on a client-facing dashboard project',
      'Implemented CI/CD pipelines with GitHub Actions & Docker',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'StartupLabs',
    type: 'Internship',
    period: 'Jul 2023 – Dec 2023',
    description: [
      'Developed reusable component library used across 3 products',
      'Improved Lighthouse performance score from 62 to 91',
      'Collaborated directly with designers to implement pixel-perfect UIs',
    ],
    tech: ['React', 'TypeScript', 'Tailwind', 'Figma'],
  },
  {
    role: 'Freelance Web Developer',
    company: 'Self-Employed',
    type: 'Freelance',
    period: 'Jun 2022 – Jul 2023',
    description: [
      'Delivered 8+ client websites and web apps end-to-end',
      'Built e-commerce stores with payment gateway integrations',
      'Maintained ongoing client relationships with excellent feedback',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Stripe'],
  },
];

const education = [
  {
    role: 'B.Tech in Computer Science',
    company: 'GGSIPU University',
    type: 'Degree',
    period: '2020 – 2024',
    description: [
      'CGPA: 8.5 / 10',
      'Major: Software Engineering & Web Technologies',
      'Hackathon winner — Smart India Hackathon 2023',
    ],
    tech: ['Data Structures', 'DBMS', 'OS', 'Networks'],
  },
  {
    role: 'Full Stack Web Development',
    company: 'Udemy / FreeCodeCamp',
    type: 'Certification',
    period: '2021 – 2022',
    description: [
      'Completed 3 full certifications in MERN stack development',
      'Built 10+ portfolio projects as part of curriculum',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
  },
];

function TimelineItem({ item, index }) {
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

  return (
    <div
      className="timeline-item reveal"
      ref={ref}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="timeline-dot">
        <div className="timeline-dot-inner" aria-hidden="true" />
      </div>
      <div className="timeline-card">
        <div className="timeline-header">
          <h3 className="timeline-role">{item.role}</h3>
          <span className="timeline-period">{item.period}</span>
        </div>
        <p className="timeline-company">
          {item.company}
          <span className="timeline-type-badge">{item.type}</span>
        </p>
        <div className="timeline-desc">
          <ul>
            {item.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="timeline-tech">
          {item.tech.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <div className="experience-header reveal">
          <span className="section-label">My journey</span>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            My professional path and academic background that shaped who I am as a developer.
          </p>
        </div>

        <div className="experience-dual">
          <div>
            <h3 className="exp-column-title">💼 Work Experience</h3>
            <div className="timeline" role="list">
              {workExperience.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="exp-column-title">🎓 Education</h3>
            <div className="timeline" role="list">
              {education.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
