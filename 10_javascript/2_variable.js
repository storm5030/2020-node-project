// 2. 변수
// 변수 선언 (var, let)
var a = 1;
var b = 2;
console.log(a, b);
console.log("%d, %d", a, b);

var s1 = "Hello";
var s2 = "World";
// Hello, World
console.log(s1 + ', ' + s2);

console.log(typeof a);      //number
console.log(typeof s1);     //string
console.log(typeof true);   //boolean
console.log(typeof {});     //object
console.log(typeof c);      //undefined

// 변수 호이스팅 (hoisting)
function foo() {
    console.log(a);         //undefined
    var a = 10;
    console.log(a);         //10
}
foo();

// ES6(2015) : let, const 추가
// var : 함수 레벨 스코프, let : 블록 레벨 스코프
function foo2() {
    if(true) {
        let tmp = 10;
        console.log("1 : " + tmp);
    }
    //console.log("2 : " + tmp); //에러
}
foo2();

const PI = 3.14;
//PI ++ //에러