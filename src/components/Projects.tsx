import React, { useEffect, useState } from 'react';

const Projects: React.FC = () => {
  const [wavePlayers, setWavePlayers] = useState(0);
  const [gangstasPlayers, setGangstasPlayers] = useState(0);
  const [amporaPlayers, setAmporaPlayers] = useState(0);
  const [cfgPlayers, setcfgPlayers] = useState(0);
  const [fivelifePlayers, setfivelifePlayers] = useState(0);
  const [FinalCityPlayers, setFinalCityPlayers] = useState(0);
  const [frameworkServers, setFrameworkServers] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        setVisibleCards(prev => new Set(Array.from(prev).concat(index)));
      }, index * 100);
    });
  }, []);

  useEffect(() => {
    const animateCounter = (setter: (value: number) => void, target: number, duration: number) => {
      let current = 0;
      const increment = target / (duration / 16);
      const startTime = Date.now();

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        current += increment;

        if (current >= target || elapsed >= duration) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
    };

    setTimeout(() => {
      animateCounter(setWavePlayers, 180, 1500);
      animateCounter(setcfgPlayers, 380, 1500);
      animateCounter(setGangstasPlayers, 500, 1800);
      animateCounter(setAmporaPlayers, 670, 1800);
      animateCounter(setfivelifePlayers, 460, 1800);
      animateCounter(setFinalCityPlayers, 430, 2000);
      animateCounter(setFrameworkServers, 120, 2100);
    }, 3800);
  }, []);

  const projects = [
    {
      logo: "https://fraudcard.org/file/zen_______-removebg-preview",
      title: "Ampora Roleplay",
      period: "May 2022 - June 2022",
      stats: [
        { value: amporaPlayers, label: "Players" },
        { value: "24/7", label: "Uptime" }
      ],
      description: "Developed core gameplay systems and optimized server performance. Introduced dynamic bus routes, player housing, and weather-based events for deeper immersion."
    },
    {
      logo: "https://fraudcard.org/file/channels4_profile",
      title: "Gangstas Paradise",
      period: "May 2024 - June 2024",
      stats: [
        { value: gangstasPlayers, label: "Players" },
        { value: "24/7", label: "Uptime" }
      ],
      description: "Worked as a backend engineer building a scalable inventory and gang system. Added money laundering mechanics and a territory war module for factions."
    },
    {
      logo: "https://fraudcard.org/file/logo_static_discord_size",
      title: "5LIFE ROLEPLAY",
      period: "Oct 2025 - Present",
      stats: [
        { value: fivelifePlayers, label: "Players" },
        { value: "24/7", label: "Uptime" }
      ],
      description: "Full-stack developer for premium roleplay experience. Advanced BusJob system, Bug-Fixer and supporter."
    },
    {
      logo: "https://fraudcard.org/file/logo",
      title: "Final City",
      period: "May 2025 - Oct 2025",
      stats: [
        { value: FinalCityPlayers, label: "Players" },
        { value: "24/7", label: "Uptime" }
      ],
      description: "Responsible for full infrastructure setup and optimization. Built a secure login flow, revamped the economy balancing, and improved syncing for large-scale RP events."
    },
    {
      logo: "https://fraudcard.org/file/banditcity",
      title: "Bandit City / Sin City",
      period: "May 2024 - Oct 2024",
      stats: [
        { value: "390", label: "Players" },
        { value: "24/7", label: "Uptime" }
      ],
      description: "Created a unique criminal progression system with heists, laundering, and black market trading. Focused on gameplay depth and dynamic police-AI responses."
    },
    {
      logo: "https://fraudcard.org/file/logo3",
      title: "CFG Crimelife",
      period: "Mar 2023 - July 2023",
      stats: [
        { value: cfgPlayers, label: "Players" },
        { value: "24/7", label: "Uptime" }
      ],
      description: "Served as head developer and project manager. Built a custom economy, realistic jail system, and admin panel with integrated anti-cheat analytics."
    },
    {
      logo: "https://fraudcard.org/file/BsjwTJJ",
      title: "Wave Crimelife",
      period: "Mar 2023 - July 2025",
      stats: [
        { value: wavePlayers, label: "Players" },
        { value: "24/7", label: "Uptime" }
      ],
      description: "Focused on roleplay immersion and visual quality. Designed vehicle tuning UI, interactive drug production, and performance-optimized sync for 300+ concurrent players."
    },
    {
      logo: "https://fraudcard.org/file/icon-116",
      title: "fraudcard.org",
      period: "Sep 2024 - Present",
      stats: [
        { value: frameworkServers, label: "Usage per day" },
        { value: "99%", label: "Stability" }
      ],
      description: "Founder and lead engineer. Developing APIs and dashboard tools used by multiple RP communities for server authentication, analytics, and uptime monitoring."
    }
  ];

  return (
    <section className="section" id="projects">
      <div className="section-container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="skills-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{
                opacity: visibleCards.has(index) ? 1 : 0,
                transform: visibleCards.has(index) ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="project-header">
                <img className="server-logo" src={project.logo}></img>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-period">{project.period}</div>
                </div>
              </div>
              <div>
                <div className="project-stats">
                  {project.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="stat">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;