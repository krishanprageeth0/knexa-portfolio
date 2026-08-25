let sharedCtx: AudioContext | null = null;
let isMuted = false;

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('knexa_sfx_muted');
  if (stored !== null) {
    isMuted = stored === 'true';
  }
}

// Singleton audio context getter
function getAudioContext() {
  if (typeof window === 'undefined') return null;
  
  if (!sharedCtx) {
    sharedCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  return sharedCtx;
}

// Global user gesture listener to unlock audio engine instantly on click/touch
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
}

export const sfx = {
  getMuted: () => isMuted,
  setMuted: (val: boolean) => {
    isMuted = val;
    localStorage.setItem('knexa_sfx_muted', String(val));
    if (!val) {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    }
    return isMuted;
  },
  
  // High-pitched quick cursor sweep
  playHover: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  },
  
  // Clean cyber button tap
  playClick: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.06);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (e) {}
  },
  
  // Rising lowpass sweep representing code compilation
  playCompile: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.22);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.22);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.23);
    } catch (e) {}
  },
  
  // Multi-tone major triad chime representing build success
  playSuccess: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        
        gain.gain.setValueAtTime(0.02, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0, now + idx * 0.05 + 0.25);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.3);
      });
    } catch (e) {}
  }
};
