import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [subtitleText, setSubtitleText] = useState('');
  const [typewriterText, setTypewriterText] = useState('');
  const [lineNumbers, setLineNumbers] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  const codeLines = [
    'local Developer = {}',
    'Developer.__index = Developer',
    '',
    'function Developer:new(name, role, skills, contact)',
    '    return setmetatable({',
    '        name = name,',
    '        role = role,',
    '        skills = skills,',
    '        contact = contact',
    '    }, self)',
    'end',
    '',
    'local pierrerollet = Developer:new(',
    '    "pierrerollet",',
    '    "Full Stack Developer",',
    '    { "Lua", "JS/TS", "C#", "Java", "PHP", "SQL", "MongoDB" },',
    '    {',
    '        discord = "pierrerollet",',
    '        github = "github.com/pierrerlt"',
    '    }',
    ')'
  ];

  const startSubtitleTypewriter = () => {
    const text = "Developer / Founder / Team Manager";
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        setSubtitleText(text.slice(0, i));
        i++;
        setTimeout(type, 150);
      }
    };
    type();
  };

  const startTypewriter = () => {
    const text = "Pierre Rollet";
    let charIndex = 0;
    let isDeleting = false;
    let currentText = "";

    const jitter = (base: number, spread: number) =>
      Math.max(25, base + (Math.random() - 0.5) * spread);

    const type = () => {
      setShowCursor(true);

      if (!isDeleting) {
        currentText = text.substring(0, charIndex + 1);
        charIndex++;
        setTypewriterText(currentText);

        if (charIndex === text.length) {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 150);
          setTimeout(() => {
            isDeleting = true;
            charIndex = 0;
            setTimeout(type, 400);
          }, 1000);
        } else {
          setTimeout(type, jitter(90, 40));
        }
      } else {
        currentText = text.substring(charIndex);
        charIndex++;
        setTypewriterText(currentText);

        if (charIndex > text.length) {
          isDeleting = false;
          charIndex = 0;
          setTimeout(type, 400);
        } else {
          setTimeout(type, jitter(50, 20));
        }
      }
    };

    type();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setTerminalVisible(true);
        setTimeout(() => {
          startSubtitleTypewriter();
          startTypewriter();
          startTerminalCode();
        }, 500);
      }, 300);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const highlightLua = (code: string) => {
    const ESC = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    let src = ESC(code);
    const placeholders: string[] = [];
    const put = (str: string) => {
      const id = `__T${placeholders.length}__`;
      placeholders.push(str);
      return id;
    };
    src = src.replace(/(\"(?:\\.|[^\"\\])*\"|'(?:\\.|[^'\\])*')/g, (m) => put(`<span style="color:#86efac">${m}</span>`));
    src = src.replace(/(--.*?$)/gm, (m) => put(`<span style="color:#64748b">${m}</span>`));
    src = src.replace(/\b(local|function|end|return|self|then|if|elseif|else|nil|true|false|table|for|while|do|not|and|or)\b/g, '<span style="color:#7dd3fc">$1</span>');
    src = src.replace(/\b\d+(?:\.\d+)?\b/g, '<span style="color:#fca5a5">$&</span>');
    src = src.replace(/([{}()\[\],])/g, '<span style="color:#9AA7B4">$1</span>');
    placeholders.forEach((html, i) => {
      const id = new RegExp(`__T${i}__`, 'g');
      src = src.replace(id, html);
    });
    return src;
  };

  const startTerminalCode = () => {
    let lineIndex = 0;
    let charIdx = 0;
    let currentCode = '';

    const typeCode = () => {
      if (lineIndex >= codeLines.length) {
        setShowCursor(false);
        return;
      }

      const currentLine = codeLines[lineIndex];

      if (charIdx < currentLine.length) {
        currentCode += currentLine[charIdx];
        charIdx++;

        setHighlightedCode(highlightLua(currentCode));

        const lines = currentCode.split('\n');
        let lineNumbersText = '';
        for (let i = 1; i <= lines.length; i++) {
          lineNumbersText += i.toString().padStart(2, ' ') + '\n';
        }
        setLineNumbers(lineNumbersText);

        setTimeout(typeCode, 30);
      } else {
        currentCode += '\n';
        lineIndex++;
        charIdx = 0;

        setHighlightedCode(highlightLua(currentCode));

        setTimeout(typeCode, 150);
      }
    };

    typeCode();
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        <div className={`hero-left ${isVisible ? 'visible' : ''}`} id="heroLeft">
          <p className="hero-subtitle" style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '4px' }}>
            {subtitleText}
          </p>
          <h1
            className="hero-name"
            style={
              glitch
                ? {
                    filter: 'contrast(1.3) brightness(1.1)',
                    textShadow:
                      '0 0 6px rgba(125,211,252,0.5), 0 0 14px rgba(56,189,248,0.35), 0 0 22px rgba(56,189,248,0.2)',
                    transition: 'all 80ms ease-in'
                  }
                : undefined
            }
          >
            <span id="typewriterText">{typewriterText}</span>
            <span className="typewriter-cursor" style={{ opacity: showCursor ? 1 : 0 }}></span>
          </h1>
          <p className="hero-handle">@pierrerollet</p>
          <p className="hero-bio">
            Full-stack FiveM developer focused on clean code, fast UIs, and scalable backends.
          </p>
          <div className="cta-row" style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
              }}
              className="btn btn-primary"
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'var(--accent-strong)',
                color: '#0b0f14',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              View Work
            </a>
            <a
              href="https://github.com/pierrerlt"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                textDecoration: 'none',
              }}
            >
              GitHub
            </a>
          </div>
        </div>
        <div className={`terminal ${terminalVisible ? 'visible' : ''}`} id="terminal">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#ff5f57' }}></div>
            <div className="terminal-dot" style={{ background: '#ffbd2e' }}></div>
            <div className="terminal-dot" style={{ background: '#28ca42' }}></div>
            <div className="terminal-title">main.lua</div>
          </div>
          <div className="terminal-body">
            <div className="line-numbers" id="lineNumbers">
              {lineNumbers}
            </div>
            <div className="code-content">
              <span id="terminalCode" dangerouslySetInnerHTML={{ __html: highlightedCode }}></span>
              {showCursor && <span className="terminal-typewriter-cursor" id="terminalCursor"></span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
