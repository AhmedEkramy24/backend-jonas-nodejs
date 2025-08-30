const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
const slugify = require("slugify");

console.log(slugify("Fresh Avocado", { lower: true }));

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
const manualy = dataObj.map((el) => el.productName.toLowerCase().split(" ").join("-"));
console.log(manualy);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "overview") {
    const output = dataObj.map((el) => replaceTemplate(card, el)).join("");
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const finalOutput = overview.replace("{%cards%}", output);
    res.end(finalOutput);
  } else if (pathname === "/product") {
    res.end(replaceTemplate(product, dataObj[query.id]));
  } else if (pathname === "/api") {
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
