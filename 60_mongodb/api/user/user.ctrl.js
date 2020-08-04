const UserModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const showSignupPage = (req, res) => {
  res.render("user/signup");
};

const showLoginPage = (req, res) => {
  res.render("user/login");
};

// 회원가입
// - 성공 : 201 응답(Created), 생성된 User 객체 반환
// - 실패 : 필수 입력값 누락 시 400 리턴 (Bad Request)
//          email이 중복된 경우 409 리턴 (Conflict)
const signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).end("필수값이 입력되지 않았습니다.");

  UserModel.findOne({ email }, (err, result) => {
    if (err) return res.status(500).send("회원가입 시 오류가 발생했습니다.");
    if (result) return res.status(409).send("이미 사용중인 E-mail 입니다.");

    // bcrypt : 단방향 해시 함수
    const saltRounds = 10; // salt 자릿수 지정
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return res.status(500).send("암호화 처리 시 오류가 발생했습니다.");

      const user = new UserModel({ name, email, password: hash });
      user.save((err, result) => {
        if (err) return res.status(500).send("등록 시 오류가 발생했습니다.");
        res.status(201).json(result);
      });
    });
  });
};

// 로그인
// - 성공 : email, password가 일치하면 성공 (200)
// - 실패 : 필수 입력값이 없는 경우 400 (Bad Request)
//          없는 email인 경우 404 (Not Found)
//          password가 틀린 경우 500 (Server Error)
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send("필수값이 입력되지 않았습니다.");

  UserModel.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send("사용자 조회 시 오류가 발생했습니다.");
    if (!user) return res.status(404).send("이메일 또는 비밀번호가 일치하지 않습니다."); //이메일

    // 비밀번호 정합성 체크 (암호화된 것끼리 비교)
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send("암호화 처리 시 오류가 발생했습니다.");
      if (!isMatch) return res.status(404).send("이메일 또는 비밀번호가 일치하지 않습니다."); //비밀번호

      //비밀번호가 맞다면 signed 토큰 발급 (jsonwebtoken)
      const token = jwt.sign(user._id.toHexString(), "secretToken");
      console.log(token);

      UserModel.findByIdAndUpdate(user._id, { token }, (err, result) => {
        if (err) return res.res.status(500).send("로그인 시 오류가 발생했습니다.");
        // 토큰 저장 : cookie, local stroage..
        res.cookie("token", token, { httpOnly: true });
        res.json(result);
      });
    });
  });
};

// 모든 요청에 대해 token정합성 체크
const checkAuth = (req, res, next) => {
  // 모든 화면에서 공통으로 보여지는 값이 있는 경우
  res.locals.user = null;

  // 쿠키에서 토큰 가져오기
  const token = req.cookies.token;

  if (!token) {
    // 정상적으로 토큰이 없는 경우
    if (req.url === "/" || req.url === "/api/user/signup" || req.url === "/api/user/login") return next();
    // 비정상적으로 토큰이 없는 경우
    else return res.render("user/login");
  }

  // 토큰이 있는 경우
  // 토큰 정합성 체크
  jwt.verify(token, "secretToken", (err, _id) => {
    if (err) {
      res.clearCookie("token");
      return res.render("/api/user/login");
    }
    // token, DB에 저장된 tokem 비교
    UserModel.findOne({ _id, token }, (err, result) => {
      if (err) return res.status(500).send("사용자 인증 시 오류가 발생했습니다.");
      if (!result) return res.render("user/login");
      res.locals.user = { name: result.name, role: result.role };
      next();
    });
  });
};

const logout = (req, res) => {
  const token = req.cookies.token;

  jwt.verify(token, "secretToken", (err, _id) => {
    if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다.");
    UserModel.findByIdAndUpdate(_id, { token: "" }, (err, result) => {
      if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다.");
      res.clearCookie("token");
      res.redirect("/");
    });
  });
};

module.exports = {
  showSignupPage,
  signup,
  showLoginPage,
  login,
  checkAuth,
  logout,
};
