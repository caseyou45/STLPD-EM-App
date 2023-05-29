"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cheerio = __importStar(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const call_1 = require("./call");
dotenv_1.default.config();
function fetchPage() {
    const data = axios_1.default.get(`${process.env.PD_URL}`).then((res) => {
        return res.data;
    });
    return data;
}
function convertResponseDateToDom() {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield fetchPage();
        const $ = cheerio.load(page);
        const tableRows = $("tr");
        for (const row of tableRows) {
            const tableCol = $(row).find("td");
            const datetime = new Date($(tableCol[0]).text());
            const eventID = $(tableCol[1]).text();
            const location = $(tableCol[2]).text();
            const type = $(tableCol[3]).text();
            yield (0, call_1.saveCall)({
                datetime,
                eventID,
                location,
                type,
            });
        }
    });
}
function startCallRecording() {
    return __awaiter(this, void 0, void 0, function* () {
        setInterval(() => {
            convertResponseDateToDom();
        }, 3000);
    });
}
exports.default = startCallRecording;
