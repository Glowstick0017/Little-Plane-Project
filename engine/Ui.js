class UiController {
  constructor() {
    // Binding methods to the instance for correct `this` context when called from event listeners
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleCustomizeClick = this.handleCustomizeClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.updatePlaneColor = this.updatePlaneColor.bind(this);

    this.setupEventListeners();
  }

  static getElement(el) {
    return typeof el === "string" ? document.getElementById(el) : el;
  }

  static setDisplay(state, ...elements) {
    elements.forEach((element) => {
      const el = UiController.getElement(element);
      switch (state) {
        case "toggle":
          el.style.display = el.style.display === "block" ? "none" : "block";
          break;
        case "none":
          el.style.display = "none";
          break;
        case "block":
          el.style.display = "block";
          break;
      }
    });
  }

  handleMenuToggle(menuToShow, menuToHide) {
    if (
      menuToShow.style.display === "block" ||
      menuToHide.style.display === "block"
    ) {
      UiController.setDisplay("none", $ui, menuToShow, menuToHide);
    } else {
      UiController.setDisplay("block", $ui, menuToShow);
      UiController.setDisplay("none", menuToHide);
    }
  }

  handleCustomizeClick() {
    this.handleMenuToggle($customizeMenu, $settingsMenu);
  }

  handleSettingsClick() {
    this.handleMenuToggle($settingsMenu, $customizeMenu);
  }

  handleHamburgerClick() {
    if ($welcome.style.display === "block") {
        constantFlight = true;
        UiController.setDisplay("none", $welcome, $ui);
    }
    UiController.setDisplay("toggle", $nav);

    if ($nav.style.display === "block")
      $hamburger.style.backgroundImage = "url('css/close.png')";
    else {
      $hamburger.style.backgroundImage = "url('css/hamburger.png')";
      UiController.setDisplay("none", $ui, $customizeMenu, $settingsMenu);
    }
  }

  updatePlaneColor(e) {
    const { id: partName, value: newColor } = e.target;
    // save colors set in local storage
    const littlePlaneColorsAlready = localStorage.getItem("littlePlaneColors");
    localStorage.setItem(
      "littlePlaneColors",
      littlePlaneColorsAlready + "," + partName + ":" + newColor
    );
    plane.setColor(partName, newColor);
  }

  setupEventListeners() {
    $hamburger.addEventListener("click", this.handleHamburgerClick);
    $customize.addEventListener("click", this.handleCustomizeClick);
    $settings.addEventListener("click", this.handleSettingsClick);
    $start.addEventListener("click", () => {
        UiController.setDisplay("none", $welcome, $ui);
        constantFlight = true;
        pause = false;
    });
    $planeColors.forEach((input) => {
      input.addEventListener("change", this.updatePlaneColor);
    });
    $resetDefault.addEventListener("click", () => {
      localStorage.removeItem("littlePlaneColors");
      plane.resetDefaults();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if ($welcome.style.display === "block") {
          pause = false;
          constantFlight = true;
        }
        UiController.setDisplay("none", $ui, $customizeMenu, $settingsMenu, $welcome);
      }
    });
  }
}

// Initialize the class to set up event listeners and other functionalities
const uiController = new UiController();
