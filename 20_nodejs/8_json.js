// JSON 연습
const singer = {
  name: "AKMU",
  member: ["이수현", "이찬혁"],
  songs: [
    {
      title: "어떻게 이별까지 사랑하겠어, 널 사랑하는 거지",
      year: 2019,
    },
    {
      title: "GIVE LOVE",
      year: 2014,
    },
  ],
};

// JSON object -> string
const str = JSON.stringify(singer);
console.log(str);

// stirng -> JSON object
const obj = JSON.parse(str);
console.log(obj);

// 이찬혁 출력
console.log(obj.member[1]);

// GIVE LOVE 출력
console.log(obj.songs[1].title);
