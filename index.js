const fs = require("fs");
const http = require("http");
const url = require("url");

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

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/overview" || pathName === "/") {
    res.end("this is overview");
  } else if (pathName === "/product") {
    res.end("this is product");
  } else if (pathName === "/api") {
    fs.readFile("./dev-data/data.json", "utf-8", (err, data) => {
      const farm = JSON.parse(data);
      console.log(farm);
      res.end("API");
    });
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
