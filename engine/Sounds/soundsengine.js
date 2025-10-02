function SoundsEngine({ defaultFrequencies }) {
  let frequencies = defaultFrequencies;
  let globalVolume = 1;

  const activeOscs = [];
  const audioContext = new (
    window.AudioContext
    || window.webkitAudioContext
  )();

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

    frequencies.forEach(([freq, vol]) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.value = vol;
      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      activeOscs.push([osc, gain]);
    });
  }

  function setFrequencies(newFrequencies) {
    frequencies = newFrequencies;
    activeOscs.forEach(([osc, gain], i) => {
      const [freq, vol] = frequencies[i] || [0, 0];
      
      osc.frequency.value = freq;
      gain.gain.value = vol * globalVolume;
    });
  }

  function stopSounds() {
    while (activeOscs.length) {
      const osc = activeOscs.pop();
      try { osc.stop(); } catch {}
      osc.disconnect();
    }
  }

  function setVolume(value) {
    globalVolume = value;
    setFrequencies(frequencies);
  }

  addUnlockListener();

  return {
    setVolume,
    setFrequencies,
  };
}

