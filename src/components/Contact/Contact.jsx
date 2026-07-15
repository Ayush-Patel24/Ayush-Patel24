import { useState, useRef, useEffect } from 'react';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter, FiPhone } from 'react-icons/fi';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
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

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    await new Promise(res => setTimeout(res, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact-header reveal" ref={ref}>
          <span className="section-label">Get in touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="contact-content">
          {/* Left side */}
          <div className="contact-info reveal-left">
            <div>
              <p className="contact-tagline">
                Ready to build something <span>amazing together?</span>
              </p>
              <p className="contact-desc" style={{ marginTop: '1rem' }}>
                Whether it's a freelance project, full-time opportunity, or just a chat about tech —
                I'd love to hear from you. I typically respond within 24 hours.
              </p>
            </div>

            <div className="contact-cards">
              <a href="mailto:ayush@email.com" className="contact-card">
                <div className="contact-card-icon"><FiMail /></div>
                <div>
                  <div className="contact-card-label">Email</div>
                  <div className="contact-card-value">ayush@email.com</div>
                </div>
              </a>
              <div className="contact-card">
                <div className="contact-card-icon"><FiMapPin /></div>
                <div>
                  <div className="contact-card-label">Location</div>
                  <div className="contact-card-value">New Delhi, India 🇮🇳</div>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><FiPhone /></div>
                <div>
                  <div className="contact-card-label">Availability</div>
                  <div className="contact-card-value">Open to opportunities</div>
                </div>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Or find me on
              </p>
              <div className="contact-social">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-social-link">
                  <FiGithub /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-social-link">
                  <FiLinkedin /> LinkedIn
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="contact-social-link">
                  <FiTwitter /> Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper reveal-right">
            {sent ? (
              <div className="form-success">
                <div className="form-success-icon">🎉</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out! I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      autoComplete="name"
                    />
                    <label htmlFor="contact-name">Your Name</label>
                  </div>
                  <div className="form-field">
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      autoComplete="email"
                    />
                    <label htmlFor="contact-email">Email Address</label>
                  </div>
                </div>

                <div className="form-field">
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                  />
                  <label htmlFor="contact-subject">Subject</label>
                </div>

                <div className="form-field">
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    rows={6}
                  />
                  <label htmlFor="contact-message">Your Message</label>
                </div>

                <div className="form-submit">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="btn-primary"
                    disabled={sending}
                  >
                    {sending ? (
                      <>Sending… <span className="spinner" aria-hidden="true">⏳</span></>
                    ) : (
                      <>Send Message <FiSend /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="contact-footer">
          <p>
            Designed & Built by{' '}
            <a href="#home" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Ayush
            </a>{' '}
            with <span className="footer-heart">♥</span>
          </p>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </footer>
      </div>
    </section>
  );
}

export default Contact;
