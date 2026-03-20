function hslaTimeAuto(relTime) {
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpHue(a, b, t) {
    let d = (b - a) % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return (a + d * t + 360) % 360;
  }
  
  function mix(a, b, t) {
    return {
      h: lerpHue(a.h, b.h, t),
      s: lerp(a.s, b.s, t),
      l: lerp(a.l, b.l, t),
      a: lerp(a.a, b.a, t),
    };
  }
  
  function toHSLA(c) {
    return [c.h, c.s, c.l, c.a];
  }

  const createHueFn = (startTime, endTime, colors1, colors2) => {
    const duration = endTime - startTime;
    const mixFn = time => toHSLA(mix(colors1, colors2, time));
    return time => mixFn((time - startTime) / duration);
  };

  const transition = 0.1;
  const colors = [
    { h: 35,  s: 70, l: 60, a: 0.3, duration: 0.3 },
    { h: 50,  s: 25, l: 85, a: 0.0, duration: 0.7 },
    { h: 20,  s: 75, l: 45, a: 0.18, duration: 0.3 },
    { h: 230, s: 60, l: 18, a: 0.38, duration: 0.7 },
  ];

  const mixes = [];
  let timeSoFar = 0;

  for (let i = 0; i < colors.length; i++) {
    const curr_color = colors[i];
    const next_color = colors[(i + 1) % colors.length];

    const hf1 = createHueFn(
      timeSoFar,
      timeSoFar + curr_color.duration - transition,
      curr_color,
      curr_color,
    );
    
    timeSoFar += curr_color.duration - transition;
    mixes.push([timeSoFar, hf1]);
    
    const hf2 = createHueFn(
      timeSoFar,
      timeSoFar + transition,
      curr_color,
      next_color,
    );
    
    timeSoFar += transition;
    mixes.push([timeSoFar, hf2]);
  }
  
  const normTime = ((relTime % 2) + 2) % 2;
  for (const mx of mixes)
    if (normTime <= mx[0]) return mx[1](normTime);

  return [0, 0, 0, 0];
}

function TimeCycle() {
  const canvas = ELEMENTS.TIME_CYCLE.canvas;
  
  let active = false;
  let timestamp = 0;
  let lastTs = 0;
  let frame = null;
  
  const DAYLEN_MS = 900000;

  function pauseCycle() {
    active = false;
    frame && cancelAnimationFrame(frame);
  }

  function continueCycle() {
    active = true;
    lastTs = new Date();
    updateCycle();
  }

  function setTime(newTimestamp) {
    timestamp = newTimestamp;
  }
  
  function updateCycle() {
    const now = new Date();
    timestamp += now - lastTs;
    lastTs = now;

    const relTime = (timestamp % DAYLEN_MS * 2) / DAYLEN_MS;
    const [ h, s, l, a ] = hslaTimeAuto(relTime);

    canvas.style.background = `hsl(${h}deg ${s}% ${l}%)`;
    canvas.style.opacity = `${a}`;

    if (active)
      frame = requestAnimationFrame(
        updateCycle
      );
  }

  function startTimeCycle() {
    setTime(120000);
    continueCycle();
  }

  return {
    setTime,
    pauseCycle,
    continueCycle,
    startTimeCycle,
  };
}

