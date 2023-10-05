/**
 * Represents a single Command.
 */
class Command {
  /**
   * Creates a new Command instance.
   * @param {string | string[]} name - Name of the command (case insensitive).
   * @param {string} description - Description or syntax of the command.
   * @param {number} expectedInputs - Expected number of arguments for the command.
   * @param {Function} executeFunction - Function to execute the command.
   */
  constructor(name, description, expectedInputs, executeFunction) {
    if (Array.isArray(name)) {
      this.aliases = name.map((n) => n.toUpperCase());
    } else {
      this.aliases = [name.toUpperCase()];
    }
    this.description = description;
    this.expectedInputs = expectedInputs;
    this.execute = executeFunction;
  }

  /**
   * Executes the command.
   * @param {string[]} args - Arguments passed to the command.
   * @param {CommandHandler} context - CommandHandler instance.
   * @return {string} Feedback or result message after executing the command.
   */
  run(args, context) {
    if (args.length !== this.expectedInputs) {
      return `Invalid syntax for ${this.name}. Expected: ${this.description}`;
    }
    return this.execute(args, context);
  }
}

/**
 * Represents a Command Handler that manages and executes commands.
 */
class CommandHandler {
  /**
   * Creates a new CommandHandler instance and sets up event listeners.
   */
  constructor() {
    this.commands = new Map();
    this.isFocused = false;
    this.setupEventListeners();
  }

  /**
   * Registers a new command.
   * @param {Command} command - Command instance to register.
   */
  register(command) {
    if (command instanceof Command) {
      command.aliases.forEach((alias) => {
        this.commands.set(alias, command);
      });
    } else {
      alert(`Invalid command type ${command}. Expected Command instance.`);
    }
  }

  /**
   * Executes a command based on input string.
   * @param {string} commandString - Input string containing command name and arguments.
   * @return {string} Feedback or result message after attempting to execute the command.
   */
  execute(commandString) {
    const [name, ...args] = commandString.split(" ");
    const command = this.commands.get(name.toUpperCase());
    if (command) {
      return command.run(args, this);
    }
    return `Invalid command.
Available commands: ${Array.from(this.commands.keys()).join(", ")}`;
  }

  /**
   * Checks if the command box is focused.
   * @return {boolean} True if command box is focused, false otherwise.
   */
  isCommandBoxFocused() {
    return this.isFocused;
  }

  /**
   * Sets up event listeners for command box interactions.
   */
  setupEventListeners() {
    document.addEventListener("keydown", this.handleGlobalKeyDown.bind(this));

    $commandBox.addEventListener(
      "keyup",
      this.handleCommandBoxKeyUp.bind(this),
    );
    $commandBox.addEventListener("blur", this.handleCommandBoxBlur.bind(this));
  }

  handleGlobalKeyDown(e) {
    if (e.key === "Enter" && !this.isCommandBoxFocused()) {
      this.isFocused = true;
      $commandBox.focus();
    }
  }

  handleCommandBoxKeyUp(e) {
    if (
      e.key === "Enter" &&
      this.isCommandBoxFocused() &&
      e.target.value !== ""
    ) {
      const resultMessage = this.execute(e.target.value);
      this.displayFeedback(resultMessage);

      e.target.blur();
      e.target.value = "";
    } else if (e.key === "Esc" || e.key === "Escape") {
      e.target.blur();
      e.target.value = "";
    }
  }

  handleCommandBoxBlur() {
    this.isFocused = false;
  }

  /**
   * Displays feedback to user after command execution and fades it out.
   * @param {string} message - Message to display as feedback.
   */
  displayFeedback(message) {
    $result.style.width = `${Math.max(
      300,
      ...message.split("\n").map((line) => line.length * 10),
    )}px`;

    $result.value = message;

    $result.style.opacity = 1;
    $result.style.height = "25px";
    $result.style.height = $result.scrollHeight + "px";

    // Determine fade duration based on message length
    let baseFadeDuration = 5000; // 5 seconds for short message
    let additionalFadeTimePerCharacter = 25; // Additional milliseconds for every character
    let totalFadeDuration =
      baseFadeDuration + message.length * additionalFadeTimePerCharacter;

    // Determine interval and opacity decrement rate
    let intervalDuration = 500; // Interval at which opacity is decreased
    let decrementRate = intervalDuration / totalFadeDuration; // Amount to decrease opacity in each interval

    let fadeEffect = setInterval(function () {
      if (!$result.style.opacity) {
        $result.style.opacity = 1;
      }
      if ($result.style.opacity > 0) {
        $result.style.opacity -= decrementRate;
      } else {
        clearInterval(fadeEffect);
      }
    }, intervalDuration);
  }
}
