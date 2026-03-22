var dom = (elemId) => document.getElementById(elemId);

const planeInstance = new Plane();
const planeDom = {
  canvas: dom("planeCanvas"),
  colors: {
    outer: dom(outer),
    innerMain: dom(innerMain),
    innerHighlight: dom(innerHighlight),
    innerDarkHighlight: dom(innerDarkHighlight),
    aroundWindshield: dom(aroundWindshield),
    windshield: dom(windshield),
    propeller: dom(propeller),
    propellerBlades: dom(propellerBlades),
  },
};

planeInstance.setDom(planeDom);
planeInstance.initGraphics();

const plane = planeInstance.graphics;
const planeManager = new PlaneManager();

planeManager.planes["self"] = planeInstance;
planeManager.draw();

