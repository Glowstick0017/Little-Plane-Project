const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const customise = document.getElementById("customise");
const settings = document.getElementById("settings");
const ui = document.getElementById("ui");
const customiseMenu = document.getElementById("customiseMenu");
const settingsMenu = document.getElementById("settingsMenu");

// Event for listening to hamburger menu clicks
hamburger.addEventListener("click", () => {
  // Hamburger togler to open the nav menu
 //   Closes all UI parts.
  if (nav.style.display === "block") {
    nav.style.display = "none";
    hamburger.style.backgroundImage = "url('css/hamburger.png')"
    ui.style.display = "none";
    customiseMenu.style.display = "none";
  } else {
    nav.style.display = "block";
    hamburger.style.backgroundImage = "url('css/close.png')"
  }
});


customise.addEventListener("click", () => {
  if (customiseMenu.style.display === "block" || settingsMenu.display === "block") {
    ui.style.display = "none";
    customiseMenu.style.display = "none";
    settingsMenu.style.display = "none";
  } else {
    ui.style.display = "block";
    customiseMenu.style.display = "block";
    settingsMenu.style.display = "none";

    // Was going to render a new image of the plane.
    // But it renders too large. Left this out for now.
    // const planeAvatarImg = document.createElement("img");
    // planeAvatarImg.src = planeCanvas.toDataURL();
    // customiseMenu.appendChild(planeAvatarImg);
  }
});

settings.addEventListener("click", () => {
  if (settingsMenu.style.display === "block" || customiseMenu.display === "block") {
    ui.style.display = "none";
    settingsMenu.style.display = "none";
    customiseMenu.style.display = "none";
  } else {
    ui.style.display = "block";
    settingsMenu.style.display = "block";
    customiseMenu.style.display = "none";
  }
});

// Get all color input elements by their class name
const colorInputs = document.querySelectorAll(
  '.planeColors input[type="color"]'
);

// Add a change event listener to each color input
colorInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    const {id: partName, value: newColor} = e.target;
    plane.setColor(partName, newColor);
  });
});
