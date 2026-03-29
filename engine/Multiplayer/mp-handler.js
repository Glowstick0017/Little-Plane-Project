class MultiplayerHandler {
  constructor () {
    this.socket = null;
    this.actions = {};
    this.events = MP_EVENTS;
    this.callbacks = {};
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
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
    this.actions = {};
    this.events = {};
    this.callbacks = {};
  }

  registerDefaultCallbacks() {
    this.callbacks = {
      joinRoom: [ () => this.actions.sendPlaneState() ],
    };
  }
}

