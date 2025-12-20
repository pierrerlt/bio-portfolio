import React, { useEffect, useState } from 'react';

const AboutMe: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        setVisibleCards(prev => new Set(Array.from(prev).concat(index)));
      }, index * 100);
    });
  }, []);

  const skills = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm2.5-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" />
        </svg>
      ),
      title: "FiveM Development",
      description: "Advanced server-side and client-side scripting for custom frameworks, jobs, and gameplay systems."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
        </svg>
      ),
      title: "Lua Scripting",
      description: "Expert-level Lua development for game logic, modular scripts, and performance-driven systems."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "Modern UI / NUI",
      description: "Creating interactive NUI interfaces using React, Vue, and vanilla JavaScript."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
        </svg>
      ),
      title: "Database Architecture",
      description: "Efficient database management with MySQL, MariaDB, and MongoDB."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
        </svg>
      ),
      title: "Backend Systems",
      description: "Node.js, PHP, and Python backend experience for RESTful APIs."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      ),
      title: "API Development",
      description: "Designing and maintaining secure RESTful and GraphQL APIs."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      ),
      title: "Security & Anti-Cheat",
      description: "Developed and integrated custom anti-cheat systems."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
      ),
      title: "Performance Optimization",
      description: "Performance tuning, memory profiling, and multi-threading optimization."
    }
  ];

  return (
    <section className="section" id="about">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-me-content">
          <div className="about-me-avatar">
            <img src="https://cdn.discordapp.com/avatars/403985631522586625/avatar.png" alt="Profile Avatar" />
          </div>
          <div className="about-me-text">
            <h3>Hi, I'm Pierre Rollet</h3>
            <p>
              A passionate developer with extensive experience in FiveM development, Lua scripting, and modern web technologies.
              I specialize in creating immersive gaming experiences and scalable backend systems.
            </p>
            <p>
              With over 5 years in the industry, I've worked on multiple successful projects including roleplay servers,
              custom frameworks, and performance-optimized multiplayer environments. My expertise spans from client-side
              UI/UX development to complex server architecture and database optimization.
            </p>
            <p>
              I'm always eager to take on new challenges and collaborate on innovative projects that push the boundaries
              of what's possible in gaming and web development.
            </p>
          </div>
        </div>
        <div className="about-me-skills">
          <h3 className="skills-subtitle">Key Skills</h3>
          <div className="skills-grid-compact">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card-compact"
                style={{
                  opacity: visibleCards.has(index) ? 1 : 0,
                  transform: visibleCards.has(index) ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="skill-icon-compact">
                  {skill.icon}
                </div>
                <div className="skill-content-compact">
                  <h4 className="skill-title-compact">{skill.title}</h4>
                  <p className="skill-desc-compact">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;