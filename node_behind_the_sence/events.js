const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("there is new sale");
});

myEmitter.on("newSale", () => {
  console.log("custumer name is : ahmed ekramy");
});

myEmitter.on("newSale", (num) => {
  console.log(`we have ${num} sales`);
});

myEmitter.emit("newSale", 9);

////////////////
/// server listener

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("first request event");
  if (req.url === "/close") {
    server.close();
    res.end("close server");
  } else {
    res.end("requisted successfuly");
  }
});

server.on("request", (req, res) => {
  console.log("secont request event");
});

server.on("close", () => {
  console.log("server closed.");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for requistes.....");
});
