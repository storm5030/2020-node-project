const mongoose = require("mongoose");

// Schema 생성
const ReservationSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  movieid: {
    type: String,
    required: true,
    trim: true,
  },
  seatnum: {
    type: Number,
    required: true,
    trim: true,
  },
  movietitle: {
    type: String,
    required: true,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Schema를 통해 Model 객체 생성
// mongoose.model("모델명", 스키마) -> 모델명s(컬렉션)
// mongoose.model("모델명", 스키마, "컬렉션명")
module.exports = mongoose.model("reservation", ReservationSchema);
