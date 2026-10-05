import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create luxury gold particles
    const particleCount = Math.min(Math.floor(width / 25), 55);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1, // Float upward slowly
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      goldShade: Math.random() > 0.4 ? '#D4AF37' : Math.random() > 0.5 ? '#F5D77D' : '#E6CA65'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Fade in / fade out opacity loop
        p.opacity += p.fadeSpeed;
        if (p.opacity >= 0.8 || p.opacity <= 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Reset if off top or sides
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing gold particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.goldShade;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.goldShade;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-[#996515]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '16s' }} />
      
      {/* Dynamic Gold Dust Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full opacity-70" />
    </div>
  );
}
