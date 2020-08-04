const MovieModel = require("../../models/movie.js");
const ReservationModel = require("../../models/reservation.js");
const UserModel = require("../../models/user");
const mongoose = require("mongoose");
// const movie = require("../../models/movie.js");

// id 유효성 체크
const checkId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }
  next();
};

// 좌석조회 (localhost:3000/api/reservation/:id)
const seats = (req, res) => {
  const id = req.params.id;
  MovieModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    //res.json(result);
    res.render("reservation/seats", { result });
  });
};

const reserveSeat = (req, res) => {
  const movieid = req.params.id;
  const { userid, username, seatnum, movietitle } = req.body;
  MovieModel.findByIdAndUpdate(movieid, { $set: { [`seats.${seatnum}`]: userid } }, (err, result) => {
    if (err) return res.status(500).send("예매 중 오류가 발생했습니다");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다");
    ReservationModel.create({ userid, username, movieid, seatnum, movietitle }, (err, result) => {
      if (err) return res.status(500).send("예매내역 수정 중 오류가 발생했습니다.");
    });
    res.json(result);
  });
};

const cancelSeat = (req, res) => {
  const movieid = req.params.id;
  const { userid, seatnum } = req.body;

  MovieModel.findByIdAndUpdate(movieid, { $set: { [`seats.${seatnum}`]: "empty" } }, (err, result) => {
    if (err) return res.status(500).send("예매 취소 중 오류가 발생했습니다");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다");
    ReservationModel.deleteOne({ userid, movieid, seatnum }, (err, result) => {
      if (err) return res.status(500).send("예매내역 삭제 시 오류가 발생했습니다");
      if (!result) return res.status(404).send("해당하는 정보가 없습니다");
    });
    res.json(result);
  });
};

const list = (req, res) => {
  const userid = req.params.id;
  ReservationModel.find({ userid }, (err, result) => {
    if (err) return res.status(500).end;
    res.render("reservation/list", { result });
  }).sort({ movietitle: 1 });
};

const listAdmin = (req, res) => {
  ReservationModel.find((err, result) => {
    if (err) return res.status(500).end;
    res.render("reservation/listAdmin", { result });
  }).sort({ userid: 1 });
};

module.exports = {
  seats,
  checkId,
  reserveSeat,
  cancelSeat,
  list,
  listAdmin,
};
