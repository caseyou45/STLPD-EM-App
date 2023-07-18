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
const call_1 = __importDefault(require("../models/call"));
const neighborhood_1 = __importDefault(require("../services/neighborhood"));
function updateCalls() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const calls = yield call_1.default.find({}).sort({ createdAt: -1 }).limit(10);
            for (const call of calls) {
                const neighborhood = yield (0, neighborhood_1.default)(call.location);
                yield call_1.default.updateOne({ _id: call._id }, { $set: { neighborhood: neighborhood } }).exec();
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
exports.default = updateCalls;
