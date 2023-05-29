"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../controller/index"));
const group_1 = __importDefault(require("../controller/group"));
const router = (0, express_1.Router)();
router.get("/", index_1.default);
router.get("/group", group_1.default);
exports.default = router;
