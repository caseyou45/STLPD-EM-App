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
function SaveCall({ datetime, eventID, location, type, }) {
    return __awaiter(this, void 0, void 0, function* () {
        Call_1.default.findOne({ eventID: eventID }).then((res) => {
            if (res) {
                console.log("alareadyu");
            }
            else {
                Call_1.default.create({
                    datetime,
                    eventID,
                    location,
                    type,
                })
                    .then((data) => {
                    return data;
                })
                    .catch((error) => {
                    throw error;
                });
            }
        });
    });
}
function GetAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const calls = yield Call_1.default.find({}).catch((error) => {
            throw error;
        });
        return calls;
    });
}
exports.default = { SaveCall, GetAll };
