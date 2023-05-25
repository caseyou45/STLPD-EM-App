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
const call_1 = __importDefault(require("../../models/call"));
const parse_1 = require("../../services/parse");
function getByURLQuery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {};
        const sort = {};
        (0, parse_1.getSortMethod)(req, sort);
        (0, parse_1.parseQueryFromURL)(req, query);
        const calls = yield call_1.default.find(query)
            .sort(sort)
            .catch((error) => {
            return error;
        });
        let callsAsDTOs = createDTOs(calls);
        res.json(callsAsDTOs);
    });
}
exports.default = getByURLQuery;
function sortDTOsByCounts(calls, req) {
    const sortProperty = req.query.sort;
    const direction = req.query.direction === "asc" ? 1 : -1;
    if (sortProperty !== undefined) {
        calls.sort((a, b) => (Number(a[sortProperty]) - Number(b[sortProperty])) * direction);
    }
    return calls;
}
function createDTOs(calls) {
    const dtos = [];
    calls = calls || [];
    calls.forEach((call) => {
        let dto = {
            datetime: call.datetime,
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
