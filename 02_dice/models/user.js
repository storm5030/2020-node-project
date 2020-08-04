const mongoose = require("mongoose");

// Schema 생성
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  identification: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: Number,
    default: 0, // 0: 일반사용자, 1: 관리자
  },
  token: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Schema를 통해 Model 객체 생성
// mongoose.model("모델명", 스키마) -> 모델명s(컬렉션)
// mongoose.model("모델명", 스키마, "컬렉션명")
module.exports = mongoose.model("user", UserSchema);
