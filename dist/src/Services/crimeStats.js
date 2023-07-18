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
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const pdfjsLib = __importStar(require("pdfjs-dist"));
const monthCrimeSummarySchema_1 = __importDefault(require("../models/monthCrimeSummarySchema"));
let crimes = [
    "Murder and Nonnegligent Manslaughter",
    "Kidnapping/Abduction",
    "Aggravated Assault",
    "Simple Assault",
    "Intimidation",
    "Rape",
    "Sodomy",
    "Sexual Assault with an Object",
    "Fondling",
    "Robbery",
    "Carjacking",
    "Arson",
    "Burglary/Breaking and Entering",
    "Pocket-picking",
    "Purse-snatching",
    "Shoplifting",
    "Theft From Building",
    "Theft From Coin-Operated Machine or Device",
    "Theft From Motor Vehicle",
    "Theft From Motor Vehicle Parts/Accessories",
    "All Other Larceny",
    "Motor Vehicle Theft",
    "Counterfeiting/Forgery",
    "False Pretense/Swindle/Confidence Game",
    "Credit Card/Automatic Teller Machine Fraud",
    "Identity Theft",
    "Embezzlement",
    "Stolen Property Offenses",
    "Destruction/Damage/Vandalism of Property",
    "Drug/Narcotic Violations",
    "Drug Equipment Violations",
    "Weapons Law Violations",
    "Disorderly Conduct",
    "Family Offenses, Nonviolent",
    "Trespass of Real Property",
    "All Other Offenses",
];
function fetchHTMLContent(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            throw new Error(`Fetch Error: ${error}`);
        }
    });
}
function go() {
    return __awaiter(this, void 0, void 0, function* () {
        const pdfDataArray = [];
        const page = yield fetchHTMLContent("https://www.slmpd.org/crime_stats.shtml");
        const $ = cheerio.load(page);
        const firstTable = $("table").first();
        const tbody = firstTable.find("tbody").eq(1);
        const tr = tbody.find("tr").first();
        if (tr.text().trim().includes("Neighborhood")) {
            tbody.find("a").each((index, element) => {
                const href = $(element).attr("href");
                const pdfData = {
                    fileURL: "https://www.slmpd.org/" + href,
                    fileName: href,
                };
                pdfDataArray.push(pdfData);
            });
        }
        for (const pdfData of pdfDataArray) {
            const pdfAsTextArray = yield readPdfFromUrl(pdfData);
            const crimeSummaries = yield transformTextToIMonthCrimeSummary(pdfAsTextArray, pdfData);
            crimeSummeriesToMongoDB(crimeSummaries);
        }
    });
}
exports.default = go;
function crimeSummeriesToMongoDB(crimeSummaries) {
    return __awaiter(this, void 0, void 0, function* () {
        const alreadyExists = yield isCrimeSummaryExists(crimeSummaries[0].fileName);
        if (!alreadyExists) {
            for (const crimeSummary of crimeSummaries) {
                saveMonthCrimeSummary(crimeSummary);
            }
            console.log("Finished " + crimeSummaries[0].fileName);
        }
    });
}
function readPdfFromUrl(pdf) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(pdf.fileURL);
        const arrayBuffer = yield response.arrayBuffer();
        const pdfFile = yield pdfjsLib.getDocument(arrayBuffer).promise;
        const numPages = pdfFile.numPages;
        const pdfText = [];
        for (let i = 1; i <= numPages; i++) {
            const page = yield pdfFile.getPage(i);
            const content = yield page.getTextContent();
            for (const stringFromPage of content.items) {
                if (stringFromPage.str != " " && stringFromPage.str != "' '")
                    pdfText.push(stringFromPage.str);
            }
        }
        return pdfText;
    });
}
function transformTextToIMonthCrimeSummary(pdfText, pdf) {
    return __awaiter(this, void 0, void 0, function* () {
        let index = 0;
        let category = "";
        let neighborhood = "";
        let month = "";
        let runDate = null;
        const monthReports = [];
        const parseMonth = (element) => {
            return element.split(" ")[0].trim();
        };
        const parseRunDate = (element) => {
            return new Date(element.slice(element.indexOf(":") + 1, element.length));
        };
        while (index < pdfText.length) {
            let element = pdfText[index];
            switch (true) {
                case element.includes("MONTHLY") && month === "":
                    month = parseMonth(element);
                    break;
                case element.includes("Run Date") && runDate === null:
                    runDate = parseRunDate(element);
                    break;
                case element === "Neighborhood":
                    index++;
                    neighborhood = pdfText[index];
                    break;
                case element === "Person":
                    category = "Person";
                    break;
                case element === "Property":
                    category = "Property";
                    break;
                case element === "Society":
                    category = "Society";
                    break;
                case element === "Unspecified":
                    category = "Unspecified";
                    break;
                default:
                    break;
            }
            if (crimes.includes(pdfText[index])) {
                const crimeData = {
                    month: month,
                    runDate: runDate,
                    neighborhood: neighborhood,
                    category: category,
                    crime: pdfText[index],
                    nibrs: pdfText[index + 1],
                    total2023: parseInt(pdfText[index + 2]),
                    total2022: parseInt(pdfText[index + 3]),
                    diff: parseInt(pdfText[index + 4]),
                    change: 0,
                    ytd: 0,
                    fileName: pdf.fileName,
                    fileURL: pdf.fileURL,
                };
                if (pdfText.length >= 6 && pdfText[index + 5].endsWith("%")) {
                    crimeData.change = parseInt(pdfText[index + 5].replace("%", ""));
                    crimeData.ytd = parseInt(pdfText[index + 6]);
                    index += 6;
                }
                else {
                    crimeData.ytd = parseInt(pdfText[index + 5]);
                    index += 5;
                }
                if (!isNaN(crimeData.ytd)) {
                    monthReports.push(crimeData);
                }
            }
            index++;
        }
        return monthReports;
    });
}
function saveMonthCrimeSummary(monthCrimeSummary) {
    return __awaiter(this, void 0, void 0, function* () {
        monthCrimeSummarySchema_1.default.create(monthCrimeSummary).catch((error) => {
            console.log(monthCrimeSummary);
        });
    });
}
function isCrimeSummaryExists(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingSummary = yield monthCrimeSummarySchema_1.default.findOne({
                fileName: fileName,
            });
            return !!existingSummary;
        }
        catch (error) {
            throw error;
        }
    });
}
