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
exports.saveCall = void 0;
const call_1 = __importDefault(require("../models/call"));
const parse_1 = require("./parse");
const sort_1 = require("./sort");
const time_1 = require("./time");
function getWithoutGrouping(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {};
        const sort = {};
        let calls = [];
        let callsAsDTOs = [];
        (0, parse_1.parseQueryFromURL)(req, query);
        (0, sort_1.getSortMethod)(req, sort);
        calls = yield call_1.default.find(query).sort(sort);
        callsAsDTOs = createDTOs(calls);
        callsAsDTOs = sortDTOsByCountsIfRequested(callsAsDTOs, req.query);
        return callsAsDTOs;
    });
}
exports.default = getWithoutGrouping;
function sortDTOsByCountsIfRequested(callsAsDTOs, query) {
    if (query.sort === "typeCount") {
        if (query.direction === "asc") {
            callsAsDTOs.sort((a, b) => a.typeCount - b.typeCount);
        }
        else {
            callsAsDTOs.sort((a, b) => b.typeCount - a.typeCount);
        }
    }
    else if (query.sort === "locationCount") {
        if (query.direction === "asc") {
            callsAsDTOs.sort((a, b) => a.locationCount - b.locationCount);
        }
        else {
            callsAsDTOs.sort((a, b) => b.locationCount - a.locationCount);
        }
    }
    console.log(query);
    return callsAsDTOs;
}
function createDTOs(calls) {
    const dtos = [];
    calls = calls || [];
    calls.forEach((call) => {
        let dto = {
            date: (0, time_1.createLocalDate)(call.datetime),
            time: (0, time_1.createLocalTime)(call.datetime),
            eventID: call.eventID,
            location: call.location,
            locationCount: calls.filter((obj) => obj.location === call.location).length,
            type: call.type,
            typeCount: calls.filter((obj) => obj.type === call.type).length,
        };
        dtos.push(dto);
    });
    return dtos;
}
function saveCall({ datetime, eventID, location, type, }) {
    return __awaiter(this, void 0, void 0, function* () {
        call_1.default.findOne({ eventID: eventID }).then((res) => {
            if (!res) {
                call_1.default.create({
                    datetime,
                    eventID,
                    location,
                    type,
                }).catch((error) => {
                    throw error;
                });
            }
        });
    });
}
exports.saveCall = saveCall;
