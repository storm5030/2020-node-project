// 5. 객체
// 객체 선언
let a = {};     // 배열 : [], 객체 : {}
let b = new Object();
console.log(typeof a);  //object

// object = 데이터(property) + 기능(method)
// key: value
let Person = {
    age: 19,
    name: "강동륜",
    print() {
        console.log("%d살 %s입니다", this.age, this.name);
    }
};

// object.속성명, object["속성명"]
console.log("%d살 %s입니다", Person.age, Person.name);
console.log("%d살 %s입니다", Person["age"], Person["name"]);
Person.print();

// Friends 배열
// 두개의 객체 (no, name)
// Friends 배열 출력\
let Friends = [
    {
        no: "3301",
        name: "강동륜"
    },
    {
        no: "3302",
        name: "강우석"
    }
];
console.log(Friends);
console.log(Friends[1]["name"]);

let score = {
    data: {
        kor: 100, mat: 90, eng: 95
    },
    print() {
        for(subject in this.data){
            console.log(subject + ": " + this.data[subject]);
        }
    },
    //총점, 평균
    sum() {
        let obj = this.data;
        return obj.kor + obj.mat + obj.eng;
    },
    avg() {
        let count = Object.keys(this.data).length;
        return this.sum()/count;
    }
}

score.print();
console.log(score.sum());
console.log(score.avg());

// ES6
let id = 1;
let name = "홍길동";
let obj = {
    id,
    name
};
console.log("%d, %s", obj.id, obj.name);