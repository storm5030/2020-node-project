// 기본모듈 - url (URL을 처리하는 모듈)
const http = require("http");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  // stirng -> object
  const parsed = url.parse(req.url, true);
  // ?key=value -> QueryString
  const year = parsed.query.year;
  const cls = parsed.query.class;
  const name = parsed.query.name;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  // 3학년 3반 강동륜입니다
  res.end(`${year}학년 ${cls}반 ${name}입니다. Hello!!!`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
