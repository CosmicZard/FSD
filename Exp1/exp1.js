const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

emitter.on("exit", () => {
    console.log("Exit event triggered.");
});

emitter.emit("greet", "Roshan");
emitter.emit("exit");