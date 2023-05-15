"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const call_1 = require("../controller/call");
const router = (0, express_1.Router)();
// router.get("/all", CallController.getAll);
router.get("/", call_1.getByURLQuery);
exports.default = router;