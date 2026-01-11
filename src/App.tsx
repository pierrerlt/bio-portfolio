import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import IntroOverlay from './components/IntroOverlay';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = '';
      setTimeout(() => setRevealed(true), 40);
    }, 2900);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.max(1, window.devicePixelRatio || 1);
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; size: number };
    const parts: Particle[] = [];
    const spawn = (x: number, y: number) => {
      for (let i = 0; i < 2; i++) {
        parts.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.05,
          life: 1,
          size: 1 + Math.random() * 0.8,
        });
      }
    };

    const onMove = (e: MouseEvent) => spawn(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMove, { passive: true } as any);

    let raf = 0;
    const loop = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life *= 0.9;
        p.size *= 0.98;
        if (p.life < 0.05) {
          parts.splice(i, 1);
          continue;
        }

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0, `rgba(56,189,248,${0.18 * p.life})`);
        g.addColorStop(1, 'rgba(56,189,248,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        id="cursorCanvas"
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {showIntro && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000 }}>
          <IntroOverlay />
        </div>
      )}

      <div
        className="App"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'scale(1)' : 'scale(0.8)',
          filter: revealed ? 'blur(0)' : 'blur(8px)',
          transition: 'opacity 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55), filter 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        }}
      >
        <div className="grid-overlay"></div>

        <Navbar />
        <Hero />
        <AboutMe />
        <Timeline />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
