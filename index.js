const fs = require("fs");
const http = require("http");
const url = require("url");
const replacingCard = require(`${__dirname}/modules/replacingCard.js`);

// Syncronous (blocking)

// const wish = fs.readFileSync("./txt/wish.txt", "utf-8");

// console.log(wish);

// fs.writeFileSync("./txt/languages.txt", "html, css, js, ts"); // create file

// const langs = fs.readFileSync("./txt/languages.txt", "utf-8");

// console.log(langs);

// // Asyncronous - Non-blocking
// // callback hell
// fs.readFile("./txt/startt.txt", "utf-8", (err, data) => {
//   if (err) return console.log("ERROR!");

//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data_1) => {
//     console.log(data_1);
//     fs.writeFile("./txt/final.txt", data_1, (err) => {
//       console.log("Final file has been written!");
//     });
//   });
// });

// console.log("will read file");

////////////////////////////////////
// SERVER

// pages
const overView = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");
// data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const farm = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // overView
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cards = farm.map((ele) => replacingCard(card, ele)).join("");
    const output = overView.replace(/{%CARDS%}/g, cards);

    res.end(output);
    // product
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    let output = replacingCard(product, farm[query.id]);
    res.end(output);
    // api
  } else if (pathname === "/api") {
    res.end(farm);
    // error page
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>page not found !</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
