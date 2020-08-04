// exports.property 이름

// exports.add = (a, b) => {
//     return a + b;
// };
// exports.sub = (a, b) => {
//     return a - b;
// };

const calc = {
  add(a, b) {
    return a + b;
  },
  sub(a, b) {
    return a - b;
  },
};

exports.calc = calc;
