// Propeller-like sound - softer and more rhythmic
// Format: [frequency, volume, waveType]
const planeSound = [
  [40.0, 0.20, 'sine'],        // Deep thump of blades
  [80.0, 0.12, 'triangle'],    // Softer first harmonic
  [120.0, 0.06, 'triangle'],   // Gentle second harmonic
  [200.0, 0.04, 'sine'],       // Subtle upper harmonic
  [280.0, 0.02, 'sine'],       // Very soft high frequency
];

const soundsEngine = SoundsEngine({
  defaultFrequencies: planeSound
});

$speakerphone.addEventListener("click", () => {
  $speakerphone.classList.toggle("muted");
  if ($speakerphone.classList.contains("muted")) {
    soundsEngine.setVolume(0);
  } else {
    soundsEngine.setVolume(1);
  }
});

