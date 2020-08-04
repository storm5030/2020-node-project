const MovieModel = require("../../models/movie.js");
const mongoose = require("mongoose");
const movie = require("../../models/movie.js");

// id 유효성 체크
const checkId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }
  next();
};

// 목록조회 (localhost:3000/api/movie)
const list = (req, res) => {
  MovieModel.find((err, result) => {
    if (err) return res.status(500).end;
    //res.json(result);
    res.render("movie/list", { result });
  }).sort({ _id: -1 });
};

const listAdmin = (req, res) => {
  MovieModel.find((err, result) => {
    if (err) return res.status(500).end;
    //res.json(result);
    res.render("movie/listAdmin", { result });
  }).sort({ _id: -1 });
};

// 상세조회 (localhost:3000/api/movie/:id)
const detail = (req, res) => {
  const id = req.params.id;

  MovieModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    //res.json(result);
    res.render("movie/detail", { result });
  });
};
const detailAdmin = (req, res) => {
  const id = req.params.id;

  MovieModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    //res.json(result);
    res.render("movie/detailAdmin", { result });
  });
};

//검색 조회 (GET localhost:3000/api/movie/search?=search
const search = (req, res) => {
  const search = req.query.search;
  MovieModel.find({ title: new RegExp(search) }, (err, result) => {
    if (err) return res.status(500).send("500");
    if (!result) return res.status(404).send("404");
    res.render("movie/list", { result });
  }).sort({ title: -1 });
};

// 등록 (POST localhost:3000/api/movie)
const create = (req, res) => {
  const { title, genre, year, date, time, audience, director, actor, synopsis } = req.body;
  if (!title || !genre || !year || !date || !time || !audience || !director || !actor || !synopsis)
    return res.status(400).end();
  const seats = [];
  for (i = 0; i < 288; i++) {
    seats.push("empty");
  }
  MovieModel.create({ title, genre, year, date, time, audience, director, actor, synopsis, seats }, (err, result) => {
    if (err) return res.status(500).end();
    res.status(201).json(result);
  });
};

// 수정 (PUT localhost:3000/api/movie/:id)
const update = (req, res) => {
  const id = req.params.id;
  const { title, genre, year, date, time, audience, director, actor, synopsis } = req.body;
  // const seats = [];
  // for (i = 0; i < 288; i++) {
  //   seats.push("empty");
  // }
  MovieModel.findByIdAndUpdate(
    id,
    { title, genre, year, date, time, audience, director, actor, synopsis },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다");
      if (!result) return res.status(404).end("해당하는 정보가 없습니다");
      res.json(result);
    }
  );
};

// 삭제 (DELETE localhost:3000/api/music/:id)
const remove = (req, res) => {
  const id = req.params.id;

  MovieModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다");
    if (!result) return res.status(404).end("해당하는 정보가 없습니다");
    res.json(result);
  });
};

const showCreatePage = (req, res) => {
  res.render("movie/create");
};

const showUpdatePage = (req, res) => {
  const id = req.params.id;

  MovieModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.render("movie/update", { result });
  });
};

module.exports = {
  list,
  listAdmin,
  detail,
  detailAdmin,
  create,
  update,
  remove,
  checkId,
  showCreatePage,
  showUpdatePage,
  search,
};
