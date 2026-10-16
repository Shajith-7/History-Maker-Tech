import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < 94) {
        current += Math.max(2, (94 - current) * 0.15);
        if (current > 94) current = 94;
        setProgress(Math.floor(current));
      }
    }, 35);

    // Safe trigger to complete to 100%
    const completeLoader = () => {
      clearInterval(interval);
      let finishProg = current;
      const finishInterval = setInterval(() => {
        if (finishProg < 100) {
          finishProg += 4;
          if (finishProg >= 100) {
            finishProg = 100;
            clearInterval(finishInterval);
            setProgress(100);
            setTimeout(() => {
              setIsFading(true);
              setTimeout(() => {
                setIsDone(true);
                if (typeof onComplete === 'function') onComplete();
              }, 550);
            }, 120);
          } else {
            setProgress(Math.floor(finishProg));
          }
        }
      }, 15);
    };

    // Safety timeout ensures user is never blocked
    const timer = setTimeout(() => {
      completeLoader();
    }, 1200);

    const handleKey = () => completeLoader();
    window.addEventListener('keydown', handleKey, { once: true });

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      id="preloader"
      className={isFading ? 'fade-out' : ''}
      onClick={() => {
        setIsFading(true);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 300);
      }}
    >
      <div className="loader-content">
        <div className="loader-status">
          <span className="loader-status-dot"></span>
          <span>CALIBRATING DIGITAL EXPERIENCE</span>
        </div>
        <div className="loader-bar-wrap">
          <div
            className="loader-bar-fill"
            id="loader-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="loader-counter" id="loader-progress-text">
          {String(progress).padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}
