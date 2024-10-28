// Seed command - spawns the player into the starting position of a new world.
const seedCommand = new Command("SEED", "SEED <seed_value>", 1, (args) => {
  const newSeed = args[0];
  seed(HashToNumber(SHA256(newSeed)));
  posX = posY = 0;
  $result.value = "seed set to `" + newSeed + "`";
  $seed.innerHTML = "Seed: " + newSeed;
  draw();
  return "seed set to `" + newSeed + "`";
});

// Speed command - adjusts the speed of movement.
const speedCommand = new Command("SPEED", "SPEED <value>", 1, (args) => {
  const speedVal = Number(args[0]);
  if (isNaN(speedVal) || !Number.isInteger(speedVal)) {
    return "Invalid syntax `speed <speed>`";
  } else if (speedVal > 20 || speedVal < 0) {
    return "Invalid input. Range 0-20";
  } else {
    speed = speedVal;
    speedometerUpdate();
    return "New speed set to " + speedVal;
  }
});

// Throttle power command - adjusts the how fast speed changes
const throttlePowerCommand = new Command("POWER", "POWER <value>", 1, (args) => {
  const throttlePowerVal = Number(args[0]);
  if (isNaN(throttlePowerVal) || !Number.isInteger(throttlePowerVal)) {
    return "Invalid syntax `POWER <POWER>`";
  } else if (throttlePowerVal > 20 || throttlePowerVal < 0) {
    return "Invalid input. Range 0-20";
  } else {
    throttlePower = throttlePowerVal;
    return "New throttle power set to " + throttlePowerVal;
  }
});

// Max speed command - adjusts the maximum speed of movement.
const maxSpeedCommand = new Command("MAXSPEED", "MAXSPEED <value>", 1, (args) => {
  const maxSpeedVal = Number(args[0]);
  if (isNaN(maxSpeedVal) || !Number.isInteger(maxSpeedVal)) {
    return "Invalid syntax `POWER <POWER>`";
  } else if (maxSpeedVal > 20 || maxSpeedVal < 0) {
    return "Invalid input. Range 0-20";
  } else if (maxSpeedVal < minSpeed) {
    return "Invalid input. Max speed cannot be less than min speed";
  } else {
    maxSpeed = maxSpeedVal;
    speedometerUpdate();
    return "New max speed set to " + maxSpeedVal;
  }
});

// Min speed command - adjusts the minimum speed of movement.
const minSpeedCommand = new Command("MINSPEED", "MINSPEED <value>", 1, (args) => {
  const minSpeedVal = Number(args[0]);
  if (isNaN(minSpeedVal) || !Number.isInteger(minSpeedVal)) {
    return "Invalid syntax `POWER <POWER>`";
  } else if (minSpeedVal > 20 || minSpeedVal < 0) {
    return "Invalid input. Range 0-20";
  } else if (minSpeedVal > maxSpeed) {
    return "Invalid input. Min speed cannot be greater than max speed";
  } else {
    minSpeed = minSpeedVal;
    speedometerUpdate();
    return "New min speed set to " + minSpeedVal;
  }
});

// Quality command - adjusts the quality of the world.
const qualityCommand = new Command("QUALITY", "QUALITY <value>", 1, (args) => {
  const qualVal = Number(args[0]);
  if (isNaN(qualVal) || !Number.isInteger(qualVal)) {
    return "Invalid syntax `quality <quality>`";
  } else if (qualVal > 20 || qualVal < 5) {
    return "Invalid input. Range 5-20";
  } else {
    quality = qualVal;
    draw();
    $quality.innerHTML = "Quality: " + quality + "px";
    return "Quality set to " + qualVal;
  }
});

// Teleport command - teleports the player to specific coordinates in the current world.
const teleportCommand = new Command(
  ["TELEPORT", "TP"],
  "TELEPORT <x> <y> or TP <x> <y>",
  2,
  (args) => {
    const x = Number(args[0]);
    const y = Number(args[1]);
    if (isNaN(x) || !Number.isInteger(x) || isNaN(y) || !Number.isInteger(y)) {
      return "Invalid syntax `teleport <x> <y>`";
    } else {
      posX = x * 10;
      posY = -1 * y * 10;
      draw();
      $coordinates.innerHTML =
        "Coordinates: X=" + posX / 10 + ", Y=" + (posY / 10) * -1;
      return "Teleported to " + x + " " + y;
    }
  },
);

// Color command - toggles the color setting.
const colorCommand = new Command("COLOR", "COLOR", 0, (args) => {
  if (color === 0) {
    color = 1;
    $color.innerHTML = "Color: " + color;
    draw();
    return "Color on.";
  } else {
    color = 0;
    $color.innerHTML = "Color: " + color;
    draw();
    return "Color off.";
  }
});

const helpCommand = new Command(
  "HELP",
  "list all commands and their usage",
  0,
  (args, context) => {
    let helpMessages = [];
    context.commands.forEach((cmd) => {
      helpMessages.push(`${cmd.aliases.join(", ")}: ${cmd.description}`);
    });
    // remove duplicates
    helpMessages = [...new Set(helpMessages)];

    return helpMessages.join("\n");
  },
);

// Instantiate a new CommandHandler and register the commands.
const handler = new CommandHandler();
handler.register(seedCommand);
handler.register(speedCommand);
handler.register(throttlePowerCommand);
handler.register(maxSpeedCommand);
handler.register(minSpeedCommand);
handler.register(qualityCommand);
handler.register(teleportCommand);
handler.register(colorCommand);
handler.register(helpCommand);
