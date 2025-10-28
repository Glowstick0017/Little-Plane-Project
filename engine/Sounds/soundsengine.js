function SoundsEngine({ defaultFrequencies }) {
  let frequencies = defaultFrequencies;
  let globalVolume = 1;

  const activeOscs = [];
  const audioContext = new (
    window.AudioContext
    || window.webkitAudioContext
  )();

  // Create a low-pass filter for more realistic engine sound
  const filter = audioContext.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800; // Lower cutoff for softer sound
  filter.Q.value = 0.5; // Gentler rolloff
  filter.connect(audioContext.destination);

  // Create a master gain node
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.25; // Much quieter overall
  masterGain.connect(filter);

  function unlockAudio() {
    if (audioContext.state !== 'suspended') return;
    
    audioContext.resume();

    document.removeEventListener('touchstart', unlockAudio);
    document.removeEventListener('touchend', unlockAudio);
    document.removeEventListener('mousedown', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);

    playSounds(frequencies);
  }

  function addUnlockListener() {
    document.addEventListener('touchstart', unlockAudio, false);
    document.addEventListener('touchend', unlockAudio, false);
    document.addEventListener('mousedown', unlockAudio, false);
    document.addEventListener('keydown', unlockAudio, false);
  }

  function playSounds(frequencies) {
    stopSounds();

    frequencies.forEach(([freq, vol, waveType = 'sawtooth'], i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      // Use different wave types for richer sound
      osc.type = waveType;
      osc.frequency.value = freq;
      
      // Smooth gain changes to avoid clicks
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(vol * globalVolume, audioContext.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(masterGain);

      osc.start();
      activeOscs.push([osc, gain, waveType]);

      // Add subtle vibrato for engine roughness on low frequencies
      if (i === 0 && freq < 150) {
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        
        lfo.frequency.value = 5 + Math.random() * 3; // 5-8 Hz vibrato
        lfoGain.gain.value = freq * 0.015; // Subtle pitch variation
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        
        activeOscs.push([lfo, lfoGain, 'lfo']);
      }
    });
  }

  function setFrequencies(newFrequencies) {
    frequencies = newFrequencies;
    const currentTime = audioContext.currentTime;
    
    activeOscs.forEach(([osc, gain, waveType], i) => {
      if (waveType === 'lfo') return; // Skip LFO oscillators
      
      const freqIndex = activeOscs.slice(0, i).filter(([,, wt]) => wt !== 'lfo').length;
      const [freq, vol, newWaveType = 'sawtooth'] = frequencies[freqIndex] || [0, 0, 'sawtooth'];
      
      // Smooth frequency transitions
      osc.frequency.cancelScheduledValues(currentTime);
      osc.frequency.setValueAtTime(osc.frequency.value, currentTime);
      osc.frequency.linearRampToValueAtTime(freq, currentTime + 0.05);
      
      // Smooth volume transitions
      gain.gain.cancelScheduledValues(currentTime);
      gain.gain.setValueAtTime(gain.gain.value, currentTime);
      gain.gain.linearRampToValueAtTime(vol * globalVolume, currentTime + 0.05);
    });

    // Update filter cutoff based on frequency (higher speed = brighter sound)
    if (frequencies.length > 0) {
      const avgFreq = frequencies.reduce((sum, [f]) => sum + f, 0) / frequencies.length;
      const filterFreq = Math.min(1200, 600 + avgFreq * 1.2); // More mellow range
      filter.frequency.setValueAtTime(filter.frequency.value, currentTime);
      filter.frequency.linearRampToValueAtTime(filterFreq, currentTime + 0.1);
    }
  }

  function stopSounds() {
    const currentTime = audioContext.currentTime;
    
    while (activeOscs.length) {
      const [osc, gain] = activeOscs.pop();
      try {
        // Fade out to avoid clicks
        gain.gain.cancelScheduledValues(currentTime);
        gain.gain.setValueAtTime(gain.gain.value, currentTime);
        gain.gain.linearRampToValueAtTime(0, currentTime + 0.05);
        
        osc.stop(currentTime + 0.05);
      } catch {}
      
      setTimeout(() => {
        try { osc.disconnect(); } catch {}
        try { gain.disconnect(); } catch {}
      }, 100);
    }
  }

  function setVolume(value) {
    const currentTime = audioContext.currentTime;
    globalVolume = value;
    
    // Smooth volume transitions
    masterGain.gain.cancelScheduledValues(currentTime);
    masterGain.gain.setValueAtTime(masterGain.gain.value, currentTime);
    masterGain.gain.linearRampToValueAtTime(0.25 * globalVolume, currentTime + 0.1);
  }

  addUnlockListener();

  return {
    setVolume,
    setFrequencies,
  };
}

