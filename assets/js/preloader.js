(function() {
      let progress = 0;
      const bar = document.getElementById('loader-progress-bar');
      const text = document.getElementById('loader-progress-text');
      const preloader = document.getElementById('preloader');
      let isDone = false;

      function updateUI(val) {
        if (bar) bar.style.width = val + '%';
        if (text) text.textContent = String(Math.floor(val)).padStart(3, '0') + '%';
      }

      // Smoothly advance from 000% upwards immediately
      const timer = setInterval(() => {
        if (isDone) {
          clearInterval(timer);
          return;
        }
        if (progress < 92) {
          progress += Math.max(1.8, (92 - progress) * 0.14);
          if (progress > 92) progress = 92;
          updateUI(progress);
        }
      }, 35);

      window.__dismissPreloader = function(onDoneCallback) {
        if (isDone) return;
        isDone = true;
        clearInterval(timer);
        // Complete remaining percentage up to 100%
        let endProg = progress;
        const finishTimer = setInterval(() => {
          if (endProg < 100) {
            endProg += 4;
            if (endProg >= 100) {
              endProg = 100;
              clearInterval(finishTimer);
              updateUI(100);
              setTimeout(() => {
                if (preloader) {
                  preloader.classList.add('fade-out');
                  setTimeout(() => {
                    preloader.style.display = 'none';
                    if (typeof onDoneCallback === 'function') onDoneCallback();
                    if (window.__triggerReveals) window.__triggerReveals();
                  }, 550);
                }
              }, 140);
            } else {
              updateUI(endProg);
            }
          }
        }, 15);
      };

      // Guaranteed safety timeout (1.5s max) so user is NEVER blocked
      setTimeout(() => {
        window.__dismissPreloader();
      }, 1500);

      // Tap / click anywhere on preloader or any key to dismiss instantly
      if (preloader) {
        preloader.addEventListener('click', () => window.__dismissPreloader());
      }
      window.addEventListener('keydown', () => window.__dismissPreloader(), { once: true });
    })();