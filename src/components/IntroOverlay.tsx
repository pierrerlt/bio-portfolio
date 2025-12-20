import React, { useEffect, useState } from 'react';

const IntroOverlay: React.FC = () => {
  const [stage, setStage] = useState<'enter' | 'exit' | 'done'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('exit'), 2000);
    const t2 = setTimeout(() => setStage('done'), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (stage === 'done') return null;

  return (
    <>
      <style>{`
        .intro-veil {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: radial-gradient(1000px 400px at -10% -10%, rgba(56,189,248,0.2), transparent 50%),
              radial-gradient(900px 500px at 120% 0%, rgba(125,211,252,0.25), transparent 50%),
              #0b0f14;
        }

        .intro-veil.exit {
           animation: irisOut 600ms ease forwards;
         }

        .intro-core {
          position: relative;
          display: grid;
          place-items: center;
          gap: 18px;
          padding: 12px;
          color: #e6edf3;
          text-shadow: 0 0 10px rgba(125,211,252,0.25);
        }

        .core-wrap {
          position: relative;
          width: 220px;
          height: 220px;
          display: grid;
          place-items: center;
        }

        .core-circle {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          position: relative;
          opacity: 0;
          transform: scale(0.98);
          animation: popIn 700ms 200ms cubic-bezier(.2,.7,.2,1) forwards;
        }

        .core-circle::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: conic-gradient(from 0deg, rgba(125,211,252,0.0), rgba(125,211,252,0.7), rgba(125,211,252,0.0) 60%);
          filter: blur(6px);
          animation: ringSpin 1800ms linear infinite;
        }

        .core-circle::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(circle at 50% 50%, rgba(56,189,248,0.25), rgba(56,189,248,0.05) 60%);
          box-shadow: inset 0 0 0 1px rgba(56,189,248,0.45), 0 10px 30px rgba(0,0,0,0.35);
        }

        .halo {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transform: scale(0.98);
          background: radial-gradient(circle at 50% 50%, rgba(56,189,248,0.22), rgba(56,189,248,0.0) 60%);
          filter: blur(18px);
          animation: popIn 700ms 140ms cubic-bezier(.2,.7,.2,1) forwards, pulse 1600ms ease-in-out infinite alternate;
        }

        .headline {
          text-align: center;
          display: grid;
          gap: 4px;
        }

        .kicker {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 14px;
          color: #a3b3c3;
          letter-spacing: .12em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(8px);
          animation: slideUp 600ms 260ms ease forwards;
          text-shadow: 0 0 6px rgba(125,211,252,0.35);
        }

        .name {
          font-weight: 900;
          font-size: 46px;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #ffffff, #7dd3fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          transform: translateY(10px);
          animation: slideUp 650ms 340ms ease forwards, flicker 2.5s linear infinite;
          text-shadow: 0 0 12px rgba(125,211,252,0.25);
        }

        .sub {
          font-size: 16px;
          color: #c1d0de;
          opacity: 0;
          transform: translateY(10px);
          animation: slideUp 650ms 440ms ease forwards;
          text-shadow: 0 0 8px rgba(125,211,252,0.2);
        }

        @keyframes ringSpin { to { transform: rotate(360deg); } }
        @keyframes pulse { from { transform: scale(1); opacity: 0.6; } to { transform: scale(1.08); opacity: 0.85; } }
        @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.98); } 100% { opacity: 1; transform: scale(1); } }

        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.85; }
          22% { opacity: 0.6; }
        }

        @keyframes irisOut {
           0% { clip-path: circle(120% at 50% 50%); opacity: 1; transform: scale(1); }
           90% { clip-path: circle(0% at 50% 50%); opacity: 1; transform: scale(1); }
           100% { clip-path: circle(0% at 50% 50%); opacity: 0; pointer-events: none; transform: scale(1.05); }
         }

        @media (prefers-reduced-motion: reduce) {
          .intro-veil.exit { animation-duration: 0s; }
          .halo { animation: none; }
          .core-circle { animation: none; opacity: 1; transform: none; }
          .kicker, .name, .sub { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <div className={`intro-veil ${stage}`} aria-hidden={stage !== 'enter'}>
        <div className="intro-core">
          <div className="halo" />
          <div className="core-wrap">
            <div className="core-circle" />
          </div>
          <div className="headline">
            <div className="kicker">Portfolio</div>
            <div className="name">pierrerollet</div>
            <div className="sub">Full-stack developer • FiveM • Lua/TS • Scalable systems</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroOverlay;
