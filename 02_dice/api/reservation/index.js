// movie 라우팅 모듈 작성
const express = require("express");
const router = express.Router();
const ctrl = require("./reservation.ctrl");

router.get("/listAdmin", ctrl.listAdmin); // 좌석조회
router.get("/:id", ctrl.checkId, ctrl.seats); // 좌석조회
router.get("/list/:id", ctrl.list); // 좌석조회

router.put("/:id", ctrl.checkId, ctrl.reserveSeat); //예약
router.put("/cancel/:id", ctrl.checkId, ctrl.cancelSeat); //취소
module.exports = router;
