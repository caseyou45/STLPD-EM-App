"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Call_Controller_1 = __importDefault(require("../Controller/Call.Controller"));
const router = (0, express_1.Router)();
// router.get("/all", CallController.getAll);
router.get("/", Call_Controller_1.default.getByDate);
exports.default = router;
