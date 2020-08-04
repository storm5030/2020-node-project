const MovieModel = require("../../models/movie.js");
const mongoose = require("mongoose");

// id 유효성 체크
const checkId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }
  next();
};

// 목록조회 (localhost:3000/api/music?limit=2)
const list = (req, res) => {
  const limit = parseInt(req.query.limit || 10);
  if (Number.isNaN(limit)) return res.status(400).end();

  MovieModel.find((err, result) => {
    if (err) return res.status(500).end;
    //res.json(result);
    res.render("movie/list", { result });
  })
    .limit(limit)
    .sort({ _id: -1 });
};

// 상세조회 (localhost:3000/api/music/:id)
const detail = (req, res) => {
  const id = req.params.id;

  MovieModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    //res.json(result);
    res.render("movie/detail", { result });
  });
};

// 등록 (POST localhost:3000/api/music)
const create = (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year) return res.status(400).end();

  MovieModel.create({ title, director, year }, (err, result) => {
    if (err) return res.status(500).end();
    res.status(201).json(result);
  });
};

// 수정 (PUT localhost:3000/api/music/:id)
const update = (req, res) => {
  const id = req.params.id;
  const { title, director, year } = req.body;

  MovieModel.findByIdAndUpdate(
    id,
    { title, director, year },
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
  detail,
  create,
  update,
  remove,
  checkId,
  showCreatePage,
  showUpdatePage,
};
