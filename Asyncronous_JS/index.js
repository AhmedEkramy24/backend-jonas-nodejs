const fs = require("fs");
const superagent = require("superagent");
const server = require("http").createServer();

let dogImg;

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);
//       dogImg = res.body.message;
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         console.log("Random dog image saved to file!");
//       });
//     });
// });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       dogImg = res.body.message;
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         console.log("Random dog image saved to file!");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// server.on("request", (req, res) => {
//   res.end(`<br><img src="${dogImg}">`);
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Server listening on port 8000...");
// });

function readFilePro(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 😢");
      resolve(data);
    });
  });
}

readFilePro(`${__dirname}/dog.txt`).then((data) => {
  console.log(`Breed: ${data}`);
});
