import { ICall, ICallDTO } from "../../models/call";
import CallModel from "../../models/call";
import { Request, Response } from "express";
import { ICreateCallInput } from "../../models/call";
import { parseQueryFromURL, getSortMethod } from "../../services/parse";

// async function getAll(req: Request, res: Response) {
//   const calls = await CallModel.find({}).catch((error: Error) => {
//     return res.json({ error: error });
//   });
//   return res.json({
//     calls: calls,
//   });
// }

async function getAll(): Promise<ICall[] | Error> {
  const calls = await CallModel.find({}).catch((error: Error) => {
    return error;
  });
  return calls;
}

async function getByURLQuery(
  req: Request,
  res: Response
): Promise<ICallDTO[] | Error> {
  const query: any = {};
  const sort: any = {};

  getSortMethod(req, sort);
  parseQueryFromURL(req, query);

  const calls: ICall[] | any = await CallModel.find(query)
    .sort(sort)
    .catch((error: Error) => {
      return error;
    });

  let callsAsDTOs = createDTOs(calls);
  // callsAsDTOs = sortDTOsByCounts(callsAsDTOs, req);

  return callsAsDTOs;
}

function sortDTOsByCounts(calls: ICallDTO[], req: Request): ICallDTO[] {
  if (req.query.sort === "locationCount") {
    if (req.query.direction === "asc") {
      calls.sort((a, b) => a.locationCount - b.locationCount);
    } else {
      calls.sort((a, b) => b.locationCount - a.locationCount);
    }
  } else if (req.query.sort === "typeCount") {
    if (req.query.direction === "asc") {
      calls.sort((a, b) => a.typeCount - b.typeCount);
    } else {
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

function createDTOs(calls: ICall[]): any {
  const dtos: ICallDTO[] = [];

  calls = calls || [];

  calls.forEach((call: ICall) => {
    let dto: ICallDTO = {
      datetime: call.datetime,
      eventID: call.eventID,
      location: call.location,
      locationCount: calls.filter(
        (obj: ICall) => obj.location === call.location
      ).length,
      type: call.type,
      typeCount: calls.filter((obj: ICall) => obj.type === call.type).length,
    };

    dtos.push(dto);
  });

  return dtos;
}

async function saveCall({
  datetime,
  eventID,
  location,
  type,
}: ICreateCallInput): Promise<ICall[] | void> {
  CallModel.findOne({ eventID: eventID }).then((res) => {
    if (!res) {
      CallModel.create({
        datetime,
        eventID,
        location,
        type,
      }).catch((error: Error) => {
        throw error;
      });
    }
  });
}

export { saveCall, getAll, getByURLQuery };
