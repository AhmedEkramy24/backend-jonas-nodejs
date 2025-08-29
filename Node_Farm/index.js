const http = require("http");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "overview") {
    res.end(overview);
  } else if (pathName === "/product") {
    res.end("this is product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "our-own-header": "ahmed ek with jonas",
    });
    res.end("<h1>error not found page</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening on port 8000");
});
