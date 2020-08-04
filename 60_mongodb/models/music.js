const mongoose = require("mongoose");

// Schema 생성
const MusicSchema = new mongoose.Schema({
  singer: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
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
module.exports = mongoose.model("music", MusicSchema);
