const http = require("http");
const path = require("path");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  // 127.0.0.1/dog.jpg
  console.log(req.url);
  const parsed = path.parse(req.url);
  console.log(parsed);
  const filename = parsed.base; // cat.jpg
  // C:\NodeProject\20_nodejs\images\cat.jpg
  // const imagefile = __dirname + path.sep + "images" + path.sep + filename;
  const imageFile = `${__dirname}${path.sep}images${path.sep}${filename}`;

  fs.readFile(imageFile, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }
    // text/pain, text/html, application/json, image/jpeg
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
