import React, { useEffect, useState } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    year: "2021",
    title: "Started Development Journey",
    description: "Began learning programming fundamentals and exploring different technologies. Started with basic web development, HTML/CSS/JS, and Lua scripting for fun server mods.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 3v4h14V3H5zm0 6v4h14V9H5zm0 6v4h14v-4H5z" />
      </svg>
    )
  },
  {
    year: "2022",
    title: "First Server Project – Ampora Roleplay",
    description: "Developed first FiveM roleplay server from scratch. Built vehicle systems, job scripts, and dynamic weather effects. Learned database handling and player synchronization.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm1 17.93V4.07c3.39.49 6 3.39 6 6.93s-2.61 6.44-6 6.93z" />
      </svg>
    )
  },
  {
    year: "2023",
    title: "Professional Development – CFG & Wave Crimelife",
    description: "Started professional FiveM projects. Created custom economy systems, admin tools, and roleplay frameworks. Implemented advanced anti-cheat protection and optimized networking performance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7l3-7z" />
      </svg>
    )
  },
  {
    year: "2023",
    title: "Leadership & Framework Building",
    description: "Became head developer and technical lead on multiple Crimelife projects. Designed modular job systems, smart vehicle AI, and a player reputation system with persistent data storage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-6 5.06 1.18 7.03L12 17.77l-5.18 3.59L8 14.33 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  },
  {
    year: "2024",
    title: "Expansion & Gangstas Paradise",
    description: "Worked on large-scale RP frameworks. Added gang territories, interactive heists, and economy balancing. Introduced a scalable dispatch system and modular police tools.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6h-2l-3 6h3l-2 6 6-8h-3l1-4zM4 6h6l-2 6h2l-2 6 6-8H8l2-4H4z" />
      </svg>
    )
  },
  {
    year: "2024",
    title: "Bandit City / Sin City",
    description: "Developed advanced criminal gameplay: dynamic heists, drug labs, money laundering, and AI police chases. Improved performance for high-population environments (350+ players).",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 17l6-5-6-5v10z" />
      </svg>
    )
  },
  {
    year: "2025",
    title: "Final City Project",
    description: "Served as lead developer. Introduced real estate management, company ownership, and realistic economy simulation. Managed developer teams and optimized server-side architecture.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v6c0 5.25 3.75 10.25 10 13 6.25-2.75 10-7.75 10-13V7l-10-5z" />
      </svg>
    )
  },
  {
    year: "2025",
    title: "fraudcard.org",
    description: "Founded a SaaS platform for developers. Provides authentication APIs, analytics, and server tracking. Manages global uptime monitoring for hundreds of roleplay frameworks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 14h-2v-2h2v2zm0-4h-2V6h2v8z" />
      </svg>
    )
  }
];


const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    timelineData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * 300);
    });
  }, []);

  return (
    <section className="section" id="timeline">
      <div className="section-container">
        <h2 className="section-title">Journey</h2>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {timelineData.map((item, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-marker">
                <div className="timeline-icon">{item.icon}</div>
                <div className="timeline-year">{item.year}</div>
              </div>
              <div
                className="timeline-content"
                style={{
                  opacity: visibleItems.includes(index) ? 1 : 0,
                  transform: visibleItems.includes(index) ? 'translateX(0)' : (index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)'),
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
