// 3. 배열
// 배열 선언 (var, let)
let arr = [1, 2, 3, 4, 5]; //배열 : [], 객체 : {}
console.log(arr.length); //5
console.log(arr[2]); //3

let arr2 = [1, 2, "apple", "banana"];
console.log(arr2[arr2.length - 1]);

// 반복문
for (i = 0; i < arr2.length; i++) {
  console.log(arr2[i]);
}

// for-in
for (i in arr2) {
  console.log(i); //index
}

// for-if (ES6)
for (i of arr2) {
  console.log(i);
}

// splice : index, howmany(삭제), elements...(추가)
let a = ["a", "b", "c"];
// a, d, b, c
a.splice(1, 0, "d");
console.log(a);

//a, x, y, b, c
a.splice(1, 1, "x", "y");
console.log(a);

let b = [1, 2, 3, 4, 5];
console.log(b.slice(0, 3)); // [1, 2, 3]

const result = b.find((item) => item >= 3); // 3 => vlaue를 리턴
console.log(result);

const result2 = b.filter((item) => item >= 3); // [3, 4, 5] => 배열로 리턴
console.log(result2);

b.push(6);
console.log(b);
