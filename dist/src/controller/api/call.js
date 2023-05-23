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
exports.getByURLQuery = exports.getAll = exports.saveCall = void 0;
const call_1 = __importDefault(require("../../models/call"));
const parse_1 = require("../../services/parse");
// async function getAll(req: Request, res: Response) {
//   const calls = await CallModel.find({}).catch((error: Error) => {
//     return res.json({ error: error });
//   });
//   return res.json({
//     calls: calls,
//   });
// }
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const calls = yield call_1.default.find({}).catch((error) => {
            return error;
        });
        return calls;
    });
}
exports.getAll = getAll;
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
        // callsAsDTOs = sortDTOsByCounts(callsAsDTOs, req);
        return callsAsDTOs;
    });
}
exports.getByURLQuery = getByURLQuery;
function sortDTOsByCounts(calls, req) {
    if (req.query.sort === "locationCount") {
        if (req.query.direction === "asc") {
            calls.sort((a, b) => a.locationCount - b.locationCount);
        }
        else {
            calls.sort((a, b) => b.locationCount - a.locationCount);
        }
    }
    else if (req.query.sort === "typeCount") {
        if (req.query.direction === "asc") {
            calls.sort((a, b) => a.typeCount - b.typeCount);
        }
        else {
            calls.sort((a, b) => b.typeCount - a.typeCount);
        }
    }
    return calls;
}
//function sortDTOsByCounts(calls: ICallDTO[], req: Request): ICallDTO[] {
//   const sortProperty = req.query.sort as keyof ICallDTO | undefined;
//   const direction = req.query.direction === "asc" ? 1 : -1;
//   if (sortProperty !== undefined) {
//     calls.sort(
//       (a, b) => (Number(a[sortProperty]) - Number(b[sortProperty])) * direction
//     );
//   }
//   return calls;
// }
//////
// function sortDTOsByCounts(calls: ICallDTO[], req: Request): ICallDTO[] {
//   const property: keyof ICallDTO = req.query.sort as keyof ICallDTO;
//   return calls.sort((a, b) => Number(a[property]) - Number(b[property]));
// }
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
