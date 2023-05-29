"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const call_1 = __importDefault(require("../services/call"));
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const calls = yield (0, call_1.default)(req, res);
        const groupedCalls = [];
        const groupChoice = req.query.groupBy;
        const result = calls.map((call) => call[groupChoice]);
        const keys = [...new Set(result)];
        for (const key of keys) {
            groupedCalls.push({
                groupBy: groupChoice,
                groupKey: key,
                calls: calls.filter((call) => call[groupChoice] == key),
            });
        }
        return res.render("group", { calls: groupedCalls });
    });
}
exports.default = default_1;
