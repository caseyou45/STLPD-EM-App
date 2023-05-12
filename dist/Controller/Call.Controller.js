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
const Call_1 = __importDefault(require("../Models/Call"));
const ParseQuery_1 = require("../Services/ParseQuery");
class Call {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const calls = yield Call_1.default.find({}).catch((error) => {
                return res.json({ error: error });
            });
            return res.json({
                calls: calls,
            });
        });
    }
    static getByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (req.query.hasOwnProperty("dateStart") ||
                req.query.hasOwnProperty("dateEnd")) {
                (0, ParseQuery_1.parseForDate)(req, query);
            }
            const calls = yield Call_1.default.find(query).catch((error) => {
                return res.json({ error: error });
            });
            return res.json({
                calls: calls,
            });
        });
    }
    static SaveCall({ 
    //
    datetime, eventID, location, type, }) {
        return __awaiter(this, void 0, void 0, function* () {
            Call_1.default.findOne({ eventID: eventID }).then((res) => {
                if (!res) {
                    Call_1.default.create({
                        datetime,
                        eventID,
                        location,
                        type,
                    }).catch((error) => {
                        throw error;
                    });
                }
            }); //
        });
    }
}
exports.default = Call;
