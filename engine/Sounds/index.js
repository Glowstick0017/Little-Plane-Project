const planeSound = [
  [90.0, 0.15],
  [100.0, 0.10],
  [110.0, 0.05],
  [220.0, 0.04],
  [340.0, 0.03],
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

