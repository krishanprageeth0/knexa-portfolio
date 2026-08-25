let sharedCtx: AudioContext | null = null;
let isMuted = false;

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('knexa_sfx_muted');
  if (stored !== null) {
    isMuted = stored === 'true';
  }
}

// Singleton audio context getter with strict gesture control
function getAudioContext(forceCreate = false) {
  if (typeof window === 'undefined') return null;
  
  if (!sharedCtx && forceCreate) {
    try {
      sharedCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Failed to create AudioContext:", e);
    }
  }
  
  return sharedCtx;
}

// Global user gesture listener to unlock and initialize audio engine instantly
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = getAudioContext(true); // Create and initialize on click/touch gesture
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
      const ctx = getAudioContext(true); // Initialize on click toggle
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    }
    return isMuted;
  },
  
  // High-pitched quick cursor sweep (Only plays if context is already running)
  playHover: async () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext(false); // Do not force create on hover
      if (!ctx || ctx.state !== 'running') return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  },
  
  // Clean cyber button tap (Force creates context under click gesture)
  playClick: async () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext(true); // Initialize context on click
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (e) {}
  },
  
  // Rising lowpass sweep representing code compilation
  playCompile: async () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext(true); // Initialize context on click
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.22);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.23);
    } catch (e) {}
  },
  
  // Multi-tone major triad chime representing build success
  playSuccess: async () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext(true); // Initialize context on click
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        
        gain.gain.setValueAtTime(0.015, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.25);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.3);
      });
    } catch (e) {}
  }
};
