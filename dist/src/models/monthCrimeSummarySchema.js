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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose = __importStar(require("mongoose"));
const MonthCrimeSummarySchema = new mongoose.Schema({
    month: { type: String },
    runDate: { type: Date },
    neighborhood: { type: String },
    category: { type: String },
    crime: { type: String },
    nibrs: { type: String },
    total2023: { type: Number },
    total2022: { type: Number },
    diff: { type: Number },
    change: { type: Number },
    ytd: { type: Number },
    fileName: { type: String },
    fileURL: { type: String },
});
const MonthCrimeSummary = mongoose.model("MonthCrimeSummary", MonthCrimeSummarySchema);
exports.default = MonthCrimeSummary;
