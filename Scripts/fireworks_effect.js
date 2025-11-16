;(function () {
  function createParticlesAt(x, y) {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const angle = Math.random() * 2 * Math.PI;
      const distance = 40 + Math.random() * 60;
      const dx = Math.cos(angle) * distance + "px";
      const dy = Math.sin(angle) * distance + "px";
      particle.style.setProperty("--x", dx);
      particle.style.setProperty("--y", dy);

      const hue = Math.floor(Math.random() * 360);
      const saturation = 65 + Math.random() * 15;
      const lightness = 82 + Math.random() * 8;
      particle.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      particle.style.animationDuration = (0.7 + Math.random() * 0.5) + "s";

      particle.style.left = x + "px";
      particle.style.top = y + "px";

      document.body.appendChild(particle);

      particle.addEventListener("animationend", () => particle.remove());
    }
  }

  function getEventClientCoords(e) {
    if (typeof e.clientX === 'number' && typeof e.clientY === 'number') {
      return { x: e.clientX, y: e.clientY };
    }
    // touch events fallback
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: 0, y: 0 };
  }

  function handler(e) {
    // prevent duplicate handling when multiple listeners see the same event
    if (e._fireworksHandled) return;
    e._fireworksHandled = true;

    const { x, y } = getEventClientCoords(e);
    createParticlesAt(x, y);
  }

  // Attach in capture phase to ensure we catch clicks even if elements stop propagation
  window.addEventListener("click", handler, { capture: true });
  document.addEventListener("click", handler, { capture: true });
  // also listen for pointerdown for some elements/browsers that may behave differently
  window.addEventListener("pointerdown", handler, { capture: true });
})();