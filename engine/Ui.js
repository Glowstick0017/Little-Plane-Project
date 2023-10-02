const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const customise = document.getElementById("customise");
const ui = document.getElementById("ui");
const customiseMenu = document.getElementById("customiseMenu");

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
  if (customiseMenu.style.display === "block") {
    ui.style.display = "none";
    customiseMenu.style.display = "none";
  } else {
    ui.style.display = "block";
    customiseMenu.style.display = "block";

    // Was going to render a new image of the plane.
    // But it renders too large. Left this out for now.
    // const planeAvatarImg = document.createElement("img");
    // planeAvatarImg.src = planeCanvas.toDataURL();
    // customiseMenu.appendChild(planeAvatarImg);
  }
});

// Get all color input elements by their class name
const colorInputs = document.querySelectorAll(
  '.planeColors input[type="color"]'
);

// Add a change event listener to each color input
colorInputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    const target = e.target;
    planeColors[target.id] = target.value;
    drawPlane();
  });
});
