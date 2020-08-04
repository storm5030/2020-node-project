// movie 라우팅 모듈 작성
const express = require("express");
const router = express.Router();
const ctrl = require("./movie.ctrl");

router.get("/", ctrl.list); // 목록조회
router.get("/search", ctrl.search); //검색
router.get("/admin", ctrl.listAdmin); // 관리자 목록조회
router.get("/admin/new", ctrl.showCreatePage); // 등록페이지
router.get("/admin/:id", ctrl.detailAdmin); // 관리자 상세조회
router.get("/:id", ctrl.checkId, ctrl.detail); // 상세조회
router.get("/admin/:id/edit", ctrl.checkId, ctrl.showUpdatePage); // 수정페이지

router.post("/", ctrl.create); // 등록
router.put("/:id", ctrl.checkId, ctrl.update); //수정
router.delete("/admin/:id", ctrl.checkId, ctrl.remove); //삭제

module.exports = router;
