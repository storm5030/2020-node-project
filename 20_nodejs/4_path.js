// 4. 기본모듈
// path : 파일의 경로를 다루는 모듈
const path = require("path");

console.log(__dirname);
console.log(__filename);

// string -> object
const parsed = path.parse(__filename); //C:\NodeProjects\20_nodejs\4_path.js
console.log(parsed);

console.log(parsed.dir);
console.log(parsed.base);
