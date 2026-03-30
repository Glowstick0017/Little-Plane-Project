class MultiplayerHandler {
  constructor () {
    this.socket = null;
    this.actions = {};
    this.events = MP_EVENTS;
    this.callbacks = {};
    this.stateEvents = [
      "mousedown", "mousepress", "mouseup",
      "keydown", "keypress", "keyup",
    ];
  }

  connect(socket) {
    this.socket = socket;

    for (let key in MP_ACTIONS) {
      const action = MP_ACTIONS[key];
      
      this.actions[key] = (...args) => {
        action(socket, ...args);
      };
    }

    for (let key in MP_EVENTS) {
      const event = MP_EVENTS[key];
      const callbacks = this.callbacks[key] || [];

      this.events[key] = (...args) => {
        event(...args, callbacks);
      };
    }

    this.registerDefaultCallbacks();
    this.registerWindowEvents();
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
    this.actions = {};
    this.events = {};
    this.callbacks = {};
    this.unregisterWindowEvents();
    this.disconnectCleanup();
  }

  registerDefaultCallbacks() {
    this.callbacks = {
      joinRoom: [ () => this.actions.sendPlaneState() ],
    };
  }

  listenState() {
    if (!this.socket) return;
    this.actions.sendPlaneState();
  }

  registerWindowEvents() {
    this.stateEvents.forEach(
      (eventType) => window.addEventListener(
        eventType,
        this.listenState.bind(this)
      )
    );
  }

  unregisterWindowEvents() {
    this.stateEvents.forEach(
      (eventType) => window.removeEventListener(
        eventType,
        this.listenState.bind(this)
      )
    );
  }

  disconnectCleanup() {
    const mpPlaneCanvases = document.querySelectorAll(".mpPlaneCanvas");
    mpPlaneCanvases.forEach(canvas => canvas.remove());
  }
}

