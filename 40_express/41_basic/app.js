const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();
const port = 3000;

// 바디파서 설정
// true: qs(확장모듈), false: querystring(기본모듈)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 정적 파일 위치 설정
// localhost:3000/music.html
app.use(express.static("public"));
// localhost:3000/static/music.html
// app.use("/static", express.static("public"));

app.use(logger("dev")); // tiny < dev < short < common < combined

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// /hello?name=홍길동 -> 안녕하세요, 홍길동님
// Query Stirng 방식
app.get("/hello", (req, res) => {
  console.log(req);
  //const name = req.query.name;
  // ES6 추가 문법 (객체 구조 분해 할당)
  const { name } = req.query; // { name : 홍길동 }
  res.send(`<h1>안녕하세요, ${name}님<h1>`);
});

// /music?singer=아이유&title=좋은날
// 아이유의 좋은날입니다.
app.get("/music", (req, res) => {
  const { singer, title } = req.query;
  res.send(`<h1>${singer}의 ${title}입니다.<h1>`);
});

// URL 파라메터 (REST API)
// 127.0.0.1:3000/music/아이유/좋은날
app.get("/music/:singer/:title", (req, res) => {
  const { singer, title } = req.params;
  res.send(`url parameter(get): ${singer}의 ${title}입니다.`);
});

// POST방식
// 1. form 전송 -> data를 꺼내는 방법
// 2. URL 파라메터 -> req.params
// 3. HTTP Message = Header + Body
// GET 방식 : 데이터를 URLdp ? 뒤의 Query String을 통해 데이터 전송
//            Header부에 데이터 전송, 길이 제한 있음, 캐싱이 됨
// POST 방식 : 데이터를 Body부에 전송, 길이 제한 없음, 캐싱이 안됨
// company.com/apply?id=10001 (해킹사고)
// 한글 : URL 인코딩 -> 디코딩
// form으로 데이터 전송 시 content-type : x-www-form-urlencoded
app.post("/music", (req, res) => {
  const { singer, title } = req.body;
  res.send(`urlencoded(post) -> ${singer}의 ${title}입니다.`);
});

// URL 파라메터 전송 (RESTFul API)
// localhost:3000/music/아이유/좋은날
app.post("/music/:singer/:title", (req, res) => {
  const { singer, title } = req.param;
  res.send(`url parameter(post) -> ${singer}의 ${title}입니다.`);
});

// PUT : localhost:3000/music/{id}
// { singer: "아이유", title: "에잇" }
// 결과 : {id} -> 아이유의 에잇으로 수정됨
app.put("/music/:id", (req, res) => {
  const { id } = req.params;
  const { singer, title } = req.body;
  res.send(`${id} -> ${singer}의 ${title}으로 수정됨`);
});

// 여기까지 내려왔다는 것은 위에서 처리가 되지 않은 것
app.use((req, res, next) => {
  const error = new Error("없는 페이지입니다.");
  error.code = 404; // 404 : Not Found
  next(error);
  // throw new Error("없는 페이지입니다.");
});

// 오류처리 미들웨어
app.use((err, req, res, next) => {
  // if (err.code) res.status(err.code);
  // else res.status(500);
  res.status(err.code || 500);
  // if (err.message) res.send(err.message);
  // else res.send("Internal Server Error");
  res.send(err.message || "Internal Server Error");
});

// RESTFul API
// 1. HTTP 요청 : 모든 자원은 명사로 작성
// 예) GET /users, GET /users/{id}
// test.com/users [GET] : 사용자 목록 조회, /users/{id} 상세조회
// test.con/users [POST] : 사용자 생성
// test.con/users/{id} [PUT] : 사용자 변경
// test.con/users/{id} [DELETE] : 사용자 삭제

// (bad case)
// test.com/users/create
// test.com/users/speach
// test.com/users/update
// test.com/users/delete
